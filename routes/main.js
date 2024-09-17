const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");
const {messages} = require("../utility/responseHelpers") 


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

  if (!id) return res.status(400).send(messages[400]);

  try {
    const result = await Product.findById({_id : id});
    console.log(result);
    res.send(result);
           
  } catch (err) {
    console.error(err);
  }

})

module.exports = router;