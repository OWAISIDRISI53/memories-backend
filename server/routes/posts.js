const express = require("express")
const { getPosts, createPost, deleteAll, deletePost, likePost, userPosts } = require("../controllers/posts")
const fetchuser = require("../middlewares/fetchuser")
const router = express.Router()

router.get("/", getPosts)
router.post("/", fetchuser, createPost)
router.delete("/", fetchuser, deleteAll)
router.delete("/:id", fetchuser, deletePost)
router.put("/:id/likePost", fetchuser, likePost)
router.get("/userPost/:id", fetchuser, userPosts)


module.exports = router