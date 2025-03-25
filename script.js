// Main JS (Weather request and display) //
{
    const dataDiv = document.getElementById("data-div");
    const search = document.getElementById("input-search");
    const searchBtn = document.getElementById("search-icon");

    search.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const searchText = search.value;
            getWeather(searchText);
        }
    });

    searchBtn.addEventListener("click", () => {
        const searchText = search.value;
        getWeather(searchText);
    })

    async function getWeather(location) {
        try {
            const API = await "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
                location + "?key=UTAKRE8PYSWAGMBMUZDLFJVQ8" + "&unitGroup=metric"

            const requestData = await fetch(API, { mode: 'cors' });
            const weatherData = await requestData.json();

            // Test line:
            // const weatherData = await fetch('weather.json', { mode: 'cors' }).then((response) => response.json());
            dataDiv.innerHTML = "";
            displayWeather(weatherData);
        } catch (error) {
            console.error(error);
            dataDiv.style.visibility = "visible";
            dataDiv.innerText = "Error! Alter your search";
        }
    }

    async function displayWeather(weatherData) {
        console.log(weatherData);

        dataDiv.style.visibility = "visible";

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

            const svg = iconWrapper.querySelector('svg'); // Select the <svg> inside the wrapper
            if (svg) {
                svg.setAttribute('width', '100%');  // Set desired width
                svg.setAttribute('height', '100%'); // Set desired height
            }

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

            const svg = iconWrapper.querySelector('svg'); // Select the <svg> inside the wrapper
            if (svg) {
                svg.setAttribute('width', '100%');  // Set desired width
                svg.setAttribute('height', '100%'); // Set desired height
            }

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
}

// Dark mode //
{
    const root = document.documentElement;
    const darkSwitchBtn = document.querySelector(".darkmode-btn");
    const darkIcon = document.querySelector("#dark-icon");
    const lightIcon = document.querySelector("#light-icon");
    let currentMode = "dark";

    lightIcon.style.display = "none";

    const themes = {
        dark: {
            "--bg-color": "#171614",
            "--text-color": "#E8F0FF",
            "--accent-color": "#38f",

        },
        light: {
            "--bg-color": "#FFFFFF",
            "--text-color": "#171614",
            "--accent-color": "#38f",
        }
    };

    darkSwitchBtn.addEventListener("click", () => {
        currentMode = currentMode === "dark" ? "light" : "dark";

        darkIcon.style.display = currentMode === "dark" ? "block" : "none";
        lightIcon.style.display = currentMode === "dark" ? "none" : "block";

        Object.entries(themes[currentMode]).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    });
}

// Translation //
{
    const translations = {
        en: {
            searchPlaceholder: "Search a location here",
            today: "Today",
            tomorrow: "Tomorrow",
            condition: "Condition",
            humidity: "Humidity",
            avg: "Avg"
        },
        pt: {
            searchPlaceholder: "Pesquise um local aqui",
            today: "Hoje",
            tomorrow: "Amanhã",
            condition: "Condição",
            humidity: "Umidade",
            avg: "Média"
        }
    };

    const langBtn = document.getElementById("language-btn");
    let currentLang = "en";

    langBtn.addEventListener("click", () => {
        currentLang = currentLang === "en" ? "pt" : "en";
        langBtn.innerText = currentLang.toUpperCase();
        updateLanguage();
    });

    function updateLanguage() {
        document.getElementById("input-search").placeholder = translations[currentLang].searchPlaceholder;

        const todayElem = document.querySelector(".data-today .data-day");
        if (todayElem) todayElem.innerText = translations[currentLang].today;

        const tomorrowElem = document.querySelector(".data-tomorrow .data-day");
        if (tomorrowElem) tomorrowElem.innerText = translations[currentLang].tomorrow;

        const conditionElems = document.querySelectorAll(".data-condition");
        conditionElems.forEach(elem => elem.innerText = translations[currentLang].condition + ": " + elem.innerText.split(": ")[1]);

        const humidityElems = document.querySelectorAll(".data-humidity");
        humidityElems.forEach(elem => elem.innerText = translations[currentLang].humidity + ": " + elem.innerText.split(": ")[1]);

        const avgElems = document.querySelectorAll(".data-temp");
        avgElems.forEach(elem => elem.innerText = translations[currentLang].avg + ": " + elem.innerText.split(": ")[1]);
    }
}
