import React from "react";
import Game from "../src/S07/lib/board_game.js";
import Board from "../src/S07/index";
import Guide from "../src/S07/lib/guide";
import {storiesOf} from "@storybook/react";
import ReactGame from "react-gameboard/lib/component";


const S07 = new ReactGame(Game);

storiesOf("S07", module)
    .add("Tutorial", () => (
        <Guide/>
    ))
    .add("Easy", () => (
        <S07 size={5}>
            <Board/>
        </S07>
    ))
    .add("Normal", () => (
        <S07 size={7}>
            <Board/>
        </S07>
    ))
    .add("Hard", () => (
        <S07 size={9}>
            <Board/>
        </S07>
    ))
    .add("Insane", () => (
        <S07 size={11}>
            <Board/>
        </S07>
    ))
    .add("Limit of coffees poured into the injection of a raging person who try to solve this", () => (
        <S07 size={21}>
            <Board/>
        </S07>
    ));