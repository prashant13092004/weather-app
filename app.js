document.addEventListener('DOMContentLoaded',()=>{
    const cityInput =document.getElementById('city-input');
    const getWeatherInfo =document.getElementById('get-weather-btn');
    const weatherInfo =document.getElementById('weather-info');
    const cityName =document.getElementById('city-name');
    const temperature =document.getElementById('temperature');
    const description =document.getElementById('description');
    const errorMessage =document.getElementById('error-message');

    const API_KEY = "98a51521fa6a68f0cbf4d6bf992b10cf";

    getWeatherInfo.addEventListener('click' , async ()=> {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            dispalyWeatherData(weatherData);
        } catch (error){
            showError();
        }


    })

    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log(response);

        if(!response.ok){
            throw new Error('City not found');   
        };

        const data = await response.json();
        return data;
        
    }

    function dispalyWeatherData(data){
        console.log(data);
        const {name , main , weather} = data;
        cityName.textContent = name;

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        temperature.textContent = `Temperature : ${main.temp} Celcius`;

        description.textContent = `Weather : ${weather[0].description}`;
        
    }

    function showError(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }
})