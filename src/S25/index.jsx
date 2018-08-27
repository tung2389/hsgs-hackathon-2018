import React from "react";
import flipflop from "./lib/flipflop.js";

import "./index.less";

class Board extends React.Component {
  render() {
    const state = this.props.state.stateMap;
    const side = this.props.state.side;
    var array = [];
    // var key = 1;
    for (let i = 0; i <= side - 1; i++) {
      // let subarray of state
      var row_ = [];
      for (let n = 0; n <= side - 1; n++) {
        // let cell of subarray
        row_.push(
          <button
            className={"choiceButton" + (state[i][n] === true ? "_on" : "_off")}
            row={i}
            col={n}
            ref={"button" + i + "_" + n}
            onClick={() => {
              this.props.flip({ x: i, y: n });
            }}
            disabled={this.props.isEnding}
          >
            {this.props.isEnding === "won"
              ? "\u2714"
              : this.props.isEnding === "lost"
                ? state[i][n]
                  ? "\u2714"
                  : "\u00D7"
                : " "}
          </button>
        );
      }
      array.push(
        <div className="boardRow" align="center">
          {row_}
        </div>
      );
    }
    var controlPanel = [];
    controlPanel.push(
      <div align="center">
        <button id="reloadButton" onClick={this.props.renew}>
          Khởi tạo lại trò chơi
        </button>
        {/* <button style={{backgroundColor: "#009688", border: "0px"}}>&nbsp;</button> */}
        {/* <span id="gameState">{this.props.isEnding ? (this.props.isEnding == "won" ? "You win!" : "You lose!") : (this.props.state.started ? 'Game in progress...' : 'Waiting for game to start...')}</span> */}
      </div>
    );
    if (this.props.isEnding == "won")
      controlPanel.push(
        <div align="center" id="gameStatus_win">
          Bạn đã thắng !
        </div>
      );
    else if (this.props.isEnding == "lost")
      controlPanel.push(
        <div align="center" id="gameStatus_lose">
          Bạn thua rồi ! :P
        </div>
      );
    return (
      <div className="s25" align="center">
        {controlPanel}
        <div style={{ height: "5px", width: "20px", padding: "5px" }}>
          &nbsp;
        </div>
        <button align="center" id="stepCount" disabled>
          {"Số lượt còn lại : " + this.props.state.step}
        </button>
        <div style={{ height: "5px", width: "20px", padding: "5px" }}>
          &nbsp;
        </div>
        {array}
      </div>
    );
  }
}

export default Board;
