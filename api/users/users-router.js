const express = require('express');
const router = express.Router();

// Import required models and middleware functions
const Users = require('./users-model');
const { validateUserId, validateUser, validatePost } = require('/Users/walynsmith/node-api3-project/api/middleware/middleware.js');

router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user by ID" });
  }
});

router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = await Users.insert(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating new user" });
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  try {
    const updatedUser = await Users.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const deletedUser = await Users.remove(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const userPosts = await Users.getUserPosts(req.params.id);
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user posts" });
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  try {
    const newPost = await Users.insertUserPost(req.params.id, req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating user post" });
  }
});

module.exports = router;
