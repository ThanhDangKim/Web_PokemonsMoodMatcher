import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

/**
 * Kiểm tra Pokémon có tồn tại trên PokeAPI hay không
 * @param {string} name - tên Pokémon
 * @returns {Promise<boolean>}
 */
async function checkPokemonExists(name) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    return res.ok; // true nếu 200, false nếu 404
  } catch (err) {
    console.error("⚠️ Error when checking Pokémon:", err);
    return false;
  }
}

// Hàm lấy Pokémon theo mood
export async function getPokemonNameFromMood(mood, description = "") {
  const prompt = `
You are a friendly Pokémon expert.
The user feels "${mood}".
${description ? `They said: "${description}".` : ""}
Please suggest ONE Pokémon name that matches this mood and feeling.

Return ONLY the Pokémon name, nothing else.
Example: pikachu
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // ✅ model mới
    const result = await model.generateContent(prompt);

    const text = result.response?.text()?.trim()?.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!text) {
      console.warn("⚠️ Gemini did not return a valid Pokémon name. Using the default.");
      return "pikachu";
    }

    // 🔍 Kiểm tra xem Pokémon có thật không
    const exists = await checkPokemonExists(text);
    if (!exists) {
      console.warn(`⚠️ Pokémon "${text}" does not exist in the API. Using the default.`);
      return "pikachu";
    }

    return text;
    
  } catch (err) {
    console.error("❌ Error when calling Gemini:", err);
    return "pikachu";
  }
}

// Hàm giải thích vì sao Pokémon hợp mood
export async function getReasonForMatch(pokemonInfo, mood, description = "") {
  const prompt = `
You are an empathetic AI that explains why a Pokémon matches someone's feelings.

User mood: "${mood}"
User description: "${description}"
Pokémon info: ${JSON.stringify(pokemonInfo, null, 2)}

Write a short, kind, one-paragraph explanation (2–3 sentences) about why this Pokémon fits their feelings.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    const text = result.response.text().trim();
    return text || "This Pokémon reflects your feelings beautifully!";
  } catch (err) {
    console.error("❌ Error when calling Gemini to explain:", err);
    return "This Pokémon reflects your mood perfectly.";
  }
}
