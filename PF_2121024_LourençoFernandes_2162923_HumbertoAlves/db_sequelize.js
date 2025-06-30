const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: console.log, 
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);


sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = require("./models/User")(sequelize);
const Product = require("./models/Product")(sequelize);
const Category = require("./models/Category")(sequelize);
const Images = require("./models/Images")(sequelize);
const Favorite = require("./models/Favorite")(sequelize);
const Message = require("./models/Message")(sequelize);
const SearchHistory = require("./models/SearchHistory")(sequelize);

User.hasMany(Product, { foreignKey: 'user_id' });
Product.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Product.hasMany(Images, { foreignKey: 'product_id' });
Images.belongsTo(Product, { foreignKey: 'product_id' });

User.belongsToMany(Product, { through: Favorite, foreignKey: 'user_id' });
Product.belongsToMany(User, { through: Favorite, foreignKey: 'product_id' });

User.hasMany(Message, { foreignKey: 'sender_id' });
User.hasMany(Message, { foreignKey: 'receiver_id' });
Product.hasMany(Message, { foreignKey: 'product_id' });

User.hasMany(SearchHistory, { foreignKey: 'user_id' });



(async () => {
    await sequelize.sync({ force: false });


    // const user = await User.create({
    //     first_name: 'Pedro',
    //     last_name: '240',
    //     username: 'pedro240',
    //     phonenumber: '912945654',
    //     email: 'test@gmail.com',
    //     passwd: 'test'
    // });


    // const category = await Category.create({
    //     category_name: 'Books',
    //     description: 'A category about books'
    // });


    // const product = await Product.create({
    //     product_name: 'Lettuce be free',
    //     description: 'A book about lettuces',
    //     price: 19.99,
    //     user_id: user.user_id,
    //     category_id: category.category_id
    // });

    // const image = await Images.create({
    //     img_path: 'https://example.com/image.jpg',
    //     product_id: product.product_id
    // });


    // const favorite = await Favorite.create({
    //     user_id: user.user_id,
    //     product_id: product.product_id
    // });


    // const message = await Message.create({
    //     sender_id: user.user_id,
    //     receiver_id: user.user_id, 
    //     product_id: product.product_id,
    //     message: 'This is a test message'
    // });


    // const searchHistory = await SearchHistory.create({
    //     user_id: user.user_id,
    //     search_text: 'lettuce book'
    // });

})();

module.exports = {
    User,
    Product,
    Category,
    Images,
    Message,
    SearchHistory,
    Favorite
}