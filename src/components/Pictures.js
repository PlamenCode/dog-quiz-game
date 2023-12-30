import React from 'react'
import Pic from './Pic'

export default function Pictures({ photos, dispatch }) {

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 px-5">
            {photos.map((photo, index) => 
                <Pic key={index} index={index} photo={photo} dispatch={dispatch} />
            )}
        </div>
    )
}
