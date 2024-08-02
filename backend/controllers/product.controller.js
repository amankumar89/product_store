import Product from '../models/product.model.js';
import { isValidPrice, isValidUrl } from '../../libs/validators.js';
import { interalError } from '../../libs/errorMessages.js';
import { v4 as uniqueId } from 'uuid';

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
    const productByName = await Product.findOne({ name });
    const productByImageUrl = await Product.findOne({ imageUrl });
    if (productByName || productByImageUrl) return res.status(400).json({ success: false, message: 'Product already exists with name or image' });
    
    const newId = uniqueId();
    const newProduct = new Product({ id: newId, name, price, imageUrl });
    const addedProduct = await newProduct.save();

    if (!addedProduct) return res.status(500).json({ success: false, message: 'Failed to create product' });
    const newData = {
      id: addedProduct?.id,
      name: addedProduct?.name,
      price: addedProduct?.price,
      imageUrl: addedProduct?.imageUrl,
    };
    return res.status(201).json({ success: true, data: newData });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json(interalError);
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    const dataToSend = products?.map(product => ({
      id: product?.id,
      name: product?.name,
      price: product?.price,
      imageUrl: product?.imageUrl,
    })) ?? [];
    return res.status(200).json({ success: true, data: dataToSend });
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
    const productToSend = {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      imageUrl: product?.imageUrl,
    };
    return res.status(200).json({ success: true, data: productToSend });
  } catch (error) {
    console.error('Error in getting product by id:', error);
    return res.status(500).json(interalError);
  }
};

// update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { name, imageUrl } = updatedData;
  try {
    if(!id) return res.status(400).json({ success: false, message: 'Product id is required' });
    if(!updatedData || Object.keys(updatedData).length === 0) return res.status(400).json({ success: false, message: 'At least one field is required' });
    const productByName = await Product.findOne({ name });
    const productByImageUrl = await Product.findOne({ imageUrl });
    if (productByName || productByImageUrl) return res.status(400).json({ success: false, message: 'Product already exists with name or image' });
    
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if(!updatedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
    const productToSend = {
      id: updatedProduct?.id,
      name: updatedProduct?.name,
      price: updatedProduct?.price,
      imageUrl: updatedProduct?.imageUrl,
    };
    return res.status(200).json({ success: true, data: productToSend });
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
    const deletedProductToSend = {
      id: deletedProduct?.id,
      name: deletedProduct?.name,
      price: deletedProduct?.price,
      imageUrl: deletedProduct?.imageUrl,
    };
    return res.status(200).json({ success: true, data: deletedProductToSend });
  } catch (error) {
    console.log('Error in deleting product:', error);
    return res.status(500).json(interalError);
  }
};