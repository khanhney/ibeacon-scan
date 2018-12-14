const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Api = require('./models/BLE');
const app = express();
var validator = require('validator');
const bodyParser = require('body-parser').urlencoded({extended: false});

// app config
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));


app.get('/', (req, res)=>{
    Api.find({})
        .then(result => {
            res.render('home', {data: result});
        })
        .catch(err => console.log(err.message));
});

app.post('/addBeacon', bodyParser, (req, res)=>{
    const { uuid, minor, nameProduct, priceProduct, madeIn, info, img} = req.body;
    // console.log({ uuid, minor, nameProduct, priceProduct, madeIn, info, img});
    if(validator.isUUID(uuid) === true){
        const demo = new Api({ uuid, minor, nameProduct, priceProduct, madeIn, info, img});
        demo.save()
            .then(() => {
                res.redirect('/');
                console.log('Save Success');
            })
            .catch(err => console.log(err.message));
    }
    else{
        console.log('Save Fail');
        res.redirect('/');
    }
})

// can remove info mlab -> error:duplicate
const uri = 'mongodb://khanhney:123456@ds121456.mlab.com:21456/xday';
mongoose.connect(uri, {useMongoClient: true});
mongoose.connection.once('open', ()=>{
    app.listen(3000, ()=> console.log('Server started at port 3000'));
});


