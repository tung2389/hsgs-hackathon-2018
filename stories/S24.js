import React from "react";
import { storiesOf } from "@storybook/react";
import Board from "../src/S24/index1.jsx";
import Game from "../src/S24/lib/gamevui.js";

import ReactGame from "react-gameboard/lib/component";
import CLOCK from "../src/S24/CLOCK.jsx";
const TOH = ReactGame(Game);

storiesOf("Gamevui(S24)", module)
  .add("game", () =>(
    <TOH height={4}>
      <CLOCK />
      <Board />
    </TOH>
  ))
