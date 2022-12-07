var cityName = "";
var apiKey = "a90b37582c4f712e55eb4bd2432a468a";
var repoContainerEl = document.querySelector('#repos-container');

function displayWeather(city){
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    fetch (url) 
    .then(function(response){
        return response.json()
    
    })
    .then(function(currentData){
        //console.log(currentData)
        var fiveDayUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${apiKey}&units=imperial`
        fetch(fiveDayUrl)
        .then(function(response){
            return response.json()
        })
        .then (function (fiveDay){
            console.log(fiveDay)
            //console.log(fiveDay.list[1])
            displayCurrentWeather(fiveDay.list[1])
            var fiveDayIndex = 1
            for (let i = 3; i < fiveDay.list.length; i=i+8) {
                console.log(fiveDay.list[i])
                document.querySelector("#day"+ fiveDayIndex + "Min").innerText = fiveDay.list [i].main.temp_min
                document.querySelector("#day"+ fiveDayIndex + "Max").innerText = fiveDay.list [i].main.temp_max
                document.querySelector("#img"+ fiveDayIndex).src = `http://openweathermap.org/img/wn/${fiveDay.list[i].weather[0].icon}@2x.png` 

                
                fiveDayIndex++
        
            }
        })
    })
}



function displayCurrentWeather(currentWeather){
    console.log(currentWeather)
    console.log (currentWeather.main.temp)
    $("#temp").text("TEMP:"+ currentWeather.main.temp)
    $("#wind").text("Wind-speed:"+ currentWeather.wind.speed)
    $("#humidity").text("Humidity:"+ currentWeather.main.humidity)
}
$('.search-btn').on ('click', function(){
    const value = $('#search').val()
    displayWeather(value)
      })
