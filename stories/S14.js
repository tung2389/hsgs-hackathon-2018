import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from '@storybook/addon-knobs';
import Board from "../src/S14/index.jsx";
import Game from "../src/S14/lib/S14.js";
import ReactGame from "react-gameboard/lib/component";

const WordPuzzle = ReactGame(Game);

storiesOf("Word Puzzle (S14)", module)
  .addDecorator(withKnobs)
  .add("Instruction", () => {
    return (
      <div className = "s14 note"> 
        <h1> Hướng dẫn chơi game Word Puzzle </h1>
        <u style = {{font : "25px Comic Sans MS, Helvetica underline"}}> 1, Cốt truyện </u>
        <p style = {{font : "25px Comic Sans MS, Helvetica"}}>
          Ngày xửa ngày xưa, vị vua anh Ming của đất nước 302 thuộc hành tinh Mễ Trì, là 
          1 nhà toán học và mật mã học kiệt xuất. Ông đã đề xuất 1 hệ thống mật mã
          mới. Trong đó, các chìa khóa giải mã được ẩn dưới vô vàn các lớp cấu trúc toán học
          và rất nhiều thuật ngữ khủng khiếp khác. Đó chính là khởi nguồn của các hệ mật mã ngày nay.
        </p>
        <span style={{marginLeft: "10px", font : "25px Comic Sans MS, Helvetica"}}> Đôi điều về cuộc đời của vị vua này... </span><br/>
        <i style={{marginLeft: "10px", font : "25px Comic Sans MS, Helvetica"}}> (...một câu chuyện rất dài và không liên quan...)</i><br/>
        <span style={{marginLeft: "10px", font : "25px Comic Sans MS, Helvetica"}}>  ... và đó là nguồn gốc của hệ mật mã mới này. </span><br/>
        <p style = {{font : "25px Comic Sans MS, Helvetica"}}>
          Nhiệm vụ của bạn bây giờ, là giúp cho vị vua của chúng ta tìm thấy tất cả các 
          chìa khóa được ẩn trong bảng.<br/>
        </p>
        <u style = {{font : "25px Comic Sans MS, Helvetica underline"}}> 2, Các bước chơi</u>
        <p style = {{font : "25px Comic Sans MS, Helvetica"}}>
          Trò chơi gồm 2 thành phần chính: bảng số và dãy các số cần tìm. Trong bảng số, 
          các ô đen là các ô bị chắn, các ô xám là các ô cho trước và các ô trắng là các ô 
          bạn cần điền.<br/>
          <center>
            <img src="https://i.imgur.com/CHiBEtG.png" alt = "Bangso"/><br/>
            <i className = "subscript" style = {{font : "25px Comic Sans MS, Helvetica"}}>Bảng số</i><br/>
            <img src="https://i.imgur.com/7IOmXhl.png" alt = "Dayso"/><br/>
            <i className = "subscript" style = {{font : "25px Comic Sans MS, Helvetica"}}>Dãy số cần tìm</i><br/>
          </center>
        </p>
        <p style = {{font : "25px Comic Sans MS, Helvetica"}}>>
          Ban có thể thay số các số trong ô trắng bằng cách bấm vào ô đó. Các ô sẽ nhảy dần từ
          trống rỗng lên 0, 1, 2, ... đến 9. Khi ô đang có số 9 mà bạn bấm, ô đó sẽ trở về làm ô trống rỗng.
          Các số được viết và đọc theo chiều từ trên xuống dưới hoặc từ trái sang phải. Một số có thể bắt đầu bằng
          chữ số 0. Tuy nhiên, có một điều kiện: 1 số chỉ được tính là tìm thấy khi 2 đầu của số đó là 2 ô đen.<br/>
          <center>
            <img src="https://i.imgur.com/JuxxbRg.png" alt = "Move1"/><br/>
            <i className = "subscript" style = {{font : "25px Comic Sans MS, Helvetica"}}>Một nước đi khi bấm vào 1 ô...</i><br/>
            <img src="https://i.imgur.com/bDdd7Eo.png" alt = "Move2"/><br/>
            <i className = "subscript" style = {{font : "25px Comic Sans MS, Helvetica"}}>...và ô sẽ trở thành rỗng sau khi hiện số 9</i><br/>
          </center>
          Ngoài ra, bạn cũng luôn có thể sử dụng nút Reset để đặt lại toàn bộ bảng thành bảng rỗng ban đầu.
          Trò chơi sẽ kết thúc khi bạn tìm được tất cả các số, và dãy các số cần tìm thành dãy rỗng.
        </p>
      </div>
    );
  })
  .add("Div 3 mode", () => (
    <WordPuzzle height={8} width={8}>
      <Board />
    </WordPuzzle>
  ))
  .add("Div 2 mode", () => (
    <WordPuzzle height={10} width={10}>
      <Board />
    </WordPuzzle>
  ))
  .add("Div 1 mode", () => (
    <WordPuzzle height={12} width={12}>
      <Board />
    </WordPuzzle>
  ))
  .add("Special mode - for IOIers only", () => (
    <WordPuzzle height={17} width={17}>
      <Board />
    </WordPuzzle>
  ))
  .add("Custom mode", () => {
    const options = {
      range: true,
      step: 1,
      min: 2,
      max: 100
    };
    const input_n = number("Số hàng", 10, options);
    const input_m = number("Số cột", 10, options);
    const n = input_n > 1 ? input_n : 10;
    const m = input_m > 1 ? input_m : 10;
    return (
      <WordPuzzle height={n} width={m}>
        <Board />
      </WordPuzzle>
    );
  });


