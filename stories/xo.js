import React from "react";
import { storiesOf } from "@storybook/react";
import Game from "../src/xo/index.jsx";
import Xo from "../src/xo/lib/xo.js";

import ReactGame from "react-gameboard/lib/component";
import CLOCK from "../src/xo/CLOCK.jsx";
const TOH = ReactGame(Xo);

storiesOf("XO", module)
  .add("10x10", () =>(
    <TOH row={10} col={10}>
      <CLOCK />
      <Game />
    </TOH>
  ))
  .add("20x20", () =>(
    <TOH row={20} col={20}>
      <CLOCK />
      <Game />
    </TOH>
  ))  
