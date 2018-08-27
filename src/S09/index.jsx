import React from "react";

import "./index.less";

/*
*  the Card element looks like this
*        __________
*        |    |    |
*        | 00 | 01 |
*        |____|____|
*        |    |    |
*        | 10 | 11 |
*        |____|____|
 */
class Card extends React.Component {
  render() {
    const currentCard = (
      <div>
        <p> Card no.{this.props.N}</p>
        <table>
          <tr>
            <td> {this.props.cards[this.props.N][0][0]}</td>
            <td> {this.props.cards[this.props.N][0][1]}</td>
          </tr>
          <tr>
            <td> {this.props.cards[this.props.N][1][0]}</td>
            <td> {this.props.cards[this.props.N][1][1]}</td>
          </tr>
        </table>
      </div>
    );
    console.log(currentCard);
    return currentCard;
  }
}

// displaying cards
class cardOut extends React.Component {
  render() {
    const cardList = [];

    for (let cnt = 0; cnt < this.props.E; cnt++) {
      cardList.push(<Card N={cnt} cards={this.props.cards} />);
    }
    console.log(cardList);
    return <tr>{cardList}</tr>;
  }
}

// display the whole board status;
class Cell extends React.Component {
  render() {
    const array = [];
    const size = this.props.size;
    for (let i = 0; i < size; i++) {
      const column = [];
      for (let j = 0; j < size; j++) {
        column.push(<td>{this.props.board[1][i][j]}</td>);
      }
      array.push(<tr>{column}</tr>);
    }

    console.log(array);
    return <tr>array</tr>;
  }
}

// final display onscreen
class Board extends React.Component {
  render() {
    const err = this.props.error ? this.props.error.message : null;
    return (
      <div className="s09">
        <p>
          {" "}
          Tutorial: - Luật chơi: + Bạn có 1 tấm bảng và phải điền hết các thẻ
          2x2 vào bảng sao cho 2 ô không cùng thẻ mà tiếp giáp với nhau có giá
          trị bằng nhau + Trên màn hình có một danh sách các tấm thẻ cần điền có
          giá trị từ 0 + Mỗi thẻ chỉ được sử dụng một lần + Thẻ có thứ tự xoay
          lẫn lộn, người chơi cần xoay đúng (theo chiều kim đồng hồ) + Khi muốn
          thay đổi một ô đã điền, hãy xóa ô đó trước rồi điền thẻ mong muốn vào
          + Game sẽ tự kết thúc khi bạn điền đúng - Có 2 main functions: + Xóa 1
          ô: -> điền vào row, column là tọa độ của ô thẻ cần xóa -> ấn vào nút
          "free a cell" + Thêm giá trị vào 1 ô: -> điền vào row,column là tọa độ
          ô thẻ cần thêm -> điền vào ô Card số thứ tự thẻ cần xóa -> điền vào ô
          Rotate là số bước xoay theo chiều kim đồng hồ của thẻ đc chọn -> ấn
          vào nút "fill a cell" - Ví dụ về xoay kim đh: 1 2 3 1 4 3 2 4 -> -> ->
          3 4 4 2 2 1 1 3 - Ví dụ về liền kề đúng: |---|---|---|---|---| | 1 | 3
          |===| 3 | 2 | |---|---|---|---|---| | 4 | 4 |===| 4 | 2 |
          |---|---|---|---|---| - Lưu ý là có 0.01% sẽ xảy ra lỗi ( ͡° ل͜ ͡°) nếu
          xảy ra thì chịu tại mình làm cẩu thả vl ( ͡ ل͜ ͡) - P/s: tôi đang làm
          thêm tính năng hint
        </p>
        // showing cards here
        <cardOut
          cards={this.props.state.cards}
          E={this.props.state.remainCard}
        />
        // the order form
        <form>
          Row: <textarea id="row" />
          Column: <textarea id="col" />
          Rotate: <textarea id="rot" />
          Card: <textarea id="ncard" />
          // fill with a card
          <button
            type="button"
            onClick={() =>
              this.props.move({
                cx: document.getElementById("row").value,
                cy: document.getElementById("col").value,
                nCard: document.getElementById("ncard").value,
                nRotate: document.getElementById("rot").value,
                freeLoc: false
              })
            }
            value="fill a cell"
          />
          // free from a card
          <button
            type="button"
            onClick={() =>
              this.props.move({
                cx: document.getElementById("row").value,
                cy: document.getElementById("col").value,
                nCard: 0,
                nRotate: 0,
                freeLoc: true
              })
            }
            value="free a cell"
          />
          <button
            type="button"
            onClick={() => this.props.hint()}
            value="hint"
          />
        </form>
        <div>
          // display the cell
          <table style={{ border: "solid black" }}>
            <tbody>
              <Cell
                size={this.props.state.size}
                board={this.props.state.board}
              />
            </tbody>
          </table>
        </div>
        <pre>{JSON.stringify(this.props)}</pre>
        <pre>{JSON.stringify(err)}</pre>
      </div>
    );
  }
}

export default Board;
