import React from "react";
import { storiesOf } from "@storybook/react";
import Board from "../src/S08/index.jsx";
import Game from "../src/S08/lib/S08.js";
import ReactGame from "react-gameboard/lib/component";
import { number, withKnobs } from "@storybook/addon-knobs";

const TOH = ReactGame(Game);

storiesOf("S08", module)
.addDecorator(withKnobs)
  .add("Easy", () => (
    <TOH height={4}>
      <Board />
    </TOH>
  ))
  .add("Normal", () => (
    <TOH height={9}>
      <Board />
    </TOH>
  ))
  .add("Hard", () => (
    <TOH height={14}>
      <Board />
    </TOH>
  ))
  .add("Custom", () => {
    const options = {
      range: true,
      step: 1,
      min: 4,
      max: 20
    };
    const x = number("Number of bubbles", 10, options);
    return (
      <TOH height={x}>
        <Board />
      </TOH>
    );
  });