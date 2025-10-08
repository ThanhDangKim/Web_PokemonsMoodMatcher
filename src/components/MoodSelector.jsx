import React from 'react'

const moods = [
    { id: 'happy', label: 'Happy', emoji: '😄' },
    { id: 'sad', label: 'Sad', emoji: '😢' },
    { id: 'angry', label: 'Angry', emoji: '😡' },
    { id: 'calm', label: 'Calm', emoji: '😌' }
]

export default function MoodSelector({ onSelect, loading }) {
    return (
        <div className="flex flex-col items-center">
            <p className="mb-2">How are you feeling today?</p>
            <div className="flex gap-3">
                {moods.map(m => (
                    <button
                        key={m.id}
                        className="px-4 py-2 rounded-lg shadow-sm bg-gray-100 hover:scale-105 transition"
                        onClick={() => !loading && onSelect(m.id)}
                        disabled={loading}
                    >
                        <span className="text-lg">{m.emoji}</span>
                        <div className="text-xs">{m.label}</div>
                    </button>
                ))}
            </div>
        </div>
    )
}