'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
const h2 = document.querySelector('h2');
const image = document.querySelector('.img'); //synchronous way
image.src = 'img/img-1.jpg'; //asynchronous way: setting the src of an img is loading the img in background. the code will not be blocked means other code will be executed except this one
image.addEventListener('load', function () {
  image.classList.add('fadeIn');
}); //a callback function for when the img is loaded. we deferred the action for the future making the code non blocking
h2.textContent = 'hello';
