var formElement = document.getElementById("weathercity")
var apiKey = "9f623ab5364492b2e8d301b8c97200b6"

formElement.addEventListener("submit", function(evt){
    evt.preventDefault()

var city = document.getElementById("cityname").value
console.log(city)
currentWeather(city)
fiveDayForecast(city)
})

function currentWeather(city) {
    var url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial` //back tics template literal
    fetch(url)
    .then(response =>  response.json())
    .then(apidata => {
        console.log(apidata)

        var displayForecast = document.getElementById("currentForecast");
        displayForecast.innerHTML = `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${city}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Temperature: ${apidata.main.temp}<img src="https://openweathermap.org/img/wn/${apidata.weather[0].icon}@2x.png"/></h6>
          <p class="card-text">Humidity: ${apidata.main.humidity}</p>
        <p class="card-text">windspeed: ${apidata.wind.speed}</p>
          <p class="card-test">Description: ${apidata.weather[0].description}</p>
        </div>
      </div>`
    })
}

function fiveDayForecast(city) {
    var url =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}` //back tics template literal
    fetch(url)
    .then(response =>  response.json())
    .then(apidata => {
        console.log(apidata)
        let htmlCode =""
        for (let i = 0; i < apidata.list.length;i=i+8){
            htmlCode += `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${apidata.list[i].dt_txt}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">Temperature: ${apidata.list[i].main.temp}<img src="https://openweathermap.org/img/wn/${apidata.list[i].weather[0].icon}@2x.png"/></h6>
              <p class="card-text">Humidity: ${apidata.list[i].main.humidity}</p>
            <p class="card-text">windspeed: ${apidata.list[i].wind.speed}</p>
              <p class="card-test">Description: ${apidata.list[i].weather[0].description}</p>
            </div>
          </div>
            `
        }
        document.getElementById("displayDays").innerHTML = htmlCode
    })
}


// let html = document.getElementById("previousSearch").innerHTML;
