function checkWord( board, word ) {

    const MAX = board ? board.length : 0;
    let used = [];

    function traverse() {
        for (let y = 0; y < board.length; y++){
            for (let x = 0; x < board[y].length; x++){
                if (board[y][x] === word[0]){
                    used.push({x: x, y: y});
                    if (checkForWord([y, x], word.slice(1)))
                        return true;
                    else
                        used = [];
                }
            }
        }
        return false;
    }

    let hasWord = false
    function checkForWord(start, word) {
        if (!word)
            hasWord = true;
        let index = {x: start[1], y: start[0]};
        used.push(index);
        let squares = adjacent(index);
        for (let i = 0; i < squares.length; i++){
            let y = squares[i][0], x = squares[i][1];
            if (checkIndex(y, x)){
                if (word[0] === board[y][x] && checkUsed(y, x)) {
                    used.push({x: x, y: y});
                    checkForWord([y, x], word.slice(1));
                }
            }
        }
        return hasWord;
    }

    function checkUsed(y, x) {
        for (let i = 0; i < used.length; i++){
            if (used[i].x === x && used[i].y === y)
                return false;
        }
        return true;
    }

    function checkIndex(y, x) {
        return x > 0 && x < MAX && y > 0 && y < MAX;
    }

    function adjacent(index) {
        return [
            [index.y - 1, index.x - 1],
            [index.y - 1, index.x    ],
            [index.y - 1, index.x + 1],
            [index.y,     index.x - 1],
            [index.y,     index.x + 1],
            [index.y + 1, index.x - 1],
            [index.y + 1, index.x    ],
            [index.y + 1, index.x + 1],
        ]
    }

    return traverse();
}


var testBoard = [
  ["E","A","R","A"],
  ["N","L","E","C"],
  ["I","A","I","S"],
  ["B","Y","O","R"]
];

Test.expect( checkWord( testBoard, "C" ) == true );
Test.expect( checkWord( testBoard, "EAR" ) == true );
Test.expect( checkWord( testBoard, "EARS" ) == false );
Test.expect( checkWord( testBoard, "BAILER" ) == true );
Test.expect( checkWord( testBoard, "RSCAREIOYBAILNEA" ) == true, "Must be able to check indefinite word lengths going in all directions" );
Test.expect( checkWord( testBoard, "CEREAL" ) == false, "Valid guesses can't overlap themselves" );
Test.expect( checkWord( testBoard, "ROBES" ) == false, "Valid guesses have to be adjacent" );
Test.expect( checkWord( testBoard, "BAKER" ) == false, "All the letters have to be in the board" );
Test.expect( checkWord( testBoard, "CARS" ) == false, "Valid guesses cannot wrap around the edges of the board" );
