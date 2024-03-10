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
