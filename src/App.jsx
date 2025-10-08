import React, { useState } from "react";
import MoodSelector from "./components/MoodSelector";
import PokemonCard from "./components/PokemonCard";
import { fetchPokemonData } from "./services/pokeapi";
import { getPokemonNameFromMood, getReasonForMatch } from "./services/gemini";
import bgPlaceholder from "./assets/bg/placeholder.png";

const moodConfig = {
  happy: { emoji: "😄", bg: "bg-happy" },
  sad: { emoji: "😢", bg: "bg-sad" },
  angry: { emoji: "😡", bg: "bg-angry" },
  calm: { emoji: "😌", bg: "bg-calm" },
};

export default function App() {
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(1); // 1: chọn mood, 2: nhập mô tả, 3: hiển thị kết quả
  const [userDescription, setUserDescription] = useState("");

  // === Bước 1: chọn cảm xúc ===
  function handleMoodSelect(selectedMood) {
    setMood(selectedMood);
    setStep(2);
  }

  // === Bước 2: xử lý khi bấm "Tìm Pokémon" ===
  async function handleFindPokemon() {
    if (!mood) return;
    setLoading(true);
    setPokemon(null);
    setReason("");

    try {
      // 1️⃣ Gọi Gemini để lấy tên Pokémon phù hợp
      const pokemonName = await getPokemonNameFromMood(mood, userDescription);
      console.log("🔮 Gemini suggested Pokémon:", pokemonName);

      // 2️⃣ Gọi PokéAPI để lấy thông tin chi tiết
      const details = await fetchPokemonData(pokemonName);
      console.log("PO:", details)

      // 3️⃣ Gọi Gemini để tạo lý do phù hợp
      const matchReason = await getReasonForMatch(details, mood, userDescription);

      // 4️⃣ Cập nhật UI
      setPokemon(details);
      setReason(matchReason);

      // 5️⃣ Thay đổi màu nền theo mood
      document.body.className = moodConfig[mood]?.bg || "";

      setStep(3);
    } catch (err) {
      console.error("❌ Error when searching for Pokémon:", err);
      alert("An error occurred while searching for Pokémon: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // === Điều hướng quay lại ===
  function handleBack() {
    if (step === 2) {
      setStep(1);
      setUserDescription("");
    } else if (step === 3) {
      setStep(2);
      setPokemon(null);
      setReason("");
    }
    document.body.className = "";
  }

  // === JSX giao diện ===
  return (
    <div
      className="app-root min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPlaceholder})` }} // 🌟 Thêm dòng này
    >
      <div className="card max-w-md w-full p-6 rounded-2xl shadow-lg bg-white/90 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-center mb-3">Pokémon Mood Matcher</h1>

        {/* === Bước 1 === */}
        {step === 1 && <MoodSelector onSelect={handleMoodSelect} loading={loading} />}

        {/* === Bước 2 === */}
        {step === 2 && (
          <div className="flex flex-col items-center">
            <p className="text-center text-gray-700 mb-4">
              You are feeling <b>{mood}</b> {moodConfig[mood]?.emoji}.  
              Please describe your feelings or wishes in a bit more detail:
            </p>

            <textarea
              value={userDescription}
              onChange={(e) => setUserDescription(e.target.value)}
              placeholder="(Optional) Write your thoughts here..."
              rows={3}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <button
              onClick={handleFindPokemon}
              disabled={loading}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Searching for Pokémon..." : "Find the right Pokémon"}
            </button>

            <button
              onClick={handleBack}
              className="mt-3 text-sm text-gray-500 hover:underline"
            >
              ← Go back to choose emotion
            </button>
          </div>
        )}

        {/* === Bước 3 === */}
        {step === 3 && pokemon && (
          <div className="flex flex-col items-center">
            <PokemonCard pokemon={pokemon} mood={mood} />
            <p className="mt-4 text-center text-gray-700 whitespace-pre-line">
              {reason || "This Pokémon was chosen because it matches your emotions!"}
            </p>
            <button
              onClick={handleBack}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
            >
              ← Return
            </button>
          </div>
        )}

        <p className="mt-4 text-xs text-gray-500 text-center">
          Powered by PokéAPI + Gemini
        </p>
      </div>
    </div>
  );
}