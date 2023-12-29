export function generateQuestion(draft){
    if(draft.currentQuestion){
        draft.bigCollection = draft.bigCollection.slice(4, draft.bigCollection.length)
    }
    const tempRandom = Math.floor(Math.random() * 4);
    const justFour = draft.bigCollection.slice(0, 4);
    const correctBreed = justFour[tempRandom].split('/')[4];
    return { breed: correctBreed, photos: justFour, answer: tempRandom }
};