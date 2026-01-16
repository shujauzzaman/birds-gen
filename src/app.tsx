
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GenerateBird from "./pages/GenerateBird";

function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/generate-bird" element={<GenerateBird />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;