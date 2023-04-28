import Post from "../models/Posts.js";
import User from "../models/User.js";

/* create */

export const createPost= async (req,res) => {
    try {
        const { userId, description, picturepath } = req.body;
        const user = await User.findById(userId);
        const newPost= new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (err) {
       res.status(400).json({message: err.message}) 
    }
}

/* Read */
export const getFeedPosts = async(req, res) => {
    try {
      const post = await Post.find();
      res.status(200).json(post);  
    } catch (err) {
        res.status(400).json({message: err.message})  
    }
}

export const getUserPosts = async(req, res) => {
    try {
      const { userId } = req.params;
      const post = await Post.find({ userId });
      res.status(200).json(post);  
    } catch (err) {
        res.status(400).json({message: err.message})  
    }
}

/* update*/

export const likePost = async(req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.params;
        const post = await Post.findById(id);

        if (!isLiked) {
             post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        res.stsus(200).json(updatePost);
    } catch (err) {
        res.status(400).json({message: err.message}) 
    }
}
