var db = require('../models/database')
const Category = require('../models/Category');

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
    try {

        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber)
        // console.log(categories);

        res.render('index', { title: 'Cooking blog - Homepage', categories })
    } catch (error) {
        res.status(500).send({ message: error.message || "error occured" })
    }
}

/**
 * GET / Categories
 * Categories
 */
exports.exploreCategories = async (req, res) => {
    try {

        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber)
        // console.log(categories);

        res.render('categories', { title: 'Cooking blog - Categories', categories })
    } catch (error) {
        res.status(500).send({ message: error.message || "error occured" })
    }
}