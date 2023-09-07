

const express = require('express');
const router = express.Router();


const usersController = require('../controllers/usersController');

router.post('/:uid/documents', usersController.uploadDocuments);

module.exports = router;

