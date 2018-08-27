import React from "react";
import "./index.less";

function Square(props) {
    // props.square : tạo domino
    return <button className={"square square" + props.square + ((props.square !== 0) ? " color" + props.err : "") + ((props.cur === true) ? " squarecolor" : "")}
                onClick = {props.onClick}
                >
        {props.value}
        </button>
}

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    renderSquare(i, j, X, Y) {
        return <Square 
                value={this.props.state.board[i][j]} 
                square={this.props.state.bo[i][j]}
                err={((X.length === 2 && ((i === X[0] && j === Y[0]) || (i === X[1] && j === Y[1]))) === false ? 0 : 1)+1}
                cur={((this.props.state.cur === 1 && i === this.props.state.X && j === this.props.state.Y))}
                onClick={() => this.props.choose({X : i, Y : j})} 
                />
    }

    renderStatus(status) {
        return <div className="status">{status}</div>;
    }

    renderRow(row, n, X, Y) {
        let buffer = [];
        for (let i = 1; i <= n+1; ++i) buffer.push(this.renderSquare(row, i, X, Y));
        return <div className="board-row">{buffer}</div>;
    }

    renderBoard(n, X, Y) {
        let buffer = [];
        for (let i = 1; i <= n; ++i) buffer.push(this.renderRow(i, n, X, Y));
        return buffer;
    }

    render() {
        const isEnded = this.props.isEnding;
        const err = this.props.error ? this.props.error.message : null;
        let status = [];

        if (isEnded === "won") {
            let buffer = [];
            buffer.push("Bạn thắng ")
            if (this.props.state.N <= 4) buffer.push(" mức dễ. "); 
            else if (this.props.state.N <= 6) buffer.push(" mức trung bình. "); 
            else if (this.props.state.N <= 8) buffer.push(" mức mức khó. "); 
            else buffer.push(" mức Ác Mộng. "); 
            buffer.push("Game thật dễ với một siêu anh hùng như bạn. 👍")
            
            status.push(<div className="star">⋆⋆⋆</div>);
            status.push(<div style={{ color: "green" }}>{buffer}</div>);
        }
        else if (isEnded === "lose"){
            status.push(<div style={{ color : "red"}}>Lần sau bạn nên cố gắng hơn :(.</div>)
        }

        let color = [], X = [], Y = [];

        if (err){
            for (let i = 1; i < err.length; i++){
                if (err[i] !== " " && Number(err[i]) == err[i]){
                    let x = 0;
                    while (Number(err[i]) == err[i]){
                        x *= 10;
                        x += Number(err[i]);
                        i++;
                    }
                    color.push(x);
                }
            }
            for (let i = 1; i <= this.props.state.N; i++) for (let j = 1; j <= this.props.state.N+1; j++){
                if (this.props.state.board[i][j] === color[0]){
                    if (this.props.state.bo[i][j] === 1 && this.props.state.board[i][j+1] === color[1]) {
                        X.push(i); Y.push(j);
                        X.push(i); Y.push(j+1);
                    }
                    if (this.props.state.bo[i][j] === 2 && this.props.state.board[i][j-1] === color[1]) {
                        X.push(i); Y.push(j);
                        X.push(i); Y.push(j-1);
                    }
                    if (this.props.state.bo[i][j] === 3 && this.props.state.board[i+1][j] === color[1]) {
                        X.push(i); Y.push(j);
                        X.push(i+1); Y.push(j);
                    }
                    if (this.props.state.bo[i][j] === 4 && this.props.state.board[i-1][j] === color[1]) {
                        X.push(i); Y.push(j);
                        X.push(i-1); Y.push(j);
                    }
                }
            }
        }

        let error = [];
        if (err !== null) error.push(JSON.stringify(err));

        return (
        <div className="s33 divs">
            {this.renderStatus(status)}
            {this.renderBoard(this.props.state.N, X, Y)}
            <div style={{ color: "red" }}> {error} </div>
            <button className = "button1" onClick={() => this.props.undo()}>Quay lại</button>
            <button className = "button2" onClick={() => this.props.StartaNewGame()}>
            Chơi mới
            </button>
            <button className = "button3" onClick={() => this.props.Solution()}>
            Đáp án.
            </button>
        </div>
        );
    }
}

export default Board;
