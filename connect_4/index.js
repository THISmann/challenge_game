const tab = [];
let = players = ["player1", "player2"];

for (let i = 0; i < 7; i++) {
    tab[i] = [];
    for(let j=0; j<5; j++){
        //tab[i][j] = `[${i} , ${j}]`;
        tab[i][j] = undefined;
    }
}

console.table(tab);
// console.log(tab[6][])

function pushTheBallWithColId(colId , ball , player){ 

    let col = [];
    //  transform col to array
    for (let i = 0; i < tab.length; i++) {
        const valeur = tab[i][colId];
        col.push(valeur)
    }
    //pushTheBall(tabl);
    for (let i = 0; i < col.length; i++) {
        if (col[i] === undefined){
           tab[i][colId] = [ball , player];
           break;
        }
   }
}


function play(colID, ball){
    pushTheBallWithColId(colID , ball, "player1");
    pushTheBallWithColId(colID , ball, "player2");
}

console.table(tab);

// function pushTheBall(tabl){
//     for (let i = 0; i < tabl.length; i++) {
//         if (tabl[i] === undefined){
//            tabl[i] = "blue";
//            break;
//         }
//    }
// }

// Classe représentant le jeu Connect 4
class Connect4 {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        // this.grid = [];
        // this.currentPlayer = 1;
        // this.gameOver = false;
        // this.initGrid();
        // this.renderGrid();
        // this.setupEventListeners();
    }

    initGrid() {
        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col] = undefined; // 0 signifie une case vide
            }
        }
    }
}