"use strict";
const enterKey = document.getElementById('location');
enterKey.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        getWeather();
    }
});
function celusistofar(c){
    let f=(c*(9/5))+32;
    return f.toFixed(2);

}
async function getWeather() {
    let userLocation = document.getElementById('location').value;
    const apiKey = '5e64fb5b1f7242e155fcae707578e1a6';
    const srcLink = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(userLocation)}&appid=${apiKey}&units=imperial`;
    try {
        const response = await fetch(srcLink);
        const locationInfo = await response.json();
        let f=celusistofar(locationInfo.main.temp);
        if (response.ok) {
            document.getElementById('resultContainer').innerHTML = `
            <p><strong>${locationInfo.name}</strong></p>
            <p>Current condition: ${locationInfo.weather[0].description}</p>
            <p>Temperature: ${locationInfo.main.temp}  °C </p>
            <p>Temperature: ${f}  °F </p>
            `
        } else {
            document.getElementById('resultContainer').innerHTML = `<p>Error: ${locationInfo.message}</p>`;
        }
    } catch (error) {
        document.getElementById('resultContainer').innerHTML = `<p>Error: ${error}</p>`
    }
}