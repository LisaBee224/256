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

      setTimeout(function() { location.reload() },2500);
    }else if(nestedArr[i][j] === 32){
      cell.text(nestedArr[i][j])
      cell.css("background-color", "#74c4db");

  }else if(nestedArr[i][j] === 64){
      cell.text(nestedArr[i][j])
      cell.css("background-color", "#a6fc94");

  }else if(nestedArr[i][j] === 128){
      cell.text(nestedArr[i][j])
      cell.css("background-color", "#71fc6f");

  }else if(nestedArr[i][j] === 256){
      cell.text(nestedArr[i][j])
      cell.css("background-color", "#ffdd66");
        $("#header").append("<h2>you won!</h2>");
      $("#header h2").animate({
            right: '250px',
            opacity: '0.5',
            color: '#ff1c60'
        });

  }else{
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

Game.prototype.isWon = function(){

}