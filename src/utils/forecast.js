const request = require('request');


const forecast = (latitude, longitude, callback) =>{
    const url = 'https://samples.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=439d4b804bc8187953eb36d2a8c26a02';
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback("Unable to find the location!", undefined);
        } 
        else {
            callback(undefined, `Temperature is "${response.body.main.temp}" and the humidity is "${response.body.main.humidity}". Weather is "${response.body.weather[0].main}" which means "${response.body.weather[0].description}`);
        }
    })

}

module.exports = forecast;