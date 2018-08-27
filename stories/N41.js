import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/N41/index.jsx";
import Game from "../src/N41/lib/arroku.js";
import ReactGame from "react-gameboard/lib/component";

const Arroku = ReactGame(Game);

storiesOf("Arrowku (N41)", module)
  .addDecorator(withKnobs)
  .add("Dễ", () => (
    <Arroku size={3} rate={2} arrowRate={2}>
      <Board />
    </Arroku>
  ))
  .add("Thường", () => (
    <Arroku size={3} rate={2.5} arrowRate={3}>
      <Board />
    </Arroku>
  ))
  .add("Khó", () => (
    <Arroku size={4} rate={3} arrowRate={3}>
      <Board />
    </Arroku>
  ))
  .add("Tùy chỉnh", () => {
    const size_options = {
      range: true,
      step: 1,
      min: 2,
      max: 7
    };
    const rate_options = {
      range: true,
      step: 0.25,
      min: 2,
      max: 10
    };
    const input_size = number("Kích cỡ", 3, size_options);
    const input_rate = number("Độ thưa", 2, rate_options);
    const input_arrow_rate = number("Độ thưa của mũi tên", 2, rate_options);
    const size = input_size > 1 ? input_size : 3;
    const rate = input_rate > 1 ? input_rate : 2;
    const arrow_rate = input_arrow_rate > 1 ? input_arrow_rate : 2;
    return (
      <Arroku size={size} rate={rate} arrowRate={arrow_rate}>
        <Board />
      </Arroku>
    );
  });
