// this is client side js 

console.log('Client js loaded!');


// const url = fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })

// Fetching at its best



const form = document.querySelector('form');

const searchElement = document.querySelector('input');

const message1 = document.querySelector('#pLocation');
const message2 = document.querySelector('#pForecaste');

//message1.textContent = 'from js'

// just for fun :



// add a eventlistner

form.addEventListener('submit', (event) => {
    event.preventDefault() // prevent the refresing of browser.
    const location = searchElement.value; // goa

    message1.textContent = 'Loading.....'; // to give loading effect
    message2.textContent = ''; // blanck so that latest forecaste could be updated

    const weather_url = fetch('http://localhost:3000/weather?address=' + location);
    weather_url.then((res) => {
    res.json().then((weatherData) => {
        if(!weatherData.error){
            message1.textContent = 'Location: ' + weatherData.location;
            message2.textContent = 'Forecaste: ' + weatherData.forcaste;
            // console.log(weatherData.location);
            // console.log(weatherData.forcaste);
        } else {
            //console.log('Error Found');
            message1.textContent = weatherData.error;
        }
    });
})
    
})