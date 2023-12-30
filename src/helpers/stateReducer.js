import { generateQuestion } from "./generateQuestion";

export function stateReducer(draft, action){
    if(draft.points > draft.highScore) draft.highScore = draft.points

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
            if(!draft.playing) return;
            
            if(action.value === draft.currentQuestion.answer){
                draft.points++;
                draft.currentQuestion = generateQuestion(draft);
            } else {
                draft.strikes++;
                if(draft.strikes >= 3){
                    draft.playing = false;
                }
            }
            return
        }
        case 'decreaseTime': {
            if(draft.timeRemaining <= 0){
                draft.playing = false;
            } else{
                draft.timeRemaining--; 
            }
            return
        }
        case 'recieveHighScore': {
            draft.highScore = action.value;
            if(!action.value) draft.highScore = 0; 
            return
        }
    }
};