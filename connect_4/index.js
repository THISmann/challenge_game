// const tab = [];
// let = players = ["player1", "player2"];

// for (let i = 0; i < 7; i++) {
//   tab[i] = [];
//   for (let j = 0; j < 5; j++) {
//     tab[i][j] = `[${i} , ${j}]`;
//     //tab[i][j] = undefined;
//   }
// }

// console.table(tab);
// // console.log(tab[6][])

// function pushTheBallWithColId(colId, ball, player) {
//   let col = [];
//   //  transform col to array
//   for (let i = 0; i < tab.length; i++) {
//     const valeur = tab[i][colId];
//     col.push(valeur);
//   }
//   //pushTheBall(tabl);
//   for (let i = 0; i < col.length; i++) {
//     if (col[i] === undefined) {
//       tab[i][colId] = [ball, player];
//       break;
//     }
//   }
// }

// function play(colID, ball) {
//   pushTheBallWithColId(colID, ball, "player1");
//   pushTheBallWithColId(colID, ball, "player2");
// }

// console.table(tab);

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
  constructor(rows, cols, players) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];
    this.players = players;
    this.currentPlayer = 1;
    this.gameOver = false;
    this.initGrid();
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

  dropBall(colID, ball, player) {
    let col = [];
    //  transform col to array
    for (let i = 0; i < this.grid.length; i++) {
      const valeur = this.grid[i][colID];
      col.push(valeur);
    }
    //pushTheBall(tabl);
    for (let i = 0; i < col.length; i++) {
      if (col[i] === undefined) {
        this.grid[i][colID] = [ball, player];
        break;
      }
    }
  }

  checkWin(player, ball) {
    // Check horizontally
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols - 3; col++) {
        if (
          JSON.stringify(this.grid[row][col]) ===
            JSON.stringify([ball, player]) &&
          JSON.stringify(this.grid[row][col + 1]) ===
            JSON.stringify([ball, player]) &&
          JSON.stringify(this.grid[row][col + 2]) ===
            JSON.stringify([ball, player]) &&
          JSON.stringify(this.grid[row][col + 3]) ===
            JSON.stringify([ball, player])
        ) {
          return true;
        }
      }
    }

    // Check vertically
    for (let row = 0; row < this.rows - 3; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (
          JSON.stringify(this.grid[row][col]) ===
            JSON.stringify([ball, player]) &&
          JSON.stringify(this.grid[row + 1][col]) ===
            JSON.stringify([ball, player]) &&
          JSON.stringify(this.grid[row + 2][col]) ===
            JSON.stringify([ball, player]) &&
          JSON.stringify(this.grid[row + 3][col]) ===
            JSON.stringify([ball, player])
        ) {
          return true;
        }
      }
    }

    // Check diagonally (bottom-left to top-right)
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols - 3; col++) {
        if (
          JSON.stringify(this.grid[row][col]) ===
            JSON.stringify([ball, player]) &&
          JSON.stringify(this.grid[row - 1][col + 1]) ===
            JSON.stringify([ball, player]) &&
          JSON.stringify(this.grid[row - 2][col + 2]) ===
            JSON.stringify([ball, player]) &&
          JSON.stringify(this.grid[row - 3][col + 3]) ===
            JSON.stringify([ball, player])
        ) {
          return true;
        }
      }
    }

    // Check diagonally (top-left to bottom-right)
    for (let row = 0; row < this.rows - 3; row++) {
      for (let col = 0; col < this.cols - 3; col++) {
        if (
          JSON.stringify(this.grid[row][col]) ===
            JSON.stringify([ball, player]) &&
          JSON.stringify(this.grid[row + 1][col + 1]) ===
            JSON.stringify([ball, player]) &&
          JSON.stringify(this.grid[row + 2][col + 2]) ===
            JSON.stringify([ball, player]) &&
          JSON.stringify(this.grid[row + 3][col + 3]) ===
            JSON.stringify([ball, player])
        ) {
          return true;
        }
      }
    }

    return false
  }

  showGrid() {
    return this.grid;
  }

  // Méthode pour gérer le tour du joueur actuel
  playTurn(colID, ball) {
    this.dropBall(colID, ball, this.players[this.currentPlayer]);
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
    console.log(`C'est le tour de ${this.players[this.currentPlayer]}.`);
  }

  resetGame() {
    this.initGrid();
    this.currentPlayer = 1;
    this.gameOver = false;
  }
}

let game1 = new Connect4(4, 7);
game1.dropBall(0, "blue", "player1");
game1.dropBall(1, "blue", "player2");
console.table(game1.showGrid());
