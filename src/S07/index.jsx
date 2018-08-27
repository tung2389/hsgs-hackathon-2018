import React from "react";
import "./index.less";

const option = new Option();

function Square(props) {
  let bG = props.value;
  if (bG === "a" || bG === "b") {
    bG = "\u00A0";
  }

  let bgColor = props.value === "b" ? "#ffb6c0" : "#f9e3cd";
  if (props.hinted) {
    bgColor = "#fdc5c4";
  }

  let name = props.value !== "b" ? "whiteButton" : "blackButton";

  return (
    <button
      onClick={props.move}
      className={name}
      style={{
        backgroundColor: bgColor,
        color: "black",
        margin: -1,
        height: 60,
        width: 60,
        padding: 0,
        textAlign: "center",
        textAnchor: "middle",
        border: "1px solid white",
        font: "20px Century Gothic"
      }}
      disabled={props.disabled}
    >
      {bG}
    </button>
  );
}

class Board extends React.Component {
  render() {
    const array = [];

    console.log(this.props.state.playField);
    const playField = this.props.state.playField;
    const size = playField.length;
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(
          <Square
            key={j}
            value={playField[i][j].play}
            hinted={playField[i][j].hinted}
            move={() =>
              this.props.change({ x: i, y: j, val: playField[i][j].play })
            }
            disabled={
              this.props.isEnding === "won" ||
              playField[i][j].play === "b" ||
              i >= size - 2 ||
              j >= size - 2 ||
              playField[i][j].hinted
            }
          />
        );
      }
      array.push(<div key={i}>{row}</div>);

      //            console.log(this.props.isEnding);
    }

    let log = this.props.error ? this.props.error.message : "";
    if (this.props.isEnding === "won") {
      log = (
        <span className="AnnoucerText">
          Bạn đã chiến thắng, hãy bấm F5 để chơi lại
        </span>
      );
    } else {
      log = <span className="AnnoucerText">{log}</span>;
    }
    //        const err = this.props.error ? this.props.error.message : "";
    return (
      <div className="s07">
        <div className="Board">{array}</div>
        <div>
          <button
            className="Button"
            onClick={() => this.props.reset()}
            disabled={this.props.isEnding === "won"}
          >
            Reset
          </button>
          <button className="Button" onClick={() => this.props.hint()}>
            Hint
          </button>
        </div>
        <div className="Container">{log}</div>
      </div>
    );
  }
}

export default Board;
