import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {

  return (
    <Routes>
      {/*Home page*/}
      <Route path="/"element={<Home/>}/>

      {/*Hidden admin page*/}
      <Route path="/admin" element={<Admin />}/>
    </Routes>
  );
}

export default App;


