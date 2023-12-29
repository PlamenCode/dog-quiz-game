import { useEffect } from 'react';
import './App.css';
import { onlyUniqueBreeds } from './helpers/filterDogs';
import { useImmerReducer } from 'use-immer';

const initialState = {
    points: 0,
    strikes: 0,
    timeRemaining: 0,
    highScore: 0,
    bigCollection: [],
    currentQuestion: null,
    playing: false,

}

function App() {
    const [state, dispatch] = useImmerReducer(reducer, initialState);

    useEffect(() => {
        const reqController = new AbortController()
        async function getDogs(){
            try {
                const picsPromise = await fetch('https://dog.ceo/api/breeds/image/random/50', { signal: reqController.signal });
                const pics = await picsPromise.json();
                const uniquePics = onlyUniqueBreeds(pics.message);
                console.log(uniquePics);
            } catch (err) { console.log('Request was cancelled.') }
        };
        getDogs();
        return () => { reqController.abort() }
    }, [])

  return (
    <div>
        <h1 className="text-3xl text-indigo-400 font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
