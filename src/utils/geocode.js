
const request = require('request');

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmluZWV0c2F3YW50IiwiYSI6ImNrY2Vkb3Q2MjA3ZG4ycm0yMWFtcGJlNXoifQ.FRXfjPeK1A8uWuSIK8lcJw'

    request({url:url, json:true }, (error, response)=>{
        if(error){
           callback('Unable to connect to the location services. ', undefined); // here text is error, and data = undefined.
        } else if(response.body.features.length === 0){
           callback('Unabe to find location. Try another search ', undefined); /// here in the callback func the error is text and the data is undefined.
        }else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            }); // here error is undefined and data is the information as we get the response
        }
    })
}

module.exports = geocode