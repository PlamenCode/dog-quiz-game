import React from 'react'
import PlayButton from './PlayButton'

export default function ResultOverlay({ state, dispatch }) {
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/90 text-white flex justify-center items-center text-center'>
        <div>
        { state.timeRemaining <= 0 && <p className='text-6xl mb-4 forn-bold'>Time's Up.</p> }
        { state.strikes >= 3 && <p className='text-6xl mb-4 forn-bold'>3 Strikes. You're out!</p> }

        <p>Your Score:{' '}
            <span className='text-amber-400'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="inline-block relative bottom-1 mx-1" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            {state.points}
            </span>    
        </p>

        <p className='mb-5'>Your All-Time High Score: {state.highScore}</p>
        <PlayButton 
            dispatch={dispatch} 
            text={'Play Again'}
            style={'text-center flex justify-center items-center'}
        />
        </div>
    </div>
  )
}
