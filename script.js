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

// const renderCountry = function (data, className = '') {
//   //languages dynamically convert
//   const languages = Object.values(data.languages).join(' ,');

//   //currencies dynamically convert
//   const currencies = Object.values(data.currencies)
//     .map(curr => `${curr.symbol}, ${curr.name}`)
//     .join(' ');
//   const HTML = `
//         <article class="country ${className}">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(2)} M people</p>
//             <p class="country__row"><span>🗣️</span>${languages}</p>
//             <p class="country__row"><span>💰</span>${currencies}</p>
//            </div>
//         </article>`;
//   if (className === 'neighbor') {
//     neighborCountriesContainer.insertAdjacentHTML('beforeend', HTML);
//   } else {
//     mainCountryContainer.insertAdjacentHTML('beforeend', HTML);
//   }
//   countriesContainer.style.opacity = 1;
// };

// const getCountryAndNeighbor = function (country) {
//   //Ajax call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   //console.log(request);
//   request.addEventListener('load', function () {
//     //console.log(this.responseText);

//     const [dataToJSON] = JSON.parse(this.responseText);
//     //console.log(dataToJSON);

//     //showing on the html--render country 1
//     renderCountry(dataToJSON);

//     //get neighbor country
//     const neighbors = dataToJSON.borders;

//     if (!neighbors) return;
//     neighbors.forEach(neighbor => {
//       //Ajax call country 2
//       const request2 = new XMLHttpRequest();
//       request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
//       request2.send();

//       request2.addEventListener('load', function () {
//         const [dataToJSON2] = JSON.parse(this.responseText);
//         //console.log(dataToJSON2);
//         //showing on the html--render country 1
//         renderCountry(dataToJSON2, 'neighbor');
//       });
//     });
//   });
// };

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

//******************************************** */
/* const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //countriesContainer.style.opacity = 1;
};

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

const getJson = (url, errMsg = 'Something went wrong') => {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status} error)`);
    return response.json();
  });
};

//consume a promise
const getCountryData = function (country) {
  getJson(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    // fetch(`https://restcountries.com/v3.1/name/${country}`)
    //   .then(response => {
    //     console.log(response);

    //     if (!response.ok)
    //       throw new Error(`Country not found (${response.status} error)`);
    //     return response.json();
    //   })
    .then(data => {
      //console.log(data);
      renderCountry(data[0]);

      //neighbor countries
      //Chaining Promises
      const neighbors = data[0].borders;
      //console.log(neighbors);
      if (!neighbors || neighbors.length === 0)
        throw new Error(`No Neighbors Found`);
      //fetch all neighbors together এখানে neighbors.map(...) → প্রত্যেকটা neighbor এর জন্য একটা fetch(...).then(...) return করছে।ফলে আমাদের কাছে একটা array of Promises চলে আসলো।Promise.all([...]) সেই array নেয় → সব resolve হওয়া পর্যন্ত wait করে। তারপর resolve হলে, সবার JSON data একসাথে একটা array আকারে রিটার্ন করে। Promise.all([p1, p2, p3]) → resolve হবে [result1, result2, result3] এই [result1, result2, result3]-ই হচ্ছে neighborArray
      return Promise.all(
        neighbors.map(neighbor =>
          // fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`).then(
          //   response => {
          //     // console.log(response);
          //     // if (!response.ok) {
          //     //   throw new Error(`Neighbor not found: ${response.status}`);
          //     // } //else
          //     return response.json();
          //   }
          // )
          getJson(
            `https://restcountries.com/v3.1/name/${neighbor}`,
            'Neighbor not found:'
          )
        )
      ); //promise all ended
    })
    //always return the promise and then chain it outside of previous then. it returns a fulfilled value which we can access outside
    .then(neighborArray => {
      neighborArray.forEach(data => renderCountry(data[0], 'neighbor'));
    })
    .catch(err => {
      //console.log(err.message);
      // console.log(err);
      // console.error(`${err.message} ❌❌❌❌`);
      renderError(`Something went wrong : ${err.message}`);
    })
    //then is called when promise is fulfilled, catch is called when it is rejected and finally is called every time
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('australia');
});

//challenge 1
const whereAmI = (lat, lng) => {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  )
    .then(response => {
      //console.log(response);
      if (!response.ok)
        throw new Error(`Problem with geocoding : ${response.status}`);
      return response.json();
    })
    .then(data => {
      //console.log(data);
      console.log(`You're in ${data.city}, ${data.countryName}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then(response => {
      //console.log(response);
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      //console.log(data);
    })
    .catch(err => {
      console.log(`${err.message}`);
    });
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

///////////////////////////////////////
// The Event Loop in Practice
// setTimeout(() => {
//   console.log('Timeout'); // Callback Queue
// }, 0); //5

// console.log('Start'); //1
// console.log('End'); //2

// Promise.resolve('Resolved').then(res => {
//   console.log(res);
// }); //3

// Promise.resolve('Resolved 2').then(res => {
//   console.log(res);
//   for (let i = 0; i < 10000; i++) {
//     console.log(i);
//   }
//   console.log(res);
// }); //4

///////////////////////////////////////
// Building a Simple Promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('lottery draw happening'); //Synchronous start):new Promise(...) constructor সাথে সাথে চালু হয়।
//   setTimeout(() => {
//     //Async scheduling setTimeout(..., 2000) Web API কে টাস্ক দেয়।
//     //
//     if (Math.random() >= 0.5) resolve('You Win');
//     //whatever we pass in resolve we can consume it later with then
//     else reject(new Error('You Lose'));
//     console.log('Happy to finally get the result'); //eta age asbe if else er
//   }, 2000);
// });
//lottery promise is a promise object. resolve বা reject হওয়ার পর .then()/.catch() এর callback microtask queue তে যায়। Microtask সবসময় callback queue এর আগেই execute হয়, কিন্তু এখানে callback already শেষ হয়েছে, তাই microtask এখনই চালু হয়।
// lotteryPromise
//   .then(res => console.log(res))
//   .catch(err => console.error(err))
//   .finally(() => console.log('Lottery Draw finished'));

/*JavaScript মূল thread এ এটা এক্সিকিউট করে না, বরং Web API environment কে বলে দেয় —
"এই callback function টা ২০০০ms পরে চালাও।"
তারপর JS বাকি কোড execute করতে থাকে (blocking না হয়ে)।
২০০০ms শেষে, callback function টা Callback Queue তে চলে আসে → Event Loop চেক করে main thread ফাঁকা আছে কিনা → ফাঁকা হলেই callback টা main thread এ ঢুকিয়ে দেয়।
তাই setTimeout asynchronous: কারণ এটা immediate কাজ না করে পরে schedule করে।
তোর lottery example এও একই জিনিস হচ্ছে:
Promise constructor সঙ্গে সঙ্গে চলে যায় (console.log('lottery draw happening'))।
Timer (setTimeout) background এ সেট হয়।
২ সেকেন্ড পরে callback queue তে function ফেরত আসে।
Event loop দেখে main thread free, তখন callback চালায় → resolve/reject কল করে। 
//
কেন console.log('Happy...') আগে আসে .then() বা .catch() এর output এর চেয়ে?
কারণ resolve বা reject call করলে promise “settled” হয়, কিন্তু .then() / .catch() callback synchronous না।
ওগুলো microtask queue তে যায়, আর microtask queue execute হয় বর্তমান call stack খালি হওয়ার পরে।
মানে দাঁড়ালো →
আগে synchronous log গুলো বের হবে (Happy to finally get the result)
তারপর async .then() বা .catch() execute হবে।
*/

//Promisifying set timeout
const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000); //setTimeout(() => resolve(`Waited ${seconds} seconds ⏳`), seconds * 1000); -->with value
  });
};
wait(1)
  .then(() => {
    //then no parameter because we didnt pass anything in resolve and we just called it in the set timeout
    console.log('1 second passed');
    return wait(2); //নতুন promise রিটার্ন করে।
  })
  .then(() => {
    console.log('2 second passed');
    return wait(3);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(4);
  })
  .then(() => {
    console.log('4 second passed');
    return wait(5);
  })
  .then(() => console.log('5 second passed'));
