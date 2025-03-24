const express = require('express');
const router = express.Router();
const { 
  createUser, 
  getUsers, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController'); // Path adjusted
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

router.use(apiKeyMiddleware);
router.post('/', createUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;