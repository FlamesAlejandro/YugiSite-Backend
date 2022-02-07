const { Dialect, Sequelize } = require('sequelize');

const db = new Sequelize(
    process.env.DB_DATABASE ?? 'yugisite',
    process.env.DB_USERNAME ??'root',
    process.env.DB_PASSWORD ?? '',
    {
    host: process.env.DB_HOST ??'localhost',
    dialect: process.env.DB_DIALECT ?? 'mysql',
    // logging: false,
    }
    );

export default db