const express= require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const Contacte = require('./fonction/models/ContacteSchema');
if(process.env.NODE_ENV !== 'production' )  {
    require('dotenv').config()
} 
const dbUrl=process.env.db_Url || 'mongodb://localhost:27017/yelp-camp';


 mongoose.connect(dbUrl,{
     useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true,
 })

 const db = mongoose.connection;
 db.on("error", console.error.bind(console , "connection error:"));
 db.once("open", () => {
     console.log("Database connected");
 });


app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine' ,'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.render('home')
})


app.get('/About_me', (req,res)=>{
    res.render('About_me')
})

app.get('/contacte_page', (req,res)=>{
    res.render('contacte')
})
app.post('/message', async(req,res)=>{
   const frm = req.body;
   const message = new Contacte(frm);
   await message.save();
   res.redirect('About_me')
})
const port = process.env.PORT || 3000 
app.listen(port,() =>
console.log('in port 300'))

