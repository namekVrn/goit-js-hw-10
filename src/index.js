import './css/styles.css';
// import {fetchCountries} from './fetchCountries.js'
import debounce from 'lodash.debounce'


const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box')
const ul = document.querySelector('.country-list')
input.addEventListener('input', debounce((e)=>{
    let serchCountry = e.target.value
    console.log(serchCountry)
    fetchCountries(serchCountry)
    .then((response)=>{
        console.log(renderCountry(response))
        let objCounrty = renderCountry(response)
        ul.insertAdjacentHTML("beforeend",objCounrty)
        
    })
    .catch((error)=>{console.log(error)})
}, 300))
// +'?fields={name.official},{capital},{population}, {flags.svg},{languages}
const fetchCountries = (country)=>{
    let countries = '';
    console.log(countries)
    return fetch('https://restcountries.com/v3.1/name/'+country)
    .then((response)=>{
      if(!response.ok){
        throw new Error(response.status);
      }
      return response.json()
    })
}

console.log(fetchCountries("peru"))


const renderCountry = (counryObj) =>{
    let resultCountry = counryObj.map((elem)=>{
        return `<li class="itembox">
        <img class="img_flag" src="${elem.flags.svg}" alt="flag">
        <span class="countryName">${elem.name.official}</span>
        <li>`
    }).join('')
    return resultCountry
    console.log(resultCountry)
}

