var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    port = 4000

/////////////////////////////////////////////////////////////////////////////////
// App Config
/////////////////////////////////////////////////////////////////////////////////

// Add Mongoose
mongoose.connect('mongodb://blog:blog@ds127892.mlab.com:27892/jasonblog');
// Make Ejs Default Files
app.set('view engine', 'ejs');
// Make Css files work
app.use(express.static('public'));
// Use Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
// Take anything with _method and treat it as a PUT or DELETE
app.use(methodOverride('_method'));


/////////////////////////////////////////////////////////////////////////////////
// Schema
/////////////////////////////////////////////////////////////////////////////////
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    creadtedTime: { type: Date, default: Date.now }
})
var Blog = mongoose.model('Blog', blogSchema)



/////////////////////////////////////////////////////////////////////////////////
// Restful Route
/////////////////////////////////////////////////////////////////////////////////

// INDEX: GET - DISPLAY ALL BLOGS
app.get('/blogs', function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err)
        } else {
            res.render('index', { blogs: blogs })
        }
    })
})

// NEW: GET - DISPLAY A FORM FOR CREATING A NEW BLOG
app.get('/blogs/new', function (req, res) {
    res.render('new')
})

// CREATE: POST - CREATING A NEW BLOG
app.post('/blogs', function (req, res) {
    Blog.create({ title: req.body.blog.title, image: req.body.blog.image, body: req.body.blog.body }, function (err, blog) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/blogs')
        }
    })
})

// SHOW: GET - DISPLAY A SINGLE SPECIFIC BLOG
app.get('/blogs/:id', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            console.log(err)
        } else {
            res.render('show', { blog: foundBlog })
        }
    })
})

// EDIT: GET - DISPLAY A FORM FOR EDITING A BLOG
app.get('/blogs/:id/edit', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            console.log(err)
        } else {
            res.render('edit', { blog: foundBlog })
        }
    })
})

// UPDATE: PUT - UPDATE A SPECIFIC BLOG
app.put('/blogs/:id', function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, upadateBlog){
        if(err){
            res.redirect('/blogs')
        }else{
            res.redirect('/blogs/' + upadateBlog._id)
        }
    })
})


// DESTROY: DELETE - A SPECIFIC BLOG
app.delete('/blogs/:id', function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, req){
        if(err){
            console.log(err)
        }else{
            res.redirect('/blogs')
        }
    })
})


app.listen(port, function (res, req) {
    console.log('Listening on port ', port)
})






































// // Test Create
// Blog.create({
//     title: 'Jason First Blog', 
//     image: 'https://static.pexels.com/photos/419964/pexels-photo-419964.jpeg', 
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis augue felis.'},
//     function(err, req){
//         if(err){
//             console.log(err)
//         }else{
//             console.log(req)
//         }
//     })