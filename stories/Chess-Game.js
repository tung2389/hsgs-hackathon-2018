import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/S17(team 1)/index.jsx";
import Game from "../src/S17(team 1)/lib/Chess.js";
import ReactGame from "react-gameboard/lib/component";
//import './index.less'
const Chess = ReactGame(Game);

storiesOf("Chess(S17)", module)
  .add("Easy", () => (
    <Chess n={3} m={4}>
      <Board />
    </Chess>
  ))
  .add("Expert", () => (
    <Chess n={8} m={8}>
      <Board />
    </Chess>
  ));
