'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const mainCountryContainer = document.querySelector('.main-country');
const neighborCountriesContainer = document.querySelector('.neighbors');
const imageContainer = document.querySelector('.images');
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
//   console.log('lottery draw happening'); //Synchronous start):new Promise(...) constructor সাথে সাথে চালু হয়। Promise constructor synchronous
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
// const wait = seconds => {
//   return new Promise(resolve => {
//     setTimeout(resolve, seconds * 1000); //setTimeout(() => resolve(`Waited ${seconds} seconds ⏳`), seconds * 1000); -->with value
//   });
// };
// wait(1)
//   .then(() => {
//     //then no parameter because we didnt pass anything in resolve and we just called it in the set timeout
//     console.log('1 second passed');
//     return wait(2); //নতুন promise রিটার্ন করে।
//   })
//   .then(() => {
//     console.log('2 second passed');
//     return wait(3);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(4);
//   })
//   .then(() => {
//     console.log('4 second passed');
//     return wait(5);
//   })
//   .then(() => console.log('5 second passed'));

// Promise.resolve('abc').then(ab => console.log(ab));
// Promise.reject('abc').catch(ab => console.error(ab));

/////////////////////////////////////////
//Promisifying the Geolocation API

// navigator.geolocation.getCurrentPosition(
//   position => {
//     console.log(position);
//   },
//   err => console.error(err)
// ); //async
//console.log('Getting Position');

//rendering country on dom
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
// //getting the geolocation
// const getPosition = () => {
//   return new Promise((resolve, reject) => {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   //success call back
//     //   err => reject(err) //reject call back
//     //); or
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// //getting the country based on geolocation
// const whereAmI = () => {
//   //we are calling get position here to get the coords
//   /*getPosition() return করে একটি Promise, যেটা resolve হবে user location পাওয়ার পর।
// .then() এ আমরা coords destructure করি → fetch call return করি।
// মুখ্য জিনিস: fetch return করতে হবে, যাতে পরের .then() এ fetch response handle করা যায়। */
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//       ); //we need to return fetch from here to chain it
//     })
//     // fetch(
//     //   `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//     // )
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Problem with geocoding : ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       //console.log(data);
//       console.log(`You're in ${data.city}, ${data.countryName}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
//     })
//     .then(response => {
//       //console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       //console.log(data);
//     })
//     .catch(err => {
//       console.log(`${err.message}`);
//     });
// };

// whereAmI();

///////////////////////// or vice versa in get position where am i
//getting the geolocation
/*
const getPosition = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   //success call back
    //   err => reject(err) //reject call back
    //); or
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getPosition()
  .then(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    whereAmI(lat, lng);
  })
  .catch(err => console.error(err));

//getting the country based on geolocation
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
      //console.log(`You're in ${data.city}, ${data.countryName}`);
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
*/
///////////////////////////////////////
// Coding Challenge #2

// const wait = seconds => {
//   return new Promise(resolve => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// const createImage = imgPath => {
//   return new Promise((resolve, reject) => {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function () {
//       imageContainer.appendChild(img);
//       resolve(img);
//     });
//     img.addEventListener('error', () => {
//       reject(new Error('Image not found'));
//     });
//   });
// };
// let currentImage;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log('img-1 loaded');
//     return wait(2);
//   }) //setTimeout / wait + createImage একসাথে direct inline লিখলে chaining ভেঙে যায়। তাই আমরা wait return Promise করি, আর পরের createImage .then() এ call করি। .then() থেকে যা return করা হয়, সেটা পরের .then() এর input হিসেবে আসে। direct createImage('img/img-2.jpg') call করলে previous wait(2) কে respect করবে না, timing ঠিক থাকবে না।
// .then(() => {
//   currentImage.style.display = 'none';
//   return createImage('img/img-2.jpg');
// })
// .then(img => {
//   currentImage = img;
//   console.log('img-2 loaded');
//   return wait(2);
// })
// .then(() => {
//   currentImage.style.display = 'none';
//   return createImage('img/img-3.jpg');
// })
// .then(img => {
//   currentImage = img;
//   console.log('img-3 loaded');
//   return wait(2);
// })
// .then(() => {
//   currentImage.style.display = 'none';
// })
// .catch(err => console.error(err));

//eivave set time out er mddhe dile hbena cz
// createImage('img/img-1.jpg')
//   .then(img => {
//     setTimeout(() => {
//       currentImage = img;
//       console.log('img-1 loaded');
//       currentImage.style.display = 'none';
//       return createImage('img/img-2.jpg');
//     }, 2000);
//   })
//   .then(img => {
//     setTimeout(() => {
//       currentImage = img;
//       console.log('img-2 loaded');
//       currentImage.style.display = 'none';
//       return createImage('img/img-3.jpg');
//     }, 2000);
//   })
//   .then(img => {
//     setTimeout(() => {
//       currentImage = img;
//       console.log('img-3 loaded');
//       currentImage.style.display = 'none';
//     }, 2000);
//   })
//   .catch(err => console.error(err));

/*তুমি return লিখেছ setTimeout এর ভিতরে।
কিন্তু setTimeout callback return করা value কোনো Promise chain এ affect করে না।
তাই .then() chain ভেঙে যাবে → পরের image load হবে না।
Promise chaining এ return করতে হবে Promise, কিন্তু setTimeout return করে না → asynchronous task background এ চলে যায়। 
সমাধান: wrap setTimeout in a Promise like wait function
*/
/*
const createImage = imgPath => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;
    //When the image is done loading, append it to the DOM element
    img.addEventListener('load', () => {
      imageContainer.appendChild(img);
      //The fulfilled value should be the image element itself
      resolve(img);
    });
    //In case there is an error loading the image ('error' event), reject the promise.
    img.addEventListener('error', () => {
      reject(new Error('Image not Found'));
    });
  });
};

//After the image has loaded, pause execution for 2 seconds using the wait function.We need to wrap settimeout in a promise bcz otherwise the then will not work.
const wait = ms => {
  return new Promise(resolve => setTimeout(resolve, ms * 1000));
};

//Comsume the promise using .then and also add an error handler
// hide the current image, to hide it we need a global variable
let currentImage;
createImage('img/img-1.jpg')
  .then(img => { //we passed img parameter because load resolved has img parameter
    currentImage = img;
    console.log('Img-1 loaded');
    return wait(2);
  }) //setTimeout / wait + createImage একসাথে direct inline লিখলে chaining ভেঙে যায়। তাই আমরা wait return Promise করি, আর পরের createImage .then() এ call করি। .then() থেকে যা return করা হয়, সেটা পরের .then() এর input হিসেবে আসে। direct createImage('img/img-2.jpg') call করলে previous wait(2) কে respect করবে না, timing ঠিক থাকবে না।
  .then(() => { //wait doesnt have any resolved parameter thats why we didnt pass any parameter in then
    //After the 2 seconds have passed, hide the 1st image (set display to 'none'), and load a second image
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Img-2 loaded');
    return wait(2);
  })
  .then(() => {
    //After the 2 seconds have passed, hide the 2nd image (set display to 'none'), and load a 3rd image
    currentImage.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Img-3 loaded');
    return wait(2);
  })
  .then(() => {
    //After the 2 seconds have passed, hide the 3rd image.
    currentImage.style.display = 'none';
  })
  .catch(err => console.error(err));
*/

//using asyc await
// const createImage = imgPath => {
//   return new Promise((resolve, reject) => {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     //When the image is done loading, append it to the DOM element
//     img.addEventListener('load', () => {
//       imageContainer.appendChild(img);
//       //The fulfilled value should be the image element itself
//       resolve(img);
//     });
//     //In case there is an error loading the image ('error' event), reject the promise.
//     img.addEventListener('error', () => {
//       reject(new Error('Image not Found'));
//     });
//   });
// };
// //After the image has loaded, pause execution for 2 seconds using the wait function.We need to wrap settimeout in a promise bcz otherwise the then will not work.
// const wait = ms => {
//   return new Promise(resolve => setTimeout(resolve, ms * 1000));
// };

// const loadImages = async () => {
//   try {
//     //1st image
//     let image = await createImage('img/img-1.jpg');
//     console.log('img-1 loaded');
//     await wait(2);
//     image.style.display = 'none';
//     //2nd image
//     image = await createImage('img/img-2.jpg');
//     console.log('img-2 loaded');
//     await wait(2);
//     image.style.display = 'none';
//     //3rd image
//     image = await createImage('img/img-3.jpg');
//     console.log('img-3 loaded');
//     await wait(2);
//     image.style.display = 'none';
//   } catch (error) {
//     console.log(error);
//   }
// };
// loadImages();

///////////////////////////////////////
// Consuming Promises with Async/Await
/*
const whereAmI = async function (country) {
  // যখন async function call হয়, তখন ভেতরের normal code (await এর আগ পর্যন্ত)
  // সাথে সাথেই synchronous ভাবে call stack এ run হবে।
  console.log('awit before synchronous -1');
  // এখানে এসে 'await' এ pause হবে।
  // fetch() নিজে একটা promise return করে।
  // async function এখান থেকে থেমে যাবে (non-blocking ভাবে),
  // আর এই বাকি অংশ (continuation) microtask queue তে রাখা হবে।
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  // fetch এর promise resolve হলে, Event Loop microtask queue থেকে
  // এই continuation আবার call stack এ push করবে, তখন এখান থেকে resume হবে।
  console.log('awit after synchronous--3');
  console.log(res);
};
whereAmI('portugal');
// যেহেতু await এ pause হয়েছিল, async ফাংশনের বাকি কোড তখনও চলেনি,
// তাই এই লাইন আগে execute হবে।
console.log('6---2');
*/
/*
//error message
const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

//rendering country in dom
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
//getting the geo location
const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
//getting the country
const whereAmI = async function () {
  try {
    const geoPosition = await getPosition();
    const { latitude: lat, longitude: lng } = geoPosition.coords;
    const geoResponse = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!geoResponse.ok) throw new Error(`Problem getting the location`);
    //console.log(geoResponse);
    const geoData = await geoResponse.json();
    //console.log(geoData);

    const response = await fetch(
      `https://restcountries.com/v3.1/name/${geoData.countryName}`
    );
    if (!response.ok) throw new Error(`Problem getting the country`);

    //console.log(response);
    const data = await response.json();
    //console.log(data);
    renderCountry(data[0]);
    return `You're in ${geoData.city}, ${geoData.countryName}`; //async func alwz return a promise
  } catch (err) {
    //console.error(error);
    renderError(`Something went wrong : ${err.message}`);

    //reject promise returned from async func. rethrowing error bcz even if there is an error in the async fun it will still return a promise which we can access through then(city) bt it will be undefined.
    throw err;
  }
};
//whereAmI();

/////////////////////////////////////////
//Returning Values from Async Functions
console.log('1. Getting the location');
// const city = whereAmI(); //it will give a promise
// console.log(city);
//we r mixing then and asyc-->not a good practice
// whereAmI()
//   .then(city => console.log(`2. ${city}`))
//   .catch(err => console.error(`2. ${err.message}`)) //this city parameter is the return value of that async func
//   .finally(() => console.log('3. got the location'));
//console.log('3. got the location');
//or
//so we use iife bcz we dont want another function
//(function () {})();--> iifee
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2. ${city}`);
//   } catch (error) {
//     console.error(`2. ${err.message}`);
//   } finally {
//     console.log('3. got the location');
//   }
// })();

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2. ${city}`);
  } catch (error) {
    console.error(`2. ${err.message}`);
  }
  console.log('3. got the location');
})();
*/

///////////////////////////////////////////
//Running Promises in Parallel
//Let's now imagine that we wanted to get some data about three countries at the same time, but in which the order that the data arrives does not matter at all.
/*
const getJson = async (url, errMsg = 'Something went wrong') => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(errMsg);
  }
};

const getThreeCountries = async function (c1, c2, c3) {
  try {
    //Sequential fetching -->this way data 2 waits for data 1 to finish fetching
    // const [data1] = await getJson(`https://restcountries.com/v3.1/name/${c1}`); //it gives an array. now destructure.
    // const [data2] = await getJson(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJson(`https://restcountries.com/v3.1/name/${c3}`);
    // const arrayOfCities = [data1.capital, data2.capital, data3.capital].flat();
    // console.log(arrayOfCities); //we wanted an array of city

    //Prallel fetching
    //helper function on promise constructor. static method. promise.all is a combinator function
    const datas = await Promise.all([
      getJson(`https://restcountries.com/v3.1/name/${c1}`),
      getJson(`https://restcountries.com/v3.1/name/${c2}`),
      getJson(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    const arrayOfCities = datas
      .flat()
      .map(data => data.capital)
      .flat();
    console.log(arrayOfCities);
  } catch (err) {
    console.error(err);
  }
};
getThreeCountries('portugal', 'bangladesh', 'germany');
*/

//////////////////////////////////////////
//Other Promise Combinators: race, allSettled and any
//promise.race
const getJson = async (url, errMsg = 'Something went wrong') => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(errMsg);
  }
};
// (async function () {
//   const response = await Promise.race([
//     getJson(`https://restcountries.com/v3.1/name/mexico`),
//     getJson(`https://restcountries.com/v3.1/name/egypt`),
//     getJson(`https://restcountries.com/v3.1/name/bangladesh`),
//   ]);
//   console.log(response[0]);
// })();

// a timeout fetch that automatically rejects after a certain time has passed. if the user has bad internet this is the usecase
const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('Requests took too long'));
    }, seconds * 1000);
  });
};

(async () => {
  try {
    const result = await Promise.race([
      getJson(`https://restcountries.com/v3.1/name/uganda`),
      getJson(`https://restcountries.com/v3.1/name/egypt`),
      timeout(1), // যদি 1 সেকেন্ডের মধ্যে কোনটাও resolve না করে, তাহলে এইটা reject করবে
    ]);
    console.log('Winner', result); // শুধু যে promise আগে settle হলো, তার result আসবে
  } catch (error) {
    console.error('Loser', error.message);
  }
})();

//promise.allSettled
