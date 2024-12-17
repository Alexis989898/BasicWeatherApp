const dataDiv = document.getElementById("data-div");
const search = document.getElementById("input-search");

async function getWeather(location) {
    try {
        
        const API = await "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
            location + "?key=UTAKRE8PYSWAGMBMUZDLFJVQ8" + "&unitGroup=metric"

        const requestData = await fetch(API, { mode: 'cors' });
        const weatherData = await requestData.json();
        
        // Test line:
        // const weatherData = await fetch('weather.json', { mode: 'cors' }).then((response) => response.json());
        displayWeather(weatherData);
    } catch (error) {
        console.error(error);

    }
}

async function displayWeather(weatherData) {
    console.log(weatherData);

    const city = document.createElement("div");
    city.innerText = weatherData.resolvedAddress;
    city.className = "data-city";

    /* Creating Today Div */ {
        const today = document.createElement("div");
        today.className = "data-day";
        today.innerText = "Today";

        const day = document.createElement("div");
        day.className = "data-day-wrapper data-today";
        day.appendChild(today);

        const iconPath = "./WeatherIcons-VisualCrossing-v4/" + weatherData.currentConditions.icon + ".svg";
        const icon = await fetch(iconPath).then(response => response.text()).catch(error => console.error('Error loading SVG:', error));

        const iconWrapper = document.createElement("div");
        iconWrapper.className = "data-icon-wrapper";
        iconWrapper.innerHTML = icon;
        day.appendChild(iconWrapper);

        const avgTemp = document.createElement("div");
        avgTemp.className = "data-temp";
        avgTemp.innerText = `Avg: ${weatherData.currentConditions.temp}°C`;

        const minTemp = document.createElement("div");
        minTemp.className = "data-min-temp";
        minTemp.innerText = `Min: ${weatherData.days[0].tempmin}°C`;
        const maxTemp = document.createElement("div");
        maxTemp.className = "data-max-temp";
        maxTemp.innerText = `Max: ${weatherData.days[0].tempmax}°C`;

        const tempWrapper = document.createElement("div");
        tempWrapper.className = "data-temp-wrapper";
        tempWrapper.appendChild(maxTemp);
        tempWrapper.appendChild(avgTemp);
        tempWrapper.appendChild(minTemp);
        day.appendChild(tempWrapper);

        const condition = document.createElement("div");
        condition.className = "data-condition";
        condition.innerText = "Condition: " + weatherData.currentConditions.conditions;
        day.appendChild(condition);

        const humidity = document.createElement("div");
        humidity.className = "data-humidity";
        humidity.innerText = "Humidity: " + weatherData.currentConditions.humidity + "%";
        day.appendChild(humidity);

        dataDiv.appendChild(city);
        dataDiv.appendChild(day);
    }

    /* Creating Tomorrow Div */ {
        const tomorrowData = weatherData.days[1]; // Access the second day in the list

        const tomorrow = document.createElement("div");
        tomorrow.className = "data-day";
        tomorrow.innerText = "Tomorrow";

        const day = document.createElement("div");
        day.className = "data-day-wrapper data-tomorrow";
        day.appendChild(tomorrow);

        const iconPath = "./WeatherIcons-VisualCrossing-v4/" + tomorrowData.icon + ".svg";
        const icon = await fetch(iconPath).then(response => response.text()).catch(error => console.error('Error loading SVG:', error));

        const iconWrapper = document.createElement("div");
        iconWrapper.className = "data-icon-wrapper";
        iconWrapper.innerHTML = icon;
        day.appendChild(iconWrapper);

        const avgTemp = document.createElement("div");
        avgTemp.className = "data-temp";
        avgTemp.innerText = `Avg: ${tomorrowData.temp}°C`;

        const minTemp = document.createElement("div");
        minTemp.className = "data-min-temp";
        minTemp.innerText = `Min: ${tomorrowData.tempmin}°C`;
        const maxTemp = document.createElement("div");
        maxTemp.className = "data-max-temp";
        maxTemp.innerText = `Max: ${tomorrowData.tempmax}°C`;

        const tempWrapper = document.createElement("div");
        tempWrapper.className = "data-temp-wrapper";
        tempWrapper.appendChild(maxTemp);
        tempWrapper.appendChild(avgTemp);
        tempWrapper.appendChild(minTemp);
        day.appendChild(tempWrapper);

        const condition = document.createElement("div");
        condition.className = "data-condition";
        condition.innerText = "Condition: " + tomorrowData.conditions;
        day.appendChild(condition);

        const humidity = document.createElement("div");
        humidity.className = "data-humidity";
        humidity.innerText = "Humidity: " + tomorrowData.humidity + "%";
        day.appendChild(humidity);

        dataDiv.appendChild(day);
    }

}



getWeather("Santa Barbara d'Oeste");