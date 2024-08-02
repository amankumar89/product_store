import Product from '../models/Product';
import { isValidPrice, isValidUrl } from '../../libs/validators.js';
import { interalError } from '../../libs/errorMessages.js';

// create product
export const createProduct = async (req, res) => {
  const { name, price, imageUrl } = req.body;
  if (!name || !price || !imageUrl) return res.status(400).json({ success: false, message: 'All fields are mandatory' });
  if (typeof name !== 'string' || !isValidPrice(price) || !isValidUrl(imageUrl)) {
    return res.status(400).json({ 
      success: false, 
      message: {
        name: 'name should be a string',
        price: 'price should be a number',
        imageUrl: 'imageUrl should be a valid url',
      } 
    });
  }

  try {
    const newProduct = new Product({ name, price, imageUrl });
    const addedProduct = await newProduct.save();

    if (!addedProduct) return res.status(500).json({ success: false, message: 'Failed to create product' });
    return res.status(201).json({ success: true, data: addedProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json(interalError);
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error in getting all products:', error);
    return res.status(500).json(interalError);
  }
};

// get product by id
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ success: false, message: 'Product id is required' });
    const product = await Product.findById(id);
    if(!product) return res.status(404).json({ success: false, message: 'Product not found' });
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error in getting product by id:', error);
    return res.status(500).json(interalError);
  }
};

// update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    if(!id) return res.status(400).json({ success: false, message: 'Product id is required' });
    if(!updatedData || Object.keys(updatedData).length === 0) return res.status(400).json({ success: false, message: 'At least one field is required' });
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if(!updatedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log('Error in updating product:', error);
    return res.status(500).json(interalError);
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if(!id) return res.status(400).json({ success: false, message: 'Product id is required' });
    const deletedProduct = await Product.findByIdAndDelete(id);
    if(!deletedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
    return res.status(200).json({ success: true, data: deletedProduct });
  } catch (error) {
    console.log('Error in deleting product:', error);
    return res.status(500).json(interalError);
  }
};