export const fetchCountries = (country)=>{
  
    return fetch(`https://restcountries.com/v3.1/name/${country}?fields=capital,name,population,flags,languages`)
    .then((response)=>{
      if(!response.ok){
        throw new Error(response.status);
      }
      console.log(response)
      return response.json()
      
    })

    
}
