import React from "react";
import n39 from "./lib/N39.js";
import "./index.less";

class Square extends React.Component {
  render() {
    let className = "square";
    if(this.props.type == 1) {
      className += " blur";
      return (
        <button 
          onClick={e => this.props.onClick()}
          className={className}
        >
          <br/>
          <span className={"original"}>{this.props.value + 1}</span>
        </button>
      );
    }
    return (
        <button 
          onClick={e => this.props.onClick()}
          className={className}
        >
          {this.props.value + 1}
        </button>
      );
  }
}

class Board extends React.Component {

  handleClick(event, row, col) {
    this.props.move({row: row, col: col});
  }

  handleRestart(event) {
    this.props.restart();
  }

  render() {
    let N = this.props.state.board.length;
    let arrBoard = [];
    for(let i = 0; i < N; ++i) {
      for(let j = 0; j < N; ++j) {
        arrBoard.push(
          <Square
            type={this.props.state.block[i][j]}
            value={this.props.state.board[i][j]}
            onClick={e => this.handleClick(e, i, j)}
          />
        );
      }
      arrBoard.push(<br/>);
    }

    const err = this.props.error ? this.props.error.message : null;
    let error = [];
    if (err !== null) error.push(JSON.stringify(err));

    let log = [];

    if (this.props.isEnding == "won") {
      log.push(<span className="won">{"Tuyệt đỉnh! Bạn đúng là một thiên tài!"}</span>)
    }
    else if (error.length != 0) {
      log.push(<span className="error">{error}</span>)
    }
    
    let result = [];
    result.push(<span></span>);
    if (log.length != 0) {
      result.push(<div>{log}</div>)
    }

    return (
      <div className="n39">
        {arrBoard}
        <br/>
        <button className="restart" onClick={() => this.handleRestart()}>
          Restart
        </button>
        <br/>
        <br/>
        {result}
      </div>
    );
  }
}

export default Board;
