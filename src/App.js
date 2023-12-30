import { useEffect, useRef } from "react";
import { useImmerReducer } from "use-immer";
import "./App.css";

import { onlyUniqueBreeds } from "./helpers/filterDogs";

import { stateReducer } from "./helpers/stateReducer";
import Timer from "./components/Timer";
import HeartIcon from "./components/HeartIcon";
import Pictures from "./components/Pictures";
import BrokenHearthIcon from "./components/BrokenHearthIcon";
import Question from "./components/Question";
import PlayButton from "./components/PlayButton";
import ResultOverlay from "./components/ResultOverlay";

const initialState = {
    points: 0,
    strikes: 0,
    timeRemaining: 0,
    highScore: 0,
    bigCollection: [],
    currentQuestion: null,
    playing: false,
    fetchCount: 0,
};

function App() {
    const [state, dispatch] = useImmerReducer(stateReducer, initialState);
    const timer = useRef(null);

    useEffect(() => {
        if(state.playing){
            timer.current = setInterval(() => {
                dispatch({ type: 'decreaseTime' })
            }, 1000);

            return () => {
                clearInterval(timer.current)
            } 
        }
    }, [state.playing]);

    useEffect(() => {
        const reqController = new AbortController();
        async function getDogs() {
            try {
                const picsPromise = await fetch(
                    "https://dog.ceo/api/breeds/image/random/50",
                    { signal: reqController.signal }
                );
                const pics = await picsPromise.json();
                const uniquePics = onlyUniqueBreeds(pics.message);
                dispatch({ type: "addToCollection", value: uniquePics });
            } catch (err) {
                console.log("Request was cancelled.");
            }
        }
        getDogs();
        return () => {
            reqController.abort();
        };
    }, [state.fetchCount]);

    useEffect(() => {
        if(state.bigCollection.length){
            state.bigCollection.slice(0, 9).forEach(pic => {
                new Image().src = pic
            })
        }
    }, [state.bigCollection]);

    useEffect(() => {
        dispatch({ type: 'recieveHighScore', value: localStorage.getItem('highScore') })
    }, []);

    useEffect(() => {
        if(state.highScore > 0){
            localStorage.setItem('highScore', state.highScore)
        }
    }, [state.highScore]);

    return (
        <div>
            {state.currentQuestion && (
                <>
                    <p className="text-center">
                        <Timer state={state}/>
                        { [...Array(3 - state.strikes)].map((item, index) => 
                            <HeartIcon key={index} className='inline text-pink-600 mx-1' />) 
                        }
                        { [...Array(state.strikes)].map((item, index) => 
                            <BrokenHearthIcon key={index} className='inline text-pink-200 mx-1' />) 
                        }
                    </p>
                    <Question breed={state.currentQuestion.breed}/>
                    <Pictures photos={state.currentQuestion.photos} dispatch={dispatch}/>
                </>
            )}

            {state.playing === false && Boolean(state.bigCollection.length) && !state.currentQuestion && (
                <PlayButton 
                    dispatch={dispatch} 
                    text={'Play'} 
                    style={'text-center fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center'} 
                />
            )}

            {(state.timeRemaining <= 0 || state.strikes >= 3) && state.currentQuestion && (
                <ResultOverlay state={state} dispatch={dispatch} />
            )}

        </div>
    );
}

export default App;
