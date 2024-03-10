const API_URL = 'http://18.189.57.69/play/'

const mockedResponse = {
    "result": "continue",
    "message": "",
    "board": [
      [
        "R",
        "H",
        "B",
        "Q",
        "K",
        "B",
        "H",
        "R"
      ],
      [
        "P",
        "P",
        "P",
        " ",
        "P",
        "P",
        "P",
        "P"
      ],
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " "
      ],
      [
        " ",
        " ",
        " ",
        "P",
        " ",
        " ",
        " ",
        " "
      ],
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " "
      ],
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        "h",
        " ",
        " "
      ],
      [
        "p",
        "p",
        "p",
        "p",
        "p",
        "p",
        "p",
        "p"
      ],
      [
        "r",
        "h",
        "b",
        "q",
        "k",
        "b",
        " ",
        "r"
      ]
    ],
    "AI move": [
      1,
      3,
      3,
      3
    ]
  }

export const getNextMove = (board, move) => {
    return Promise.resolve(mockedResponse);

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

export const fromMoveToObject = (move) => {
    const from = String.fromCharCode('a'.charCodeAt(0) + move[0] - 1) + move[1];
    const to = String.fromCharCode('a'.charCodeAt(0) + move[2] - 1) + move[3];

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



