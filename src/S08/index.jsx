import React from "react";
import S08 from "./lib/S08.js";

import "./index.less";

class Board extends React.Component {
  render() {
    let res=this.props.state.res;
    let col=this.props.state.col;
    let used=this.props.state.used;
    let h=this.props.state.h;
    let moves = [];
    for( let i=1; i<=h; i++ ){
      if(used[i]) continue;
      if(col[i]==='white')
      moves.push(
        <button className="buttoncircle1" onClick={() => this.props.move({ x: i})}>
          {i}
        </button>
      );
      else
      moves.push(
        <button className="buttoncircle2" onClick={() => this.props.move({ x: i})}>
          {i}
        </button>
      );
    }
    let array = [];
      for(let i = 0 ; i < res.length ; ++ i){
        if(col[res[i]]==='white')
        array.push(
          <button className="buttoncircle1">
            {res[i]}
          </button>
        );
        else
        array.push(
          <button className="buttoncircle2">
            {res[i]}
          </button>
        );
      }
    let pl;
    if(!res.length) pl=<h1></h1>;
    let err = this.props.error ? this.props.error.message : undefined;
    if(res.length===h) err="Game over";
    return (
      <div className="s08 tourist">
        <p>Có {h} quả bóng, {(h-h%2)/2} trắng, còn lại đen. Hãy xếp chúng vào giữa 2 thanh đỏ sao cho:<br/>
          +Các bóng lẻ kề nhau.<br/>
          +Các bóng trắng kề nhau.<br/>
          +Số trái cùng gấp đôi số gần trái cùng.<br/>
        </p>
        <button className="khung" onClick={this.props.StartNewGame}> Start a new game (bắt đầu lại) </button>
        <button className="khung" onClick={this.props.Undo}>Undo</button>
        <br/>
        <hr color="red"/>
        {pl}
        {array}
        <hr color="red"/>
        <p>Ấn vào các quả bóng ở bên dưới để xếp vào giữa 2 thanh đỏ:</p>
        {moves}
        <pre><h1>{JSON.stringify(this.props.isEnding)}</h1></pre>
        <pre><h1>{JSON.stringify(err)}</h1></pre>
      </div>
    );
  }
}

export default Board;