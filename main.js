document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '270552f26828ff5b5411197828fdc305';
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');
    const errorMessage = document.getElementById('errorMessage');
    const weatherIcon = 
    
    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city === '') {
            errorMessage.textContent = 'Iltimos shaharingiz nomini kiriting.';
            errorMessage.classList.remove('hidden');
            weatherResult.classList.add('hidden');
            return;
        }
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '404') {
                    errorMessage.textContent = 'City not found.';
                    errorMessage.classList.remove('hidden');
                    weatherResult.classList.add('hidden');
                } else {
                    errorMessage.classList.add('hidden');
                    weatherResult.classList.remove('hidden');
                    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
                    document.getElementById('temperature').textContent = `Temperatura: ${data.main.temp}°C`;
                    document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
                    document.getElementById('humidity').textContent = `Namlik: ${data.main.humidity}%`;
                    document.getElementById('windSpeed').textContent = `Shamol esishi: ${data.wind.speed} m/s`;
                }
            })
            .catch(error => {
                errorMessage.textContent = 'An error occurred. Please try again.';
                errorMessage.classList.remove('hidden');
                weatherResult.classList.add('hidden');
            });
    });
});
