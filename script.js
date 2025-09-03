'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const mainCountryContainer = document.querySelector('.main-country');
const neighborCountriesContainer = document.querySelector('.neighbors');
// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

//https://countries-api-836d.onrender.com/countries/

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

//******************************************* */
// const h2 = document.querySelector('h2');
// const image = document.querySelector('.img'); //synchronous way
// image.src = 'img/img-1.jpg'; //asynchronous way: setting the src of an img is loading the img in background. the code will not be blocked means other code will be executed except this one
// image.addEventListener('load', function () {
//   image.classList.add('fadeIn');
// }); //a callback function for when the img is loaded. we deferred the action for the future making the code non blocking
// h2.textContent = 'hello';

//******************************************* */
//First API Call------old school way of doing AJAX
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   //console.log(request);
//   request.addEventListener('load', function () {
//     //console.log(this.responseText);
//     //data comes in a json format: obj as string so we need to convert it back into a object. Destructured using [] as it is an obj inside array
//     const [dataToJSON] = JSON.parse(this.responseText);
//     console.log(dataToJSON);

//     //   console.log(dataToJSON.currencies.BDT.name);
//     console.log(dataToJSON.languages);
//     //   console.log((+dataToJSON.population / 1000000).toFixed(2));
//     //console.log(dataToJSON.currencies);

//     //languages dynamically convert
//     const languages = Object.values(dataToJSON.languages).join(' ,');
//     //console.log(languages);

//     //currencies dynamically convert
//     const currencies = Object.values(dataToJSON.currencies)
//       .map(curr => `${curr.symbol}, ${curr.name}`)
//       .join(' ');

//     //console.log(currencies);
//     //showing on the html
//     const HTML = `
//         <article class="country">
//           <img class="country__img" src="${dataToJSON.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${dataToJSON.name.common}</h3>
//             <h4 class="country__region">${dataToJSON.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +dataToJSON.population / 1000000
//             ).toFixed(2)} M people</p>
//             <p class="country__row"><span>🗣️</span>${languages}</p>
//             <p class="country__row"><span>💰</span>${currencies}</p>
//            </div>
//         </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', HTML);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('bangladesh');
// // getCountryData('portugal');
// // getCountryData('united kingdom');
// getCountryData('papua new guinea');
// getCountryData('australia');

//******************************************* */
//Sequence of ajax call--get neighbor country
//nested call backs
//creating html file function

const renderCountry = function (data, className = '') {
  //languages dynamically convert
  const languages = Object.values(data.languages).join(' ,');

  //currencies dynamically convert
  const currencies = Object.values(data.currencies)
    .map(curr => `${curr.symbol}, ${curr.name}`)
    .join(' ');
  const HTML = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(2)} M people</p>
            <p class="country__row"><span>🗣️</span>${languages}</p>
            <p class="country__row"><span>💰</span>${currencies}</p>
           </div>
        </article>`;
  if (className === 'neighbor') {
    neighborCountriesContainer.insertAdjacentHTML('beforeend', HTML);
  } else {
    mainCountryContainer.insertAdjacentHTML('beforeend', HTML);
  }
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbor = function (country) {
  //Ajax call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  //console.log(request);
  request.addEventListener('load', function () {
    //console.log(this.responseText);

    const [dataToJSON] = JSON.parse(this.responseText);
    //console.log(dataToJSON);

    //showing on the html--render country 1
    renderCountry(dataToJSON);

    //get neighbor country
    const neighbors = dataToJSON.borders;

    if (!neighbors) return;
    neighbors.forEach(neighbor => {
      //Ajax call country 2
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
      request2.send();

      request2.addEventListener('load', function () {
        const [dataToJSON2] = JSON.parse(this.responseText);
        //console.log(dataToJSON2);
        //showing on the html--render country 1
        renderCountry(dataToJSON2, 'neighbor');
      });
    });
  });
};

//getCountryAndNeighbor(`russia`);

//******************************************* */
//identifying callback hell
// setTimeout(() => {
//   console.log(`1 second passed`);
//   setTimeout(() => {
//     console.log(`2 second passed`);
//     setTimeout(() => {
//       console.log(`3 second passed`);
//       setTimeout(() => {
//         console.log(`4 second passed`);
//         setTimeout(() => {
//           console.log(`5 second passed`);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

//******************************************* */
//solution
//ES6-------Promises and the Fetch API

// const request = fetch('https://restcountries.com/v3.1/name/portugal');

// console.log(request);

//consume a promise
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
getCountryData('bangladesh');
