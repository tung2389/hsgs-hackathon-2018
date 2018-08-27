import React from "react";
import "./index.less";
import Countdown from 'react-countdown-clock';

var divStyle = {
  backgroundImage: `url(${"https://i.imgur.com/cHLFJdn.png"})`
};

var istime = 1;

function Square(props) {
    let S = ((props.value === true) ? "color" : "");
    if (props.style === -1) 
        return <button className="squarenull" OnClick = {props.onClick} />;
    return <button className={"square" + S + props.style} 
                  onClick = {props.onClick}
            />;
}

function check(x, y, N, isboard){ // check một ô có nằm trong bảng (hay hình thoi)
    if (x < 1 || x > N || y < 1 || y > N) return false;
    if (isboard !== 1){
        if (x + y > (3 * N + 1) / 2 || x + y < (N + 3) / 2) return false;
        if (x - y > (N - 1) / 2 || x - y < (1 - N) / 2) return false;
    }
    return true;
}

class Board extends React.Component {
    constructor(props) {
    	super(props);
		this.handle = this.handle.bind(this);
	}

    handle(event){ // hết thời gian
        istime = 0;
		this.props.lose();
		return <div> Hết thời gian </div>;
	}
  
    renderSquare(i, j) { // sinh ra một ô
        let isboard = this.props.state.isboard;
        let N = this.props.state.N;
        let val = false;
        for (let k = 0; k < this.props.state.res.length; k++){
            if (i == this.props.state.chosenx[k] && j == this.props.state.choseny[k]) val = true;
        }
        if (isboard === 0){
            if (check(i, j, N, isboard) !== true) 
            return <Square style={-1} 
                        onClick={() => this.props.move({X : i, Y : j})} 
                        value={val}
                    />;
        }
        return <Square 
              style={this.props.state.board[i][j]} 
              onClick={() => this.props.move({X : i, Y : j})}
              value={val}
              />;
    }
  
    renderStatus(status) {
        return <div className="status">{status}</div>;
    }
  
    renderRow(row, n) { // sinh ra một dòng
        let buffer = [];
        for (let i = 1; i <= n; ++i) buffer.push(this.renderSquare(row, i));
        return <div className="board-row">{buffer}</div>;
    }
  
    renderBoard(n) { // sinh ra cả bảng
    let buffer = [];
    for (let i = 1; i <= n; ++i) {
        buffer.push(this.renderRow(i, n));
    }
        return buffer;
    }
  
    render() {
        const isEnded = this.props.isEnding;
        const err = this.props.error ? this.props.error.message : null;
    let status = [];
    
    let N = this.props.state.N;
    let time = this.props.state.time;

    if (istime === 0){
        status.push(<div className="error">Hết thời gian. Cố gắng lần sau!!!</div>);
    }
    else if (isEnded === "won") {
        let buffer = [];
        buffer.push("Bạn thắng ")
        if (N === 5 && time === 10) buffer.push(" mức dễ. Chúc mừng bạn đã hiểu cách chơi. 👍"); 
        else if (N === 5 && time === 5) buffer.push(" mức trung bình. Cố gắng lên, bạn nên thử mức khó. 👍"); 
        else if (N == 7 && time === 10) buffer.push(" mức mức khó. Bạn đang nằm trong top những người chơi giỏi! 👍"); 
        else {
            if (N <= 11 || time >= 6 * N)  buffer.push(" với sự nỗ lực. Bạn nên luyện tập thời gian ít hơn. 👍");
            else if (time >= 4*N) buffer.push(" hơi khó khăn. Bạn nên luyện tập thêm. 👍");
            else buffer.push(" thật dễ dàng. Không ai có thể ngăn cản bạn. 👍")
        }
        status.push(<div className="star">⋆⋆⋆</div>);
        status.push(<div style={{ color: "green" }}>{buffer}</div>);
		}
		else if (isEnded === "lose") {
			status.push(<div className="error">Bạn thua 😢</div>);
			let res = "Bạn tìm được " + this.props.state.res + ". Số cần tìm là " + this.props.state.ans;
			status.push(<div>{res}</div>);
		} 
		else if (isEnded === "TLE"){
            time = 1;
			status.push(<div className="error">Hết thời gian. Cố gắng lần sau!!!</div>);
		}
		else{
                status.push(
                    <Countdown seconds={this.props.state.time} // đếm ngược thời gian.
						color="#000"
						alpha={0.9}
						size={50} 
						onComplete={this.handle}
					/>
				);
        let findNumber = "Số cần tìm " + this.props.state.ans;
        status.push(<div> {findNumber} </div>);
      }
      let error = [];
      if (err !== null) error.push(JSON.stringify(err));
      
      return (
        <div style={divStyle} className="N11">
            {this.renderStatus(status)}
            {this.renderBoard(this.props.state.N)}
            <div className="error"> {error} </div>
		<button className="button1" onClick={() => this.props.undo()}>Quay lại</button>
		<button className="button2" onClick={() => {istime = 1; this.props.StartaNewGame();}}>
            Chơi mới
		</button>
        </div>
      );
    }
  }

export default Board;
