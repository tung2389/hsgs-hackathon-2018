import React from "react";
import "./index.less";

var divStyle = {
  backgroundImage: `url(${"https://i.imgur.com/cHLFJdn.png"})`
};

function Square(props) {
  if (Number(props.color) === -1)
    return <button className="square2">{props.value}</button>;
  if (Number(props.color) === 1)
    return <button className="square1">{props.value}</button>;
  if (Number(props.color) === 0)
    return <button className="square3">{props.value}</button>;
  return <button className="square4">{props.value}</button>;
}

class Board extends React.Component {
  // this.props.state.N /	this.props.state.board /	this.props.state.step
  constructor(props) {
    super(props);
    this.state = {
      name: "A",
      a: 0,
      b: 0,
      val: 0
    };
    this.handleChangename = this.handleChangename.bind(this);
    this.handleChangeA = this.handleChangeA.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
    this.handleChangeC = this.handleChangeC.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangename(event) {
    this.setState({
      name: event.target.value,
      a: this.state.a,
      b: this.state.b,
      val: this.state.val
    });
  }

  handleChangeA(event) {
    this.setState({
      name: this.state.name,
      a: event.target.value,
      b: this.state.b,
      val: this.state.val
    });
  }

  handleChangeB(event) {
    this.setState({
      name: this.state.name,
      a: this.state.a,
      b: event.target.value,
      val: this.state.val
    });
  }

  handleChangeC(event) {
    this.setState({
      name: this.state.name,
      a: this.state.a,
      b: this.state.b,
      val: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.giveMoney({
      A: this.state.a,
      B: this.state.b,
      X: this.state.val
    });
    this.setState({ name: this.state.name, a: 0, b: 0, val: 0 });
    event.preventDefault();
  }

  renderEmpty() {
    return <Square value={this.state.name + " game"} />;
  }

  renderSquare(i, j) {
    if (j == 0) {
      ++i;
      return <Square value={this.state.name + " " + i} color={2} />;
    }
    let X = 0;
    if (this.props.state.board[i + 1][j] < 0) X = -1;
    else if (this.props.state.board[i + 1][j] > 0) X = 1;
    else X = 0;
    return <Square value={this.props.state.board[i + 1][j]} color={X} />;
  }

  renderStatus(status) {
    return <div className="status">{status}</div>;
  }

  renderName(x) {
    return <Square value={this.state.name + " " + x} color={2} />;
  }

  renderNameRow(n) {
    let buffer = [];
    buffer.push(this.renderEmpty());
    for (let i = 1; i <= n; ++i) buffer.push(this.renderName(i));
    return <div className="board-row">{buffer}</div>;
  }

  renderRow(row, n) {
    let buffer = [];
    for (let i = 0; i <= n; ++i) buffer.push(this.renderSquare(row, i));
    return <div className="board-row">{buffer}</div>;
  }

  renderBoard(n) {
    let buffer = [];
    for (let i = 0; i < n; ++i) buffer.push(this.renderRow(i, n));
    return buffer;
  }

  render() {
    const isEnded = this.props.isEnding;
    const err = this.props.error ? this.props.error.message : null;
    let status = [];
    if (isEnded === null) {
      status.push(
        "You have used " +
          this.props.state.step +
          (this.props.step >= 2 ? " moves!" : " move!")
      );
      status.push(" Bạn đã dùng " + this.props.state.step + " bước.");
    } else if (isEnded == "won") {
      status.push(<div className="star">⋆⋆⋆</div>);
      status.push(<div style={{ color: "green" }}>Bạn thắng</div>);
    } else if (isEnded == "won1") {
      status.push(<div className="star">⋆⋆</div>);
      status.push(
        <div style={{ color: "yellowgreen" }}>Cách làm của bạn khá tốt</div>
      );
    } else if (isEnded == "lose") {
      status.push(<div className="star">⋆</div>);
      status.push(<div>Ít nhất bạn đã hoàn thành.</div>);
    }
    let error = [];
    if (err !== null) error.push(JSON.stringify(err));

    return (
      <div style={divStyle} className="s11">
        <label class="label"> NAME </label>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChangename}
          maxLength="12"
        />
        {this.renderStatus(status)}
        {this.renderNameRow(this.props.state.N)}
        {this.renderBoard(this.props.state.N)}
        <div style={{ color: "red" }}> {error} </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label class="label">
              First person (Người thứ nhất):
              <input
                type="number"
                value={this.state.a}
                onChange={this.handleChangeA}
              />
            </label>{" "}
            <br />
            <label class="label">
              Second person (Người thứ hai):
              <input
                type="number"
                value={this.state.b}
                onChange={this.handleChangeB}
              />
            </label>{" "}
            <br />
            <label class="label">
              Balance (Số tiền):
              <input
                type="number"
                Min="1"
                Max="100000"
                value={this.state.val}
                onChange={this.handleChangeC}
              />
            </label>{" "}
            <br />
            <input type="submit" value="Submit" />
          </form>{" "}
        </div>
        <button className="button2" onClick={() => this.props.undo()}>
          Quay lại
        </button>
        <button className="button1" onClick={() => this.props.StartaNewGame()}>
          Chơi mới
        </button>
      </div>
    );
  }
}

export default Board;
