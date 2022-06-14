const express = require('express')
const {getContacts} = require("../controllers/post-controller");

const router = express.Router()

router.get('/contacts', getContacts)

module.exports = router;