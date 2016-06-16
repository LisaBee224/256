$(document).ready(function() {
var game = new Game();
game.setUpBoardElements();

$("body").keydown(function(e){
  game.initBoard= _.clone(game.board)
  if(e.keyCode == 37){

    game.moveHorizontal(37);
  }else if(e.keyCode == 39){
    game.moveHorizontal(39);
  }else if(e.keyCode ==38){
    game.moveVertical(38);
  }else if(e.keyCode ==40){
    game.moveVertical(40);
  }
  game.compareBoards();
  });

});

var Game = function(){
  this.board=this.makeBoard();
  this.initBoard=this.board;
}

Game.prototype.makeBoard = function(){
  arr = [0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0];
arr.sort(function(){
  return .5-Math.random();
});
 var boardArray = [];
 boardArray.push(arr.slice(0,4));
 boardArray.push(arr.slice(4,8));
 boardArray.push(arr.slice(8,12));
 boardArray.push(arr.slice(12,16));
 return boardArray;
}


Game.prototype.setUpBoardElements= function(){
var nestedArr = this.board;
for (var i=0; i < 4; i++){
  for(var j =0; j<4; j++){
    cell = $("#row-" + i + " .col-" + j)
    if ((nestedArr[i][j] === 0) || (nestedArr[i][j] === "")){
      cell.text("");

      cell.css("background-color", "#d3fc8d");
    }else if(nestedArr[i][j] === 2){
      cell.text(nestedArr[i][j])
      cell.css("background-color", "#9de059");
    }else if(nestedArr[i][j] === 4){
      cell.text(nestedArr[i][j])
      cell.css("background-color", "#39d688");
    }else if(nestedArr[i][j] === 8){
      cell.text(nestedArr[i][j])
      cell.css("background-color", "#24c166");
    }else if(nestedArr[i][j] === 16){
      cell.text(nestedArr[i][j])
      cell.css("background-color", "#7cf975");
      cell.css("color", "#333333");
    }else if(nestedArr[i][j] === 32){
      cell.text(nestedArr[i][j])
      cell.css("background-color", "#74c4db");

  }
    else{
      cell.text(nestedArr[i][j])
     }
    }
  }
}


Game.prototype.moveHorizontal = function(direction){
  var direction = direction;
    var board=this.board;
    for(var i=0; i <board.length; i++){
      board[i] = _.compact(board[i])
      this.board[i] = addNums(this.board[i]);
      while (board[i].length < 4){
        if(direction===39){
          board[i].unshift("");
        }else if(direction===37){
          board[i].push("");
        }
      }
     }

}

Game.prototype.moveVertical=function(direction){
  this.board = _.unzip(this.board);
    for(var i=0; i<this.board.length; i++){
      this.board[i]=_.compact(this.board[i])
      this.board[i]= addNums(this.board[i]);
      while (this.board[i].length < 4){
        if(direction===38){
        this.board[i].push("");
      }else if(direction===40){
        this.board[i].unshift("");
      }
      }
  }
  this.board = _.unzip(this.board);

}



Game.prototype.addRandomNumber = function(){
  numsToAdd = [2,4,2,4,2,2,2,2,2,2]
  randNum = _.sample(numsToAdd, 1);
  var i = _.sample([0,1,2,3]);
  var j = _.sample([0,1,2,3]);
  while(this.board[i][j] === ""){
  if (this.board[i][j] === "") {
    this.board[i][j] = randNum
  }else{
      i = _.sample([0,1,2,3]);
      j = _.sample([0,1,2,3]);
  }
}
}

Game.prototype.compareBoards=function(){
  if( _.join(this.initBoard, ',') == _.join(this.board, ',')){
    this.addRandomNumber();
  }else{
    this.addRandomNumber();
    this.setUpBoardElements();
  };
}

// Game.prototype.addRandomNumber = function(){
//   numsToAdd = [2,4,2,4,2,2,2,2,2,2]
//   randNum = _.sample(numsToAdd, 1);
//   var i = _.sample([0,1,2,3]);
//   var j = _.sample([0,1,2,3]);
//   while(this.board[i][j] === ""){
//   if (this.board[i][j] === "") {
//     this.board[i][j] = randNum
//   }else{
//       i = _.sample([0,1,2,3]);
//       j = _.sample([0,1,2,3]);
//   }
// }
// }
// Game.prototype.compareBoards=function(){
//   if( _.join(this.initBoard, ',')) == (_.join(this.board, ',')){
//     this.setUpBoardElements();
//   }else{
//     this.addRandomNumber();
//     this.setUpBoardElements();
//   };
// }

// Game.prototype.printBoard=function(){
//   var arr=this.board;
//   for(var i=0;i<4;i++){
//     var rowId = array[i]
//     for(var j=0;j<4;j++){
//       var cell = $("#row-" + i + " .col-" + j)
//       if (arr[i][j] === 0 ){
//         cell.text("")
//       }else{
//         cell.text(array[i][j]);
//       }
//     }
//   }
// }
// Game.prototype.compareBoards=function(){
//   for (var i=0;i<this.board.length;i++){
//     var boardRow = this.board[i];
//     var changedRow = this.changedBoard[i];
//     for (var j=0;j<this.board.length;j++){
//       if(boardRow[j] == changedRow[j]){
//         return false;
//       }else{
//         return true;
//       }
//     }
//   }
// }


function addNums(row){
  if (row != []){
    for (var i=0; i<row.length; i++){
      if (row[i] == row[i+1]){
        var j = i + 1;
        row[i] = row[i] + row[j];
        row.splice(j, 1);
      };
    };
  };
  return row;
}

// Game.prototype.addAdjacentNumbersRight = function(){
//   var board = this.board;
//     for(var i =0; i <board.length; i++){
//       board[i] = _.compact(board[i])
//       while (board[i].length < 4){
//         board[i].unshift("");
//       }
//   }
// }




// Game.prototype.moveLeft = function(direction){

//   var board=this.board;
//     for(var i=0; i<board.length; i++){
//       board[i] = _.compact(board[i])
//       this.board[i] = addNums(this.board[i]);
//       while (board[i].length < 4){
//         board[i].push("");
//       }
//   }
//   this.changedBoard=board;
//   this.addRandomNumber();
//   this.setUpBoardElements();
// }

// Game.prototype.moveRight = function(){
//   var board=this.board;
//     for(var i=0; i <board.length; i++){
//       board[i] = _.compact(board[i])
//       this.board[i] = addNums(this.board[i]);
//       while (board[i].length < 4){
//         board[i].unshift("");
//       }
//   }
//   this.changedBoard=board;
//   this.addRandomNumber();
//   this.setUpBoardElements();
// }

// Game.prototype.moveUp = function(){
//     this.board = _.unzip(this.board);
//     for(var i=0; i<this.board.length; i++){
//       this.board[i]=_.compact(this.board[i])
//       this.board[i]= addNums(this.board[i]);
//       while (this.board[i].length < 4){
//         this.board[i].push("");
//       }
//   }
//   this.board = _.unzip(this.board)
//   this.addRandomNumber();
//   this.setUpBoardElements();
// }

// Game.prototype.moveDown = function(){
//     this.board = _.unzip(this.board);
//     for(var i=0; i <this.board.length; i++){
//       this.board[i] = _.compact(this.board[i])
//       this.board[i] = addNums(this.board[i]);
//       while (this.board[i].length < 4){
//         this.board[i].unshift("");
//       }
//   }
//   this.board = _.unzip(this.board)
//   this.addRandomNumber();
//   this.setUpBoardElements();
// }