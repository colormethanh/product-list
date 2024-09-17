const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");
const { ResponseMessages } = require("../utility/responseHelpers"); 
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
    for (let n = 0; n < Math.floor(Math.random() * 10); n++ ){
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
    };

    try {
      product.save();
    } catch(err) {
      console.log(err);
    }
           
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 0;
  Product.find({})
         .skip(perPage * page - page)
         .limit(perPage)
         .then((products, error) => {
          Product.countDocuments()
                 .then((count, err) => {
                  console.log(count);
                })
          res.send(products);
        });
});

router.get("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).send(ResponseMessages[400]);

  tryTo(next, async () => {
    const product = await Product.findById(id);
    if (!product) return res.status(404).send(ResponseMessages[404]);
    res.send(product);
  });

});

router.get("/products/:id/reviews", (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(400).send(ResponseMessages[400]);

  tryTo(next, async () => {
    // Todo: Limit to 4 reviews for pagination
    const result = await Review.find({product : id});
    res.send(result);       
  });

});

router.post("/products", (req, res, next) => {
  const productData = JSON.parse(req.body.product);
  if(!productData) return res.status(400).send(ResponseMessages[400]);

  tryTo(next, () => {
    // Todo: validate post data
    const product = new Product(productData);
    product.save();
    res.status(200).send(product._id);
  });

});

router.post("/products/:id/reviews", (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).send(ResponseMessages[400]);

  const reviewData = JSON.parse(req.body.review);
  if (!reviewData) return res.status(400).send(ResponseMessages[400]);

  tryTo(next, async () => {
    // Todo: Create helper for finding models
    const product = await Product.findById({_id : id});
    if (!product) return res.send(404).send(ResponseMessages[404]);

    // todo: Create helper function for routes
    const review = new Review({product: product._id, ...reviewData});
    review.save();
    product.reviews.push(review);
    product.save();
    res.status(200).send(review._id);
  });
});


router.delete("/products/:id", (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).send(ResponseMessages[400]);

  tryTo(next, async () => {
    // check if product exists
    const product = await Product.findById(id);
    if (!product) return res.status(404).send(ResponseMessages[404]);

    // Delete product
    Product.findByIdAndDelete({_id: id}).exec();
    
    // Delete reviews associated with product
    Review.deleteMany({product: id}).exec();

    res.status(200).send(`Deleted product: ${id}`);
  });
});

router.delete("/reviews/:id", (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).send(ResponseMessages[400]);

  tryTo(next, async () => {
    const review = await Review.findById(id);
    if (!review) return res.status(404).send(ResponseMessages[404]);
    
    const product = await Product.findById(review.product);
    if (!product) return res.status(404).send(ResponseMessages[404]);

    Review.findByIdAndDelete(id).exec();

    Product.updateOne({_id: product._id}, {$pull: {reviews : { _id: id }}}).exec();

    res.status(200).send(`Deleted product: ${id}`);
  })

})









module.exports = router;