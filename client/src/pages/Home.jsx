import {useEffect, useState} from "react";
import WeatherCard from "../components/WeatherCard";
import avatar from "../assets/avatar.png";
import InspirationCarousel from "../components/InspirationCarousel";
import ShoppingNotes from "../components/ShoppingNotes";

function Home() {
    //store the weather information
    const[weather,setWeather] = useState({
        city: "",
        temperature: "",
        condition: "",
    });

    //store the generated outfit
    const [outfit, setOutfit] = useState(null);

    //Fetch weather from backend
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/weather`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setWeather(data);
        })
        .catch((error) => {
            console.error("Error fetching weather:", error);
        });
    }, []);

    //generate an outfit from the backend
    async function generateOutfit() {
        console.log("Generate button clicked");
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/outfit`);
            const data = await response.json();
            console.log("OUTFIT DATA:", data);

            if (!response.ok) {
                alert(data.message);
                return;
            } 

            //save the outfit into React State
            setOutfit(data);
            
        } catch (error) {
                console.error(error);
                alert("Unable to generate outfit.");
            }
    }
    return (
        <div className="app">
            <header className="top-section">
                <div className="left-section">
                    <WeatherCard 
                    city={weather.city}
                    temperature={weather.temperature}
                    condition={weather.condition}/>

                    <button className="generate-btn" onClick={generateOutfit}>
                        Generate Outfit
                    </button>
                </div>

                <div className="middle-section">
                    <img src={avatar} alt="Avatar" className="avatar"/>
                </div>

                <div className="right-section">
                    <h1 className="welcome-text">
                        Welcome to your OOTD Generator!
                    </h1>

                </div>
            </header>

            <main className="main-content">
                <div className="left-column">
                    <InspirationCarousel/>
                </div>
                
                {/* Generated outfit display */}
                <div className="right-column">
                    <div className="outfit-section">
                        {/* Display the generated top or a placeholder */}
                        <div className="clothing-placeholder top">
                            {outfit ? (
                                <img src={outfit.top.imageUrl}
                                alt="Top" className="clothing-image"/>
                            ) : (
                                "Top Image"
                            )}
                        </div>
                        {/* Display the generated bottom or a placeholder */}
                        <div className="clothing-placeholder bottom">
                            {outfit ? (
                                <img src={outfit.bottom.imageUrl}
                                alt="Bottom" className="clothing-image"/>
                            ):(
                                "Bottom Image"
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="right-column">
                    <ShoppingNotes/>
                </div>

            </main>

        </div>
    );
}

export default Home;