import React from "react";
import { storiesOf } from "@storybook/react";
import Board from "../src/S33/index.jsx";
import Game from "../src/S33/lib/S33.js";
import { ReactGame } from "react-gameboard";
import { number, withKnobs } from "@storybook/addon-knobs";
import "../src/S33/index.less";

const S33 = ReactGame(Game);

storiesOf("S33", module)
  .addDecorator(withKnobs)
  .add("Hướng dẫn chơi", () => {
    return (
      <div className="s33">
        <div className="divs fonts">
          <h1> Hướng dẫn chơi </h1>
          <span>
            Cho một bảng Nx(N+1) ô. Mỗi ô có chứa một số trong khoảng từ 1 đến
            N. Nhiệm vụ của bạn là đặt các quân domino 1x2 (ngang hoặc dọc) phủ
            kín cả bảng, sao cho không có hai cặp domino nào chứa{" "}
            <b>
              cùng bộ (a, b) với a nhỏ hơn bằng b (ví dụ không được có domino
              (5, 2) và (2, 5))
            </b>.
          </span>{" "}
          <br /> <br />
          <span>
            Cách chọn một ô domnino: <br />
            - Đầu tiên bạn chọn một ô bất kì chưa có domino thì ô đó sẽ được
            đánh dấu màu khác.<br />
            - Nếu bạn chọn một ô có domino từ trước thì domino đó sẽ bị xóa đi,
            và ô còn lại trong domino sẽ được đánh dấu.<br />
            - Bạn chọn ô thứ hai (ô thứ hai phải tạo được domino với ô thứ
            nhất).<br />
            - Sau đó domino đó sẽ được đánh dấu. <br />
            - Giả sử ô thứ hai bạn chọn không liền với ô thứ nhất hoặc liền với
            ô thứ nhất nhưng đã được chọn trong một ô domino có trước thì nó sẽ
            thực hiện giống như chọn ô thứ nhất. <br />
            (Việc này để tiện cho bạn khi bạn chọn một domino đã xuất hiện và
            muốn xóa một domino có trước mà quên không tắt việc chọn ô đầu tiên){" "}
            <br />
            - Nếu bạn có lỡ bấm nhầm ô khác khi đang chọn ô thứ nhất thì bạn có
            thể sử dụng nút <b>Quay lại</b>.
          </span>{" "}
          <br /> <br />
        </div>
      </div>
    );
  })
  .add("Mức dễ", () => (
    <S33 _N={4}>
      <Board />
    </S33>
  ))
  .add("Mức trung bình", () => (
    <S33 _N={6}>
      <Board />
    </S33>
  ))
  .add("Mức khó", () => (
    <S33 _N={8}>
      <Board />
    </S33>
  ))
  .add("Tùy chọn", () => {
    const options = {
      range: true,
      step: 1,
      min: 4,
      max: 13
    };
    return (
      <S33 _N={number("Kích thước của bảng", 7, options)}>
        <Board />
      </S33>
    );
  });
