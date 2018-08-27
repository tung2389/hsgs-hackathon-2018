import React from "react";
class Guide extends React.Component {
  render() {
    return (
      <div style={{ color: "yellow", fontSize: "28px" }}>
        <h1> Hướng dẫn chơi </h1>
        <p>
          Nhiệm vụ của bạn là làm cho các ô đều mang màu xanh nước biển trong số
          lượt nhấn ô nhất định.
        </p>
        <p>
          Mỗi ô khi ấn sẽ làm đổi màu chính ô được nhấn và 4 ô xung quanh nó có
          chung cạnh.
        </p>
        <span style={{ color: "red" }}>
          Made by <a href="https://github.com/minhducsun2002">cipher::allies</a>
        </span>
      </div>
    );
  }
}

export default Guide;
