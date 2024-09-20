const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");
const {
  ResponseMessages,
  sendResponse,
} = require("../utility/responseHelpers");
const { tryTo } = require("../utility/requestHelpers");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    // Generate fake product
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    // Generate fake reviews
    for (let n = 0; n < Math.floor(Math.random() * 10); n++) {
      let review = new Review();
      review.userName = faker.internet.userName();
      review.text = faker.lorem.sentence(5);
      review.product = product._id;
      try {
        review.save();
      } catch (err) {
        console.log(err);
      }
      product.reviews.push(review);
    }

    try {
      product.save();
    } catch (err) {
      console.log(err);
    }
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

  const { category, price, productName } = req.query;
  let { page = 1 } = req.query;

  const searchQuery = {};
  if (category) searchQuery.category = category;
  if (productName) searchQuery.name = { $regex: productName, $options: "i" };

  tryTo(next, async () => {
    const productCount = await Product.countDocuments(searchQuery);
    const max_page_ct = Math.ceil((productCount || 9) / 9);
    const categories = await Product.distinct("category");

    // If page requested is greater than max or less than 1 default to page 1
    if (parseInt(page) > max_page_ct || parseInt(page) < 1) page = 1;

    const products = await Product.find(searchQuery)
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort(price ? { price: parseInt(price) } : {});

    return sendResponse(res, 200, {
      products: products,
      product_count: productCount,
      current_page: parseInt(page),
      max_page: max_page_ct,
      categories: categories || [],
    });
  });
});

router.get("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) return sendResponse(res, 400);

  tryTo(next, async () => {
    const product = await Product.findById(id);
    if (!product) return res.status(404).send(ResponseMessages[404]);
    return sendResponse(res, 200, product);
  });
});

router.get("/products/:id/reviews", (req, res, next) => {
  const { id } = req.params;
  if (!id) return sendResponse(res, 400);

  tryTo(next, async () => {
    const result = await Review.find({ product: id }).limit(4);
    return sendResponse(res, 200, result);
  });
});

router.post("/products", (req, res, next) => {
  const productData = JSON.parse(req.body.product);
  if (!productData) return sendResponse(res, 400);

  tryTo(next, async () => {
    const product = new Product(productData);
    await product.save();
    return sendResponse(res, 200, product._id);
  });
});

router.post("/products/:id/reviews", (req, res, next) => {
  const { id } = req.params;
  if (!id) return sendResponse(res, 400);

  const reviewData = JSON.parse(req.body.review);
  if (!reviewData) return sendResponse(res, 400);

  tryTo(next, async () => {
    const product = await Product.findById({ _id: id });
    if (!product) return sendResponse(res, 404);

    const review = new Review({ product: product._id, ...reviewData });
    await review.save();
    product.reviews.push(review);
    await product.save();
    return sendResponse(res, 400, review._id);
  });
});

router.delete("/products/:id", (req, res, next) => {
  const { id } = req.params;
  if (!id) return sendResponse(res, 400);

  tryTo(next, async () => {
    // check if product exists
    const product = await Product.findById(id);
    if (!product) return sendResponse(res, 404);

    // Delete product
    Product.findByIdAndDelete({ _id: id }).exec();

    // Delete reviews associated with product
    Review.deleteMany({ product: id }).exec();

    return sendResponse(res, 200, `Deleted product: ${id}`);
  });
});

router.delete("/reviews/:id", (req, res, next) => {
  const { id } = req.params;
  if (!id) return sendResponse(res, 400);

  tryTo(next, async () => {
    const review = await Review.findById(id);
    if (!review) return sendResponse(res, 404, "Review could not be found");

    const product = await Product.findById(review.product);
    if (!product) return sendResponse(res, 404, "Product could not be found");

    Review.findByIdAndDelete(id).exec();

    Product.updateOne(
      { _id: product._id },
      { $pull: { reviews: { _id: id } } }
    ).exec();

    return sendResponse(res, 200, `Deleted product ${id}`);
  });
});

module.exports = router;
