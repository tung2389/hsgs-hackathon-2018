import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/S31/index.jsx";
import Game from "../src/S31/lib/grad.js";
import ReactGame from "react-gameboard/lib/component";

const Grad = ReactGame(Game);

storiesOf("Grad, Again (S31)", module)
  .addDecorator(withKnobs)
  .add("Dễ", () => (
    <Grad n={6} m={4}>
      <Board />
    </Grad>
  ))
  .add("Thường", () => (
    <Grad n={8} m={6}>
      <Board />
    </Grad>
  ))
  .add("Khó", () => (
    <Grad n={12} m={8}>
      <Board />
    </Grad>
  ))
  .add("Tùy chỉnh", () => {
    const options = {
      range: true,
      step: 1,
      min: 2,
      max: 100
    };
    const input_n = number("Số cột", 6, options);
    const input_m = number("Số hàng", 6, options);
    const n = input_n > 1 ? input_n : 6;
    const m = input_m > 1 ? input_m : 6;
    return (
      <Grad n={n} m={m}>
        <Board />
      </Grad>
    );
  });
