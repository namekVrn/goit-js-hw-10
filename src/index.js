import './css/styles.css';
import {fetchCountries} from './fetchCountries.js'
import debounce from 'lodash.debounce'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box')
const ul = document.querySelector('.country-list')

input.addEventListener('input', debounce((e)=>{
    let serchCountry = e.target.value.trim()
    console.log(serchCountry)
    clearContainer()
    fetchCountries(serchCountry)
    .then((response)=>{
        clearContainer()
        console.log(response)
        if(response.length >= 10){
            Notify.failure("Too many matches found. Please enter a more specific name.");
            return 
        }else if(response.length <= 10 && response.length > 1){
        let objCounrty = renderCountry(response)
        console.log(objCounrty)
        ul.insertAdjacentHTML("beforeend",objCounrty)
        }
        if(response.length === 1){
            console.log('privet')
            clearContainer()
            const renderOneCounry = renderOnuCountry(response)
            ul.insertAdjacentHTML("beforeend",renderOneCounry)
        }
    })
    
    .catch((error)=>{
        if(serchCountry === ""){
            return
        }
        Notify.failure("нет такого");
    })
}, DEBOUNCE_DELAY))



function clearContainer(){
    ul.innerHTML = ''
};

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

const renderOnuCountry = (counryObj) =>{
    let resultCountry = counryObj.map((elem)=>{
        return `<li class="itembox">
        <img class="img_flag" src="${elem.flags.svg}" alt="flag">
        <ul>
            <li><span class="countryName">${elem.name.official}</span></li>
            <li><span class="addOneCountry">Capital:${elem.capital}</span></li>
            <li><span class="addOneCountry">Population:${elem.population}</span></li>
            <li><span class="addOneCountry">Languages:${elem.languages.rus}</span></li>
        </ul>
        
        <li>`
    }).join('')
    return resultCountry
    console.log(resultCountry)
}



