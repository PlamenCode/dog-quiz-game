import React from 'react'

export default function PlayButton({ dispatch, text, style }) {
    return (
        <p className={style}>
            <button
                onClick={() => dispatch({ type: "startPlaying" })}
                className="text-white bg-gradient-to-b from-indigo-500 to-indigo-700 px-4 py-3 rounded text-2xl font-bold"
            >{text}</button>
        </p>
    )
}
