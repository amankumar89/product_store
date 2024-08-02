// create product
export const createProduct = async (req, res) => {
  return res.send("product added");
};

// get all products
export const getAllProducts = async (req, res) => {
  return res.send("all products")
};

// get product by id
export const getProductById = async (req, res) => {
  return res.send("product with id")
};

// update product
export const updateProduct = async (req, res) => {
  return res.send("product updated")
};

// delete product
export const deleteProduct = async (req, res) => {
  return res.send("product deleted")
};