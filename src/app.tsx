import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GenerateBird from "./pages/GenerateBird";
import PromptReview from "./pages/PromptReview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<GenerateBird />} />
        <Route path="/prompt" element={<PromptReview />} />
      </Routes>
    </BrowserRouter>
  );
}
