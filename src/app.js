const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
require('./mongoose');

const app = express();
const port = process.env.PORT || 3000;

const publickDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publickDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rokki'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rokki'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Rokki'
    })
});

app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'Tou must provide a search term'
        })
    }

    res.send({
        products:[]
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                location,
                address: req.query.address,
                forecast: forecastData
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Error page',
        name: 'Rokki',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error page',
        name: 'Rokki',
        errorMessage: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});