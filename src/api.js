const API_URL = 'http://18.189.57.69/play/'

export const getNextMove = (board, move) => {
    const payload = {
        "player_name": "Nicholas",
        "game_id": "1",
        "board": [
          [" ", " ", " ", " ", " ", " ", " ", " "],
          ["P", " ", " ", " ", "B", " ", "P", "P"],
          [" ", " ", " ", " ", " ", " ", " ", "K"],
          [" ", " ", "k", " ", "H", " ", " ", " "],
          [" ", "R", " ", "P", " ", " ", "p", " "],
          [" ", " ", " ", "p", "H", "p", " ", " "],
          ["p", "p", " ", " ", " ", " ", " ", "p"],
          ["r", "h", "b", " ", " ", " ", " ", "r"]
        ],
        "move": [7, 6, 3, 5]
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

    return [column.charCodeAt(0) - 'a'.charCodeAt(0) + 1, Number(row)];
}

export const formatMove = ({ from, to } ) => {
    const fromCoordinates = getCoordinates(from);
    const toCoordinates = getCoordinates(to);

    return fromCoordinates.concat(toCoordinates);
}

export const formatBoard = (board) => {
    const formattedBoard = board.map(row => {
        const formattedRow = row.map(cell => {
            if (!cell) {
                return ' '
            }

            const { type, color } = cell;
            
            if (color === 'b') {
                return type.toUpperCase();
            }
            return type;
        })
        return formattedRow;
    });
    
    return formattedBoard
}



