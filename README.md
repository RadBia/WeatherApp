# Weather App
This is a React app designed to help your grandfather check the weather conditions for his city before going fishing. By using real-time data from an API, he can easily determine if the weather is suitable for fishing or not.

## Getting Started
To run the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run the following command to install the required dependencies:
npm install or yarn install
4. Once the installation is complete, start the development server with the following command:
npm start or yarn start
5. Open your browser and visit http://localhost:3000 to view the Weather App.

## Installation of Dependencies
Before running the app, make sure to install the following packages:

- lodash: Install the lodash package by running the following command:
npm install lodash or yarn add lodash
- axios: Install the axios package by running the following command:
npm install axios or yarn add axios

## Search Component
The Search component allows users to search for cities and retrieve weather information. It utilizes a real API for handling the search action and incorporates debouncing for a smoother user experience. The search results can be displayed as a dropdown or a list, depending on your preference.

## Weather component:
The Weather component displays important weather information for a specific city. It includes the city name, weather conditions, temperature in Celsius, and additional details such as feels like, wind, humidity, and pressure.

## Future Forecast component:
The FutureForecast component displays the forecast for the next seven days. Each day is shown in a separate row and includes an icon representing the daily weather summary, the day's name, maximum and minimum temperature, and a description of the weather. Clicking on a day will reveal additional information about pressure, clouds, sea level, humidity, wind speed, and feels like temperature.
