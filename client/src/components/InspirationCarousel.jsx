import {useState} from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

//inspiration images
import outfit1 from "../assets/inspiration/inspo1.jpeg";
import outfit2 from "../assets/inspiration/inspo2.jpeg";
import outfit3 from "../assets/inspiration/inspo3.jpeg";
import outfit4 from "../assets/inspiration/inspo4.jpeg";

//store inspiration image
const images = [outfit1, outfit2, outfit3, outfit4];

function InspirationCarousel(){
    const [current, setCurrent] = useState(0);

    function previousImage(){
        setCurrent((current -1 + images.length)% images.length);
    }

    function nextImage(){
        setCurrent((current + 1) % images.length);
    }

    return(
        <div className="inspiration-container">
            <h2>Style Inspiration</h2>
            <div className="carousel-wrapper">
                <button className="arrow-btn left-arrow" onClick={previousImage}>
                    <FaChevronLeft/>
                </button>
                <div className="image-stack">
                    <img src={images[(current - 1 + images.length) % images.length]} alt="Previous Inspiration" className="side-image left-image"/>
                    <img src={images[current]} alt="CurrentInspiration" className="front-image"/>
                    <img src={images[(current + 1) % images.length]} alt="Next Inspiration" className="side-image right-image"/>
                </div>
                
                <button className="arrow-btn right-arrow" onClick={nextImage}>
                    <FaChevronRight/>
                </button>
            </div>
        </div>
    );
}

export default InspirationCarousel;