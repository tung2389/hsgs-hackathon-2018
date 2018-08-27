import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/N39/index.jsx";
import Game from "../src/N39/lib/N39.js";
import ReactGame from "react-gameboard/lib/component";
import Guide from "../src/N39/guide.jsx";

const N39 = ReactGame(Game);

storiesOf("N39", module)
  .addDecorator(withKnobs)
  .add("Hướng dẫn", () => (
    <Guide> </Guide>
  ))
  .add("Dễ", () => (
    <N39 N={3}>
      <Board />
    </N39>
  ))
  .add("Trung bình", () => (
    <N39 N={4}>
      <Board />
    </N39>
  ))
  .add("Khó", () => (
    <N39 N={6}>
      <Board />
    </N39>
  ))
  .add("Tùy chọn", () => {
    const options = {
      range: true,
      step: 1,
      min: 1,
      max: 10
    };
    return (
      <N39 N={number("Hàng", 5, options)}>
        <Board />
      </N39>
    );
  });
