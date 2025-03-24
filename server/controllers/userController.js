const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      city: req.body.city,
      country: req.body.country,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber
    });
    
    const savedUser = await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user: savedUser
    });
  } catch (error) {
    res.status(400).json({
      error: 'Failed to create user',
      details: error.message
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v'); // Exclude version key
    res.status(200).json({
      count: users.length,
      users: users
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch users',
      details: error.message
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch user',
      details: error.message
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        city: req.body.city,
        country: req.body.country,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
      },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      error: 'Failed to update user',
      details: error.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'User deleted successfully',
      userId: req.params.id
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete user',
      details: error.message
    });
  }
};