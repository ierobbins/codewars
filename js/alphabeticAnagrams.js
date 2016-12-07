function listPosition(word) {
    const letters = word.split('').sort();
    const SIZE = letters.length;
    let index = 0;
    let wordObj = {};
    for(let i = 0; i < SIZE; i++) {
        if(!wordObj.hasOwnProperty(letters[i])) {
            wordObj[letters[i]] = 1;
        } else {
            wordObj[letters[i]]++;
        }
    }
    for(let i = 0; i < SIZE; i++) {
        for(let key in wordObj) {
            if(word[i] > key && wordObj[key] > 0) {
                let start = word.substring(0, i) + key;
                index += perm(start);
            }
        }
        wordObj[word[i]]--;
        if(i === SIZE - 1) {
            index += 1;
        }
    }

    function perm(start) {
        const START_LENGTH = start.length
        let divider = 1;
        for(let key in wordObj) {
            if(key === start[START_LENGTH - 1]) {
                divider *= fact(wordObj[key] - 1);
            } else {
                divider *= fact(wordObj[key]);
            }
        }
        return ( fact(SIZE - START_LENGTH) / divider );
    }

    function fact(num) {
        if(num <= 1) { return 1; }
        return num *= fact(--num);
    }
    return index;
}
