/* eslint-disable react/prop-types */
import Box from "../box/Box";

import "./style.css";

const Board = ({ board, onClick }) => {
    return (
        <div className="board-outer">
            <div className="board-inner">
                {
                    board.map((val, idx) => {
                        return <Box
                            key={idx}
                            value={val}
                            onClick={() => val === null && onClick(idx)}
                        />
                    })
                }
            </div>
        </div>
    )
};

export default Board;