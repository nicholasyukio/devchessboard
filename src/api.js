const API_URL = 'http://18.189.57.69/play/'

export const getNextMove = (board, move) => {
    const payload = {
        "player_name": "Nicholas",
        "game_id": "1",
        "board": board,
        "move": move,
      }
    return fetch(API_URL, {
        method: "POST", // *GET, POST, PUT, DELETE, etc,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      }).then(response => response.json());
}

export const getCoordinates = (point) => {
    const column = point[0];
    const row = point[1];

    return [7 - Number(row) + 1, column.charCodeAt(0) - 'a'.charCodeAt(0)];
}

export const formatMove = ({ from, to } ) => {
    const fromCoordinates = getCoordinates(from);
    const toCoordinates = getCoordinates(to);

    return fromCoordinates.concat(toCoordinates);
}

export const fromMoveToObject = (move) => {
    const from = String.fromCharCode('a'.charCodeAt(0) + move[1]) + (7 - move[0] + 1);
    const to = String.fromCharCode('a'.charCodeAt(0) + move[3]) + (7 - move[2] + 1);

    return {
        from, to
    }
}

export const formatBoard = (board) => {
    const formattedBoard = board.map(row => {
        const formattedRow = row.map(cell => {
            if (!cell) {
                return ' '
            }

            const { type: rawType, color } = cell;
            
            if (color === 'b') {
                const upperCase = rawType.toUpperCase();
                return (upperCase === 'N') ? 'H' : upperCase
            }
            
            return rawType === 'n' ? 'h' : rawType;
        })
        return formattedRow;
    });
    
    return formattedBoard
}



