import { productModel } from "../models/productModel.js";

export async function createProduct(req, res) {
  try {
    let { name, brand, category, price, description, inStock, inventory ,addedBy} =
      req.body;
    const product = new productModel({
      name,
      brand,
      category,
      price,
      description,
      inStock,
      inventory,
      addedBy
    });
    await product.save();
    res.status(201).json({ message: "product added" });
  } catch (err) {
    // console.log(err);
    res.status(500).json({error : err})
  }
};


// FETCH ALL PRODUCTS

export async function getAllProducts(req,res){

  const allProducts = await productModel.find({});
  res.json(allProducts)


}




// FETCH A SINGLE PRODUCT
