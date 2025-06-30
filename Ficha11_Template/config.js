const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    dbhost : process.env.DB_HOST,
    dbpass : process.env.DB_PASS,
    token : process.env.TOKEN_SECRET
};