const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')


//express app

const app = express();

//connect to mongo db
const dbURI = 'mongodb+srv://kingjokes:jokesbaba@cluster0.ljkkl.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result)=>{
        console.log('connected to db')
        //listen for requests
        app.listen(3000)
    })
    .catch((error)=>console.log(error))
//register view engine
app.set('view engine','ejs')
// app.use(express.static('assets'))
app.use('/assets',express.static(__dirname+'/assets'))
app.use(express.urlencoded({extended:true}))


app.use(morgan('dev'));


// routes
app.get('/',(req, res)=>{
    res.redirect('/blogs')
})
app.get('/about',(req, res)=>{
    res.render('about', {title:'About Us'})
})




//redirects
app.get('/about-us',(req,res)=>{
    res.status(301).redirect('/about')
})

//blog routes
app.use('/blogs',blogRoutes)

//404 error
app.use((req,res)=>{
    res.status(404).render('404',{title:'Error Page'})
})