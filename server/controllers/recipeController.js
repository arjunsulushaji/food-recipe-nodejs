require('../models/database')
const Category = require('../models/Category');
const Recipe = require('../models/Recipe')

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
    try {

        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber)
        // console.log(categories);

        const recipes = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber)
        const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);

        const food = { recipes, thai, american, chinese }
        // console.log(food)

        res.render('index', { title: 'Cooking blog - Homepage', categories, food })
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

/**
 * GET / Recipe/:id
 * Recipe
 */
exports.exploreRecipe = async (req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);

        res.render('recipe', { title: 'Cooking blog - Recipe', recipe })
    } catch (error) {
        res.status(500).send({ message: error.message || "error occured" })
    }
}

/**
 * GET / Categories/:id
 * Categories By Id
 */
exports.exploreCategoriesById = async (req, res) => {
    try {
        let categoryId = req.params.id;
        const categoriesById = await Recipe.find({ 'category': categoryId })
        res.render('categories', { title: 'Cooking blog - Categories', categoriesById })
    } catch (error) {
        res.status(500).send({ message: error.message || "error occured" })
    }
}

/**
 * POST /search
 * Search
 */
exports.searchRecipe = async (req, res) => {
    //searchTerm
    try {
        let searchTerm = req.body.searchTerm
        let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } })
        //res.json(recipe)
        res.render('search', { title: 'Cooking Blog - Search', recipe })
    } catch (error) {
        res.status(500).send({ message: error.message || "error occured" })
    }
}

/**
 * GET / Explore-latest
 * Explore-latest
 */
exports.exploreLatest = async (req, res) => {
    try {
        const limitNumber = 20
        const recipe = await Recipe.find({}).sort({_id : -1}).limit(limitNumber);

        res.render('explore-latest', { title: 'Cooking blog - Explore-latest', recipe })
    } catch (error) {
        res.status(500).send({ message: error.message || "error occured" })
    }
}


/**
 * GET / Explore-random
 * Explore-random
 */
exports.exploreRandom = async (req, res) => {
    try {
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec()
        //res.json(recipe);
        res.render('explore-random', { title: 'Cooking blog - Explore-random', recipe })
    } catch (error) {
        res.status(500).send({ message: error.message || "error occured" })
    }
}


// async function insertDummyRecipeData() {
//     try {
//         await Recipe.insertMany([
//             {
//                 name: 'Pasta with tomato sauce',
//                 description: 'A classic Italian dish with tangy tomato sauce and al dente pasta',
//                 email: 'hello@gmali.com',
//                 ingredients: ['pasta', 'tomatoes', 'garlic', 'olive oil', 'salt', 'pepper'],
//                 category: 'Indian',
//                 image: 'recipe1.jpg'
//             },
//             {
//                 name: 'Chicken Caesar Salad',
//                 description: 'A delicious and healthy salad with tender chicken and crisp romaine lettuce',
//                 email: 'hello@gmail.com',
//                 ingredients: ['chicken breast', 'romaine lettuce', 'Parmesan cheese', 'croutons', 'Caesar dressing'],
//                 category: 'Mexican',
//                 image: 'recipe2.jpg'
//             },
//             {
//                 name: 'Beef Tacos',
//                 description: 'A Tex-Mex favorite with seasoned beef and all the toppings',
//                 image: 'hello1@gmail.com',
//                 ingredients: ['ground beef', 'taco seasoning', 'tortillas', 'lettuce', 'tomatoes', 'sour cream'],
//                 category: 'Thai',
//                 image: 'recipe3.jpg'
//             },
//             {
//                 name: 'Chocolate Cake',
//                 description: 'A rich, moist chocolate cake with layers of chocolate ganache and chocolate frosting',
//                 email: 'hello@gmali.com',
//                 ingredients: ['flour', 'sugar', 'cocoa powder', 'baking soda', 'salt', 'eggs', 'milk', 'vegetable oil', 'vanilla extract'],
//                 category: 'Chinese',
//                 image: 'recipe4.jpg'
//             },
//             {
//                 name: 'Chicken Tikka Masala',
//                 description: 'A flavorful Indian dish with marinated chicken in a creamy tomato-based sauce',
//                 email: 'hello@gmail.com',
//                 ingredients: ['chicken thighs', 'yogurt', 'lemon juice', 'ginger', 'garlic', 'tomatoes', 'cream', 'spices'],
//                 category: 'American',
//                 image: 'recipe5.jpg'
//             },
//             {
//                 name: 'Caprese Salad',
//                 description: 'A simple and refreshing salad with fresh tomatoes, mozzarella, and basil',
//                 email: 'hello@gmali.com',
//                 ingredients: ['tomatoes', 'fresh mozzarella', 'fresh basil', 'olive oil', 'balsamic vinegar', 'salt', 'pepper'],
//                 category: 'Chinese',
//                 image: 'recipe6.jpg'
//             },
//             {
//                 name: 'Beef Stroganoff',
//                 description: 'A hearty and comforting dish with tender strips of beef in a rich sour cream sauce, served over egg noodles',
//                 email: 'hello@gmail.com',
//                 ingredients: ['beef sirloin', 'onion', 'mushrooms', 'beef broth', 'sour cream', 'flour', 'butter', 'egg noodles'],
//                 category: 'American',
//                 image: 'recipe7.jpg'
//             }
//         ])
//     } catch (eroor) {
//         console.log('error', +eroor);
//     }
// }

// insertDummyRecipeData();