//blog routes
const express = require('express')
const router = express.Router();
const blogController  = require('../controller/blogController')
router.get('/', blogController.blog_index)
router.post('/',blogController.blog_create)
router.get('/:id',blogController.blog_details)
router.delete('/:id',blogController.blog_delete)
router.get('/create',blogController.blog_create_get)


module.exports=router;