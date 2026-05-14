import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const A1111_URL = "http://127.0.0.1:7860";

app.post("/api/generate", async (req, res) => {
  try {
    const { positive, negative } = req.body;

    // 🔥 IMPORTANT: use correct LoRA syntax
    const payload = {
      prompt: `<lora:bird_lora_200_species_6k:1>, ${positive}`,
      negative_prompt: negative,
      steps: 20,
      width: 512,
      height: 512,
      cfg_scale: 7,
      sampler_name: "DPM++ 2M Karras",
      seed: -1,
    };

    // ✅ debug logs
    console.log("-------- REQUEST --------");
    console.log("POSITIVE:", payload.prompt);
    console.log("NEGATIVE:", payload.negative_prompt);
    console.log("-------------------------");

    const response = await axios.post(
      `${A1111_URL}/sdapi/v1/txt2img`,
      payload
    );

    res.json({
      image: `data:image/png;base64,${response.data.images[0]}`,
    });
  } catch (err) {
    console.error("ERROR:", err?.response?.data || err.message);
    res.status(500).json({ message: "Image generation failed" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});