import React from "react";
import { storiesOf } from "@storybook/react";
import Board from "../src/N11/index.jsx";
import Game from "../src/N11/lib/N11.js";
import { ReactGame } from "react-gameboard";
import { number, withKnobs } from "@storybook/addon-knobs";
import "../src/N11/index.less";

const N11 = ReactGame(Game);

storiesOf("N11", module)
  .addDecorator(withKnobs)
  .add("Hướng dẫn chơi", () => (
    <div className="N11">
      <div className="divs fonts">
        <h1> Hướng dẫn chơi </h1>
        <div>
          {" "}
          Khi bị lạc vào Sứ Sở Gương, bạn sẽ thấy mọi thứ bị đảo ngược.{" "}
        </div>
        <div>
          {" "}
          Hãy <b>tìm một số</b>, biết nó xuất hiện dưới dạng{" "}
          <b>đường thẳng liên tục</b> - theo chiều ngang, dọc hoặc chéo,{" "}
          <b>xuôi hoặc ngược</b>{" "}
        </div>
        <br />
        <div>
          Nhiệm vụ của bạn là chọn các ô liên tiếp{" "}
          <b>theo thứ tự các số trong đề bài</b> để được đáp án đúng.
        </div>
        <div>
          Bạn có thời gian đếm ngược để hoàn thành bài. Nếu đang trong thời gian
          đếm ngược bạn bỏ cuộc, chọn <b>Chơi mới</b> thì thời gian{" "}
          <b>không được tính lại</b>. Còn nếu bạn đã thua, hoặc đã thắng thì
          thời gian được tính lại.
        </div>
        <div>
          {" "}
          Nếu bạn chọn sai bạn có thể sử dụng <b>Quay lại</b> để quay lại{" "}
        </div>
        <div>
          {" "}
          Ở dạng tùy chọn bạn có thể kéo thanh kích cỡ để thay đổi kích cỡ của
          bảng (hoặc hình thoi), và thay đổi thời gian giới hạn hoàn thành trò
          chơi.{" "}
        </div>
      </div>
    </div>
  ))
  
  .add("Dạng bảng dễ", () => (
    <N11 _N={5} isboard={1} time={10}>
      <Board />
    </N11>
  ))
  .add("Dạng bảng trung bình", () => (
    <N11 _N={5} isboard={1} time={5}>
      <Board />
    </N11>
  ))
  .add("Dạng bảng khó", () => (
    <N11 _N={7} isboard={1} time={10}>
      <Board />
    </N11>
  ))
  
  .add("Dạng hình thoi dễ", () => (
    <N11 _N={5} isboard={0} time={10}>
      <Board />
    </N11>
  ))
  .add("Dạng hình thoi trung bình", () => (
    <N11 _N={5} isboard={0} time={5}>
      <Board />
    </N11>
  ))
  .add("Dạng hình thoi khó", () => (
    <N11 _N={7} isboard={0} time={10}>
      <Board />
    </N11>
  ))
  
  .add("Tùy chọn dạng bảng", () => {
    const options1 = {
      range: true,
      step: 2,
      min: 5,
      max: 23
    };
    const options2 = {
      range: true,
      step: 5,
      min: 10,
      max: 120
    };
    return (
      <N11
        _N={number("Kích cỡ của bảng", 7, options1)}
        isboard={1}
        time={number("Thời gian chơi", 20, options2)}
      >
        <Board />
      </N11>
    );
  })
  
  .add("Tùy chọn dạng hình thoi", () => {
    const options1 = {
      range: true,
      step: 2,
      min: 5,
      max: 23
    };
    const options2 = {
      range: true,
      step: 5,
      min: 10,
      max: 120
    };
    return (
      <N11
        _N={number("Kích cỡ của hình thoi", 7, options1)}
        isboard={0}
        time={number("Thời gian chơi", 20, options2)}
      >
        <Board />
      </N11>
    );
  });
