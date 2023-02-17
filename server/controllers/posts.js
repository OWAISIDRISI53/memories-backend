const express = require("express")
const Post = require('../models/Post');

const getPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const createPost = async (req, res) => {
    const post = req.body
    const newPost = new Post({ ...post, creator: req.user.id, createdAt: new Date().toISOString() })
    try {
        newPost.save()
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deleteAll = async (req, res) => {
    const deleteAllPost = await Post.deleteMany()
    res.json(deleteAllPost)
}

const deletePost = async (req, res) => {
    const { id } = req.params
    try {
        const deletedPost = await Post.findByIdAndDelete(id)
        return res.status(201).json({ deletedPost })
    } catch (error) {
        res.status(401).send(error)
    }

}

const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.user.id) {
        return res.json({ message: "Unauthenticated" });
    }
    try {
        const post = await Post.findById(id)

        const index = post.likes.findIndex(id => id === String(req.user.id))


        if (index === -1) {
            post.likes.push(req.user.id)
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.user.id));

        }

        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })


        res.status(200).json({ updatedPost })
    } catch (error) {
        res.status(404).send(error)
    }
}
const userPosts = async (req, res) => {
    const { id } = req.params;

    if (!req.user.id) {
        return res.json({ message: "Unauthenticated" });
    }
    try {
        const no_of_post = await Post.find({ creator: { $eq: id } })

        res.status(200).json(no_of_post)
    } catch (error) {
        res.status(400).json(error)
    }

}


module.exports = {
    getPosts, createPost, deleteAll, deletePost, likePost, userPosts
}