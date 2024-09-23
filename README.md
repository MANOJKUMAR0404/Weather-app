# Weather App

This is a simple Weather App that allows users to check current weather conditions and a 24-hour forecast for any city. It leverages the WeatherAPI to fetch and display weather data based on user input or current location.

## Features

- Search for weather by city name.
- Automatically retrieves weather data for the user's current location.
- Displays current temperature and weather description.
- Shows a 24-hour hourly forecast with temperature and corresponding weather icons.
- User-friendly interface with material design icons.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- WeatherAPI for fetching weather data
- Material Icons for UI components

## File Structure

```
/weather-app
├── index.html          # Main HTML file
├── style.css           # Stylesheet for the app
├── script.js           # JavaScript for functionality
├── /icons              # Directory for weather icons
└── README.md           # Project documentation
```

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```
3. Open `index.html` in your preferred web browser.

## Usage

- Enter a city name in the search bar and press Enter to get the current weather and forecast.
- Click the location button to get weather data based on your current geographical location.

## JavaScript Overview

### Key Functions

- **getWeatherdata(API_URL)**: Fetches weather data from the API using the provided URL. Updates the UI with current temperature, description, and hourly forecast.
  
- **displayHourlyForecast(HourlyData)**: Displays the hourly forecast for the next 24 hours using the weather data.

- **setWeatherDataRequest(cityName)**: Constructs the API URL using the city name and fetches the weather data.

### Event Listeners

- **searchName (keyup)**: Listens for the Enter key press to trigger the weather data request for the entered city.

- **currLocation (click)**: Listens for clicks on the location button to fetch weather data based on the user's current location.

## API Key

This app requires an API key from WeatherAPI. You can obtain your free API key by signing up at [WeatherAPI](https://www.weatherapi.com/). Replace the `API_KEY` variable in the `script.js` file with your actual API key.

```javascript
const API_KEY = "your_api_key_here";
```

## Acknowledgments

- [WeatherAPI](https://www.weatherapi.com/) for providing the weather data.
- [Google Fonts](https://fonts.google.com/) for the Material Icons used in the design.
