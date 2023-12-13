// api/middleware/middleware.js

function logger(req, res, next) {
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}, Timestamp: ${Date.now()}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await Users.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error validating user ID" });
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text || text.trim() === "") {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
