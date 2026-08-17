// React hook for storing form data
import { useState, useEffect } from "react";

function Admin() {

  // Store the choosen  image in useState
  const [image, setImage] = useState(null);

  // clothing item type (top/bottom)
  const [type, setType] = useState("top");

  // temperature range
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [clothing, setClothing] = useState([]);

  //This function loads every clothing item from the backend
  function loadClothing() {

    fetch(`${import.meta.env.VITE_API_URL}/clothing`)
      //convert the server response into Javascript data
      .then((response) =>response.json())
      //store data into react state
      .then((data) => {
        setClothing(data);
      })
      .catch((error) =>{
        console.error(error);
      });

  }

  // This function sned clothing item to the backend
  async function uploadClothing() {

    if (!image) {
      alert("Need to select an image!!");
      return;
    }

    
    const formData = new FormData();//helps with sending files
    //the 4 info we need
    formData.append("image", image);
    formData.append("type", type);
    formData.append("minTemp", minTemp);
    formData.append("maxTemp", maxTemp);

    try {

      // Send the data to the backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, 
        {
        method: "POST",
        body: formData,
      });

      const data = await response.json();//convert into javascript data

      alert(data.message);
      loadClothing();//refresh wardrobe after uploading

    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }

  }

  //Delete function for clothing items in the db
  async function deleteClothing(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    //double confirmation, stop if usered clicked cancel
    if (!confirmDelete) {
      return;
    }

    try{
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/clothing/${id}`,
        {
          method:"DELETE",
        }
      );

      const data=await response.json();
      alert(data.message);

      //reload wardrobe after deletion
      loadClothing();

    } catch(error){
      console.error("Delete error:", error);
      alert("Delete failed.");
    }
  }

  //load the wardrobe
  useEffect (()=>{
    loadClothing();
  }, []);

  return (
    <div className="admin-page">
      <h1>Wardrobe Upload</h1>

      {/* image picker that open up files */}
      <label>
        Clothing Image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <br /><br />

      <label>Clothing Type</label>

      <br />

      <input
        type="radio"
        value="top"
        checked={type === "top"}
        onChange={() => setType("top")}
      />
      Top

      <br />

      <input
        type="radio"
        value="bottom"
        checked={type === "bottom"}
        onChange={() => setType("bottom")}
      />
      Bottom

      <br /><br />
      <label>Minimum Temperature (°F)</label>

      <br />

      <input
        type="number"
        value={minTemp}
        onChange={(e) => setMinTemp(e.target.value)}
      />

      <br /><br />

      <label>Maximum Temperature (°F)</label>

      <br />

      <input
        type="number"
        value={maxTemp}
        onChange={(e) => setMaxTemp(e.target.value)}
      />

      <br /><br />

      {/* Upload the clothing item */}
      <button onClick={uploadClothing}>
        Upload Clothing
      </button>

      <hr/>

      <h2>Your Wardrobe</h2>

      {/*display every clothing item*/}
      {clothing.map((item)=>(
        <div key={item.id} style={{
          border: "1px solid #ccc",
          padding: "15px",
          marginTop: "15px",
          borderRadius: "10px"}}>
          {/*display the clothing image*/}
          <img src={item.imageUrl}
          alt={item.filename}
          width="150"/>

          <p>
            <strong>Type:</strong> {item.type}
          </p>

          <p>
            <strong>Temperature:</strong> {item.min_temp}°F - {item.max_temp}°F
          </p>
          <button onClick={()=>deleteClothing(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
