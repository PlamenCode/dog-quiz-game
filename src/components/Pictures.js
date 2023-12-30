import React from 'react'

export default function Pictures({ index, photo, dispatch }) {

    return (
        <div
            onClick={() =>dispatch({ type: "guessAttempt", value: index })}
            className="rounded-lg h-40 lg:h-80 bg-cover bg-center"
            style={{ backgroundImage: `url(${photo})` }}
        ></div>
    )
}
