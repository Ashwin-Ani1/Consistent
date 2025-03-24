const mongoose = require('mongoose');
const validator = require('validator'); // For email validation

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(value) {
        // Validate that dob is not in the future
        return value <= new Date();
      },
      message: 'Date of birth cannot be in the future'
    }
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(value) {
        // Simple phone number validation (adjust as needed)
        return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value);
      },
      message: 'Please provide a valid phone number'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true // Cannot be modified after creation
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Update the updatedAt field before updating
userSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Create text index for searching
userSchema.index({ 
  firstName: 'text', 
  lastName: 'text', 
  email: 'text',
  city: 'text',
  country: 'text'
});

// Static method to search users
userSchema.statics.search = async function(query) {
  return await this.find({
    $text: { $search: query }
  }, {
    score: { $meta: 'textScore' }
  }).sort({
    score: { $meta: 'textScore' }
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;