const Blog = require('../models/blog') //require blog model

// render blog home page
const blog_index = (req, res)=>{
    //fetch all blog post and sort
    Blog.find().sort({createdAt:-1}).then((result)=>{
        res.render('index', {
            title: 'All Blogs',
            blogs:result

        })
    }).catch(error=>console.log(error))
}

//fetch blog details using id and render page
const blog_details = (req, res)=>{
    Blog.findById(req.params.id).then((result)=>{
        res.render('details',{
            blog:result,
            title: result.title
        })
    }).catch(error=>{
        res.status(404).render('404',{
            title:'Blog not found'
        })
    })
}

//save new blog
const blog_create = (req, res)=>{
    const blog = new Blog(req.body)
    blog.save().then((result)=>{
        res.redirect('/')
    }).catch(error=>console.log(error))
}

//delete blog
const blog_delete = (req, res)=>{
    Blog.findByIdAndRemove(req.params.id)
        .then((response)=>{
            res.json({
                redirect:'/blogs'
            })
        }).catch(error=>console.log(error))
}

//render blog create page
const blog_create_get = (req, res)=>{
    res.render('create',{title:'Create a new blog'})
}



module.exports={
    blog_index,
    blog_details,
    blog_create,
    blog_delete,
    blog_create_get
}