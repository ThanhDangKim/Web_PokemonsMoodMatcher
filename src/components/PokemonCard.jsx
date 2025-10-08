import React, { useState } from 'react'

export default function PokemonCard({ pokemon, mood }) {
  const [flipped, setFlipped] = useState(false)

  const image =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default
  const name = pokemon.name
  const types = pokemon.types.map(t => t.type.name).join(', ')

  // 🔹 Lấy 3 chỉ số chính
  const stats = {}
  pokemon.stats?.forEach(s => {
    const statName = s.stat.name
    if (['hp', 'attack', 'defense'].includes(statName)) {
      stats[statName] = s.base_stat
    }
  })

  return (
    <div
      className={`card-3d mx-auto mt-4 ${flipped ? 'flipped' : ''}`}
      style={{ width: 260 }}
    >
      <div className="card-inner" onClick={() => setFlipped(!flipped)}>
        {/* 🔹 Mặt trước */}
        <div className="card-front p-4 flex flex-col items-center justify-center border-2 border-gray-300 rounded-2xl shadow-md bg-white text-center">
          <div className="text-3xl mb-2">{mood && moodToEmoji(mood)}</div>
          <h3 className="text-lg font-semibold">
            {mood ? capitalize(mood) : ''}
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Tap to see suitable Pokémon
          </p>
        </div>

        {/* 🔹 Mặt sau */}
        <div className="card-back p-4 flex flex-col items-center justify-center border-2 border-gray-300 rounded-2xl shadow-md bg-white text-center">
          <img
            src={image}
            alt={name}
            className="w-36 h-36 object-contain mb-2"
          />
          <h3 className="font-bold text-xl">{capitalize(name)}</h3>
          <p className="text-sm mt-1">Hệ: {types}</p>
          <div className="mt-3 text-sm text-gray-700 space-y-1">
            <p>❤️ HP: {stats.hp ?? '?'}</p>
            <p>⚔️ Attack: {stats.attack ?? '?'}</p>
            <p>🛡️ Defense: {stats.defense ?? '?'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 🧩 Hàm phụ trợ
function moodToEmoji(m) {
  return {
    happy: '😄',
    sad: '😢',
    angry: '😡',
    calm: '😌',
  }[m] || '✨'
}

function capitalize(s) {
  return typeof s === 'string' ? s.charAt(0).toUpperCase() + s.slice(1) : s
}
