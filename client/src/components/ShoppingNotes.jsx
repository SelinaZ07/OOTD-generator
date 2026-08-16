import {useState, useEffect} from "react";

function ShoppingNotes(){

    //store the user's shopping notes
    const [notes,setNotes] = useState("");

    //load previously saved notes 
    useEffect(()=>{
        const saveNotes = localStorage.getItem("shoppingNotes");

        //restore the saved notes if they exist
        if (saveNotes){
            setNotes(saveNotes);
        }
    }, []);

    return(
        <div className="notes-paper">
            <h2>📝 Wardrobe Wishlist</h2>

            <textarea placeholder="Things I want to buy:"
            value={notes} onChange={(e)=>setNotes(e.target.value)}/>

            <button className="save-notes-btn" onClick={saveNotes}>
                Save Notes
            </button>
        </div>
    );

    //save the current notes to the browser's local storage
    function saveNotes(){
        localStorage.setItem("shoppingNotes", notes);

        alert("Notes saved");
    }
}

export default ShoppingNotes;