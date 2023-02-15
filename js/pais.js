const pais = document.getElementById('Wheather-pais')
const btnClima  = document.querySelector('.wheather-btn')
const title  = document.querySelector('.wheather-title-pais')
const capital  = document.querySelector('.wheather-title-capital')
const clima  = document.querySelector('.wheather-title-clima')
const bandera  = document.querySelector('.img-bandera')



function obtenerPaises() {
    
    fetch('https://restcountries.com/v3.1/all')
      .then(res=>{
         if(res.ok){
             res.json().then(listaPaises=>{
                console.log(listaPaises);
                listaPaises.map(aux=>{
                    pais.innerHTML += `
                    <option class="img" value="${aux.cca2}" >${aux.name.common}</option>
                    `
          
                });
        })
    }
}) 
}



function ObtenerClima(pais,ciudad) {
    const api ='ba3431369e71c9ed83a60b71efbef081'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${api}`
    fetch(url).then(res=> {
        res.json().then(datos=>{
            const { main: {temp} } = datos
             const centigrados = parseInt(temp - 273.15)
             clima.innerHTML = `${centigrados} &#8451;`;
            
        })
    })   
}

obtenerPaises()

pais.addEventListener('change',(e)=>{  
    buscarPaisBanderas(e.target.value)
})

function buscarPaisBanderas(code) {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(res=>{
        res.json().then(datos=>{
            console.log(datos);
            datos.map(aux=>{
                const pais =aux.name.common
                const city = aux.capital
                capital.innerHTML = `${city}`
                title.innerHTML = `${pais}`
                bandera.innerHTML = ` <img class="img" src="${aux.flags.png}" >`
                ObtenerClima(pais,city);
            })
        })
    })
 
    
}