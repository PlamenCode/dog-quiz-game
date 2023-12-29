import { generateQuestion } from "./generateQuestion";

export function stateReducer(draft, action){
    switch(action.type){
        case 'addToCollection': {
            draft.bigCollection = draft.bigCollection.concat(action.value);
            return
        }
        case 'startPlaying': {
            draft.timeRemaining = 30;
            draft.points = 0;
            draft.strikes = 0;
            draft.playing = true;
            draft.currentQuestion = generateQuestion(draft);
            return
        }
        case 'guessAttempt': {
            if(action.value === draft.currentQuestion.answer){
                draft.points++;
                draft.currentQuestion = generateQuestion(draft);
            } else {
                draft.strikes++;
                
            }
            return
        }
    }
};