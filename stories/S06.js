import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/S06/index.jsx";
import Game from "../src/S06/lib/tshirt.js";
import ReactGame from "react-gameboard/lib/component";

const Tshirt = ReactGame(Game);

storiesOf("Tshirt (S06)", module)
  .addDecorator(withKnobs)
  .add("Dễ", () => (
    <Tshirt n={4} m={4}>
      <Board />
    </Tshirt>
  ))
  .add("Thường", () => (
    <Tshirt n={6} m={6}>
      <Board />
    </Tshirt>
  ))
  .add("Khó", () => (
    <Tshirt n={8} m={8}>
      <Board />
    </Tshirt>
  ))
  .add("Tùy chỉnh", () => {
    const options = {
      range: true,
      step: 1,
      min: 4,
      max: 50
    };
    const input_n = number("Số cột", 6, options);
    const input_m = number("Số hàng", 6, options);
    const n = input_n > 1 ? input_n : 6;
    const m = input_m > 1 ? input_m : 6;
    return (
      <Tshirt n={n} m={m}>
        <Board />
      </Tshirt>
    );
  });
