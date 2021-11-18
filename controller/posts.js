// Import models
const { Post, Category } = require('../models/models');

// Get all post ordered by creation date on descending order
// Project id, title, image, category and creation date
const getAllPosts = async(req,res) => {
    await Post.findAll({
        include: [{
            model: Category,
            as: 'category',
            attributes: ['name']
        }],
        order: [[
            'creationDate', 
            'DESC'
        ]], 
        attributes: [
            'id', 
            'title', 
            'image', 
            'creationDate'
        ]
    })
    .then(Post => {
        res.status(200).send(Post)
    })
    .catch(err => {
        res.status(400).send('No se han encontrado resultados - ' + err.message)
    })
};

// Get post by id. If exists return details, otherwise return error message
const getPostById = async(req,res) => {
    await Post.findOne({
        where: {
            id: req.params.id
        }, 
        include: [{
            model: Category,
            as: 'category',
            attributes: ['name']
        }],
        attributes: [
            'id', 
            'title', 
            'image', 
            'creationDate'
        ]
    })
    .then(Post => {
        res.status(200).send(Post)
    })
    .catch(err => {
        res.status(400).send('No se ha encontrado ese post - ' + err.message)
    })
};

// Save new post with body details
const newPost = async(req,res) => {
    const { title, content, image, categoryId } = req.body

    await Post.create({
        title, 
        content, 
        image, 
        categoryId, 
        creationDate: new Date().toUTCString()
    })
    .then(Post => {
        res.status(201).send(Post)
    })
    .catch(err => {
        res.status(404).send('Ha ocurrido un problema durante la creación del post - ' + err.message)
    })
};

// Get post by id and update details. If doesn't exist return error message
const editPost = async (req,res) => {
    const { title, content, image, categoryId } = req.body

    await Post.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(Post => {
        Post.update({
            title, 
            content, 
            image, 
            categoryId
        })
        res.status(201).send('El post se ha actualizado')
    })
    .catch(err => {
        res.status(400).send('No se pudo actualizar el post - ' + err.message)
    })
};

// Delete post by id. If doesn't exist return error message
const deletePost = async(req,res) => {
    await Post.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(Post => {
        Post.destroy(Post)
        res.status(200).send('El post ha sido eliminado')
    })
    .catch(err => {
        res.status(400).send('No se ha podido eliminar el post - ' + err.message)
    })
};

// Export modules
module.exports = {
    getAllPosts,
    getPostById,
    newPost,
    editPost,
    deletePost
};