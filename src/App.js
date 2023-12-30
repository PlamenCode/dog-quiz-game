import { useEffect } from "react";
import "./App.css";
import { onlyUniqueBreeds } from "./helpers/filterDogs";
import { useImmerReducer } from "use-immer";
import { stateReducer } from "./helpers/stateReducer";
import Timer from "./components/Timer";
import HeartIcon from "./components/HeartIcon";
import Pictures from "./components/Pictures";

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

    return (
        <div>
            {state.currentQuestion && (
                <>
                    <p className="text-center">
                        <Timer state={state}/>
                        { [...Array(3 - state.strikes)].map((item, index) => 
                            <HeartIcon key={index} className='inline text-pink-600 mx-1' />) 
                        }
                    </p>
                    <h1 className="text-center front-bold pt-3 pb-10 brake-all text-4xl md:text-7xl">
                        {state.currentQuestion.breed}
                    </h1>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 px-5">
                        {state.currentQuestion.photos.map((photo, index) => 
                            <Pictures key={index} index={index} photo={photo} dispatch={dispatch} />
                        )}
                    </div>
                </>
            )}
            {state.playing === false && Boolean(state.bigCollection.length) && !state.currentQuestion && (
                <p className="text-center fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                    <button
                        onClick={() => dispatch({ type: "startPlaying" })}
                        className="text-white bg-gradient-to-b from-indigo-500 to-indigo-700 px-4 py-3 rounded text-2xl font-bold"
                    >Play</button>
                </p>
            )}
        </div>
    );
}

export default App;
