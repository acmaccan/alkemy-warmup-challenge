// Import connection, model and datatypes
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database/connection');

// Create Post extending Model
class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
            isImage(image){
                if(!(/(?:jpg|png)/.test(image))){
                    throw new Error("La imagen debe ser .jpg o .png")
                }
            }
        }
    },
    creationDate: {
        type: DataTypes.DATE
    },
    categoryId: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    sequelize,          // Connection instance
    modelName: 'posts'  // Literal table name
});

// Create Post extending Model
class Category extends Model {}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    } 
}, {
    timestamps: false,
    sequelize,              // Connection instance
    modelName: 'categories' // Literal table name
});

// Association
Category.hasMany(Post, {
    as: 'post',
    foreignKey: 'categoryId'
})
Post.belongsTo(Category, {
    as: 'category'
});

// Export
module.exports = {
    Post,
    Category
};
