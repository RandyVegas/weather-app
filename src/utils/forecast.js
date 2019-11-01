const request = require('request');

const forecast = (latitude, longitude, callback) => {

const url = 'https://api.darksky.net/forecast/7e40c439c61beeb01ff7baec735c311d/' + latitude + ',' + longitude;

request({ url, json: true }, (error, {body}) => {
    if (error){
        callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
        callback('Unable to find location.', undefined);
    }
    else {
        callback(undefined, `It is currently ${body.currently.temperature} degrees out. Today temperature min: ${body.daily.data[0].temperatureMin}, temperature max: ${body.daily.data[0].temperatureMax} There is a ${body.currently.precipProbability}% chance of rain.`);
    }
});

};

module.exports = forecast;