const express = require('express');
const bcrypt = require('bcrypt');
const Product = require('../../models/seller/Product');
const Category = require('../../models/seller/Category');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getProductByCategory = async (req, res) => {
    const { name } = req.params;

    try {
        const category = await Category.findOne({ name: name });
        console.log(category);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const products = await Product.find({ category: category._id });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found in this category' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getProductByVendor = async (req, res) => {
    const { vendor } = req.params;
    const vendorName = vendor.toLowerCase();
    try {
        const products = await Product.find({ vendor: vendorName });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found of vendor: '+vendor });
        }
        console.log("returned search on "+vendor+" : \n"+products)
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getProductByModel = async (req, res) => {
    const { model } = req.params;
    try {
        const products = await Product.find({ modelNumber: model });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found with model: '+model });
        }
        console.log("returned search on "+model+" : \n"+products)
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};