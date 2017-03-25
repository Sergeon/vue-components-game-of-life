
/*
Any live cell with fewer than two live neighbours dies, as if caused by under-population.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by over-population.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
const gol = {};

const DEAD = 0;
const ALIVE = 1;

const MIN_NEIGHBORS_TO_PERSIST = 2;
const MAX_NEIGHBORS_TO_PERSIST = 3;
const NEIGHBORS_TO_BORN = 3;

let dimension = null;

gol.getNewState = function(board){
    dimension = Math.sqrt(board.length);
    var newState = board.map( function(cell , index){
        var state =  cellWillBe(board , index);
        return {x : cell.x , y : cell.y , state : state };
    });
    return newState;
};

var cellWillBe = function( board, index){

    var cell = board[index];
    if(cell.state == ALIVE)
        return  cellWillPersist(board , index) ? ALIVE : DEAD;
    else if(cell.state == DEAD)
        return  cellWillBorn(board , index) ? ALIVE : DEAD;

    throw new Error('a cell at index ' + index + ' has an invalid state: ' + cell.state );
};

var cellWillBorn = function(board , index ){
    if(board[index].state === ALIVE )
        return false;

    return getAliveNeighbors(board , index) === NEIGHBORS_TO_BORN;
};

var cellWillPersist = function(board , index ){
    if( board[index].state === DEAD )
        return false;

    var aliveNeighbors = getAliveNeighbors(board , index);

    return aliveNeighbors === MIN_NEIGHBORS_TO_PERSIST || aliveNeighbors === MAX_NEIGHBORS_TO_PERSIST;
};

var isNeighbor = function( cell, candidate ){
    if (cell.x == candidate.x && cell.y == candidate.y)
        return false;
    return (Math.abs(cell.x - candidate.x) < 2) && (Math.abs(cell.y - candidate.y) < 2);
};


var getAliveNeighbors = function(board , index ){
    var neighbors = gol.getElligibleCellsAsNeighbors(board , index );

    return neighbors.reduce( sumAliveNeighbors(board[index]) , 0);

    function sumAliveNeighbors(cell){
        return function( memo , candidate ){
            if(candidate.state === DEAD )
                return memo;
            return isNeighbor( cell , candidate ) ? memo + 1 : memo;
        };
    }
};


gol.getElligibleCellsAsNeighbors = function(board , index ){


    let indexes = [
        (index - dimension -1 ) , (index - dimension ) , (index - dimension + 1),
        (index  -1 ) , (index + 1),
        (index + dimension -1 ) , (index + dimension ) , (index + dimension + 1),
    ];

    return indexes.reduce( function(result , element ){

        if(board[element]){
            result.push(board[element]);
        }
        return result;

    },[]);

}

gol.fromFlat = function(values){

        let dimension = Math.sqrt(values.length);
        let x = 0;
        let y = 0;
        let dimensionCounter = 0;

        return values.map( current => {

            let self = {
                x : x,
                y : y,
                state : current
            };
            x++;
            dimensionCounter++;

            if(dimensionCounter == dimension ){
                x = 0;
                dimensionCounter = 0;
                y++;
            }

            return self;
        })
}



export default gol;
