import {WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm,} from "react-icons/wi";

function WeatherCard({city, temperature, condition}){
    //choose icon based on the weather condition
    function getWeatherIcon(){
        const text = condition.toLowerCase();

        if (text.includes("sun") || text.includes("clear")){
            return <WiDaySunny className="weather-icon" />;
        }
        if (text.includes("cloud")){
            return <WiCloud className="weather-icon"/>;
        }
        if(text.includes("rain")){
            return <WiRain className="weather-icon"/>;
        }
        if (text.includes("thunder")){
            return <WiThunderstorm className="weather-icon"/>;
        }

        //Default icon
        return <WiCloud className="weather-icon"/>;
    }

    return(
        <div className = "weather-card">
            {getWeatherIcon()}

            <h3>{city}</h3>
            <h2>{temperature}°F</h2>
            <p>{condition}</p>
        </div>
    );
}

export default WeatherCard;