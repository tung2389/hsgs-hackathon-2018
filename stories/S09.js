import Game from "../src/S09/lib/IlliotBoard.js";
import Board from "../src/S09/index";
import {storiesOf} from "@storybook/react";
import ReactGame from "react-gameboard/lib/component";


const S09 = ReactGame(Game);

storiesOf("S09", module)
    .add("with board size 3x3 and current 1", () => (
        <S09 sizer={6} cur={1}>
            <Board/>
        </S09>
    ))
    .add("with board size 4x4 and current 3", () => (
        < S09 sizer={8} cur={3}>
            <Board/>
        </S09>
    ))
    .add("with board size 5x5 and current 5", () => (
        <S09 sizer={10} cur={5}>
            <Board/>
        </S09>
))
;