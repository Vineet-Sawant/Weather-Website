const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
// egs of routes. 

// app.com --> route
// app.com/about--> 'about route'
// app.com/help --> 'help route '
// app.com/apps --> 'apps route'


// define paths for expres config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// setup handlebars enginer and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// setup static directory to serve
app.use(express.static(publicDirPath));

// app.get('', (req, res)=>{
//     res.send('<h1>Weather</h1>');
// });

// app.get('/help', (req, res)=>{
//     res.send({
//         name:'Vineet',
//         age: 22,
//     });
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About</h1>');
// })

// vindex.hbs
app.get('',(req, res)=>{
    res.render('vindex', {
        title: 'Mausam',
        name: 'Vineet Sawant',

    });
})

// vabout.hbs
app.get('/vabout', (req, res)=>{

    res.render('vabout', {
        title: 'About Me',
        name: 'vineet r sawant',
    });
})

// help.hbs

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Me',
        name: 'vineet r sawant'
    });
}) // /help matches with the url on the incoming request, so it doesn't get below


// app.get('/weather', (req, res)=>{

//     if(!req.query.address){
//         return res.send({
//             error: 'Please enter the address!'
//         });
//     }

//     geocode(req.query.address, (error, data)=>{
//         if(error){
//             return res.send({error});
//         }

//         forecast(data.latitude, data.longitude, (error, forcastdata) => {
//             if(error){
//                 return res.send({error});
//             }
//             res.send({
//                 location: data.location,
//                 forcast : forcastdata,
//                 address: req.query.address,
//           })
//     });
    
//     // res.send({
//     //     forecast: 'Its raining',
//     //     location: 'India',
//     //     address: req.query.address,

//     // });   
// });

// below app.get(..){..} is the end point
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address Ghal re!'
        });
    }

    geocode(req.query.address, (error, data = {}) =>{
        if(error){
           return res.send({error}); // functions stops
        } 

        forecast(data.latitude, data.longitude, (error, forecastdata) => {
            if(error){
                return res.send({error});
            }
            res.send({
                location : data.location,
                forcaste: forecastdata,
                address: req.query.address,
            })
            // console.log(data.location); 
            // console.log(forecastdata);
          })
    });

   
})



app.get('/products', (req, res)=>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });

    // only one res can be sent back. 
});



app.get('/array', (req, res)=>{
    res.send([
        {
            userId: 1,
            name: 'vineet',
            age: 22
        },
        {
            userId: 2,
            name: 'sushant',
            age: 33
        },
        {
            userId: 5,
            name: 'sangeeta',
            age: 19
        }
    ])
});

app.get('/vabout/*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Vineet Sawant',
        errorMessage: 'about article not found!',

    })
})

// 404 pages
// * wildcard character, if it doesn't match the url
app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Vineet Sawant',
        errorMessage: 'Page not found'
    })
});


// server startup
app.listen(3000, ()=>{
    console.log('server is up on port 3000');
});
