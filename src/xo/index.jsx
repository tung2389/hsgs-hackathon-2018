import React from "react";
import game from "./lib/xo.js";

import "./index.less";

class Game extends React.Component {
    render() {

        const N = this.props.state.Board.length;
        const M = this.props.state.Board[0].length;
        const moves = [];
        for (let i = 0; i < N; i++) {
            const arr = [];
            for (let j = 0; j < M; j++) {
                arr.push(
                    <button className="note"
                        onClick={() => this.props.move({ x: i, y: j })}
                        disabled={this.props.isEnding !== " CONTINUE"}
                        style={{
                            color: (this.props.state.Board[i][j] === 'X' ? "red" : (this.props.state.Board[i][j] === 'O' ? "blue" : "black"))
                        }}
                    >
                        {this.props.state.Board[i][j] !== -1 ? this.props.state.Board[i][j] : ' '}
                    </button>
                );
            }
            moves.push(<div>{arr}</div>);
        }
        let err = this.props.error ? this.props.error.message : "Next step, please!";
        return (
            <div>
                <div >
                    {moves}
                </div>
                <br />
                <br />
                <button
                    className="note"
                    style={{
                        width: "100px",
                        height: "50px",
                        backgroundColor: "yellow"
                    }}
                    onClick={() => this.props.un()}
                >
                    UNDO
                </button>
                <h1>{JSON.stringify(this.props.isEnding)}</h1>
                <h1>{JSON.stringify(err)}</h1>
            </div>
        );
    }
}
export default Game;