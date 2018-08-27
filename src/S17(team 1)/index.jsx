import React from "react";
import Chess from "./lib/Chess.js";
import "./index.less";
//the thing that one pushes
function Square(props)
{
  return(
    <button className = {props.value} onClick = {props.onClick} disabled = {props.isOver} /> 
  );
}
//the thing that gets printed out 
class Board extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = 
    {
      lang : "vi", //Default language
      help : false, //Default Help state
    }
    this.changelangvi = this.changelangvi.bind(this);
    this.changelangen = this.changelangen.bind(this);
    this.show = this.show.bind(this);
  }
  changelangvi()
  {
    this.setState({lang: "vi"}); //language changing
  }
  changelangen()
  {
    this.setState({lang: "Eng"});
  }
  show()
  {
    this.setState({help: !this.state.help});
  }
  render() 
  {
    let board = this.props.state.board;
    const n = this.props.state.n;
    const m = this.props.state.m;
    const err = this.props.error ? this.props.error.message : null;
    const array = [];
    for(let i = 0; i < n; i++)
    {
      let subarray = [];
      for(let j = 0; j < m; j++)
      {
        subarray.push(
        <Square
        key={i*4+j}
        value={this.props.state.board[i][j]}
        isOver={this.props.isEnding}
        onClick={() => this.props.move({x:i,y:j})}
        />
        );
      }
      array.push(<div className='up' key={i}> {subarray}</div>);
    }
  let error= [];
  let err_return;
  if(err==='cell') // errors thrown
  {
    if(this.state.lang==='Eng')
    err_return="You has been to this cell before";
    else
    err_return="Bạn đã từng di chuyển đến ô này";
    error.push(JSON.stringify(err_return));
  }
  else if(err==='invalid')
  {
    if(this.state.lang==='Eng')
    err_return="The horse doesn't move like that";
    else
    err_return="Đó không phải là nước đi của con mã";
    error.push(JSON.stringify(err_return));
  }
  let div_return;
  if(this.state.help)
  {
  if(this.state.lang === "Eng")
  {
    div_return="Your mission is to travel to every squares in the given grid while not stepping on the red squares. The green squares shall be the one that you can move to.";
  }
  else
  {
    div_return="Nhiệm vụ của bạn là di chuyển tới mọi ô vuông trên lưới ô vuông sao cho không di chuyển lên ô màu đỏ. Ô màu xanh sẽ là ô mà bạn có thể đến được.";
  }
  }
  else
  div_return="";
  return(
    <div>
      <div><button key="vi" onClick={this.changelangen}>English</button><button onClick={this.changelangvi}>Tiếng Việt </button></div>
      <div><button key="help" onClick={this.show}>{this.state.lang==="Eng"?"Show help":"Hướng dẫn"}</button></div>
      <button key="reset" onClick={this.props.reset} style={{color:"red"}}> Reset </button>
      <button key="undo" onClick={this.props.undo} disabled={this.props.isEnding} style={{color:"blue"}}>Undo</button>
      <div> {array} </div>
      <h1 style={{color: "red"}}>
        {this.props.isEnding==="won"?"YOU WON":""}
        {this.props.isEnding==="lose"?"YOU LOSE":""}
        </h1>
        <h1 style={{color:"red"}}>
          {error}
          </h1>
          <div>
            {div_return}
            </div>
      </div>
  );
}
}

export default Board;