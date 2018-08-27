import ReactGame from "react-gameboard/lib/component";
import React from "react";
import Board from "../src/S25/index.jsx";
import Game from "../src/S25/lib/flipflop.js";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";

import Guide from "../src/S25/Guide.jsx";

const Flip_flop = ReactGame(Game);

storiesOf('Flip-Flop', module)
.addDecorator(withKnobs)
    .add('Instructions', () => (
        <Guide />
    ))
	.add("Basic Mode, 3x3, 3 turns", () => (
        <Flip_flop side={3} turn={3}>
            <Board />
        </Flip_flop>
        ))
    .add("Extended Mode, 5x5, 5 turns", () => (
        <Flip_flop side={5} turn={5}>
            <Board />
        </Flip_flop>
        ))
    .add("Custom Mode", () => {
        const options_size = {
            range: true,
            step: 1,
            min: 1,
            max: 17
        };
        const options_turn = {
            range: true,
            step: 1,
            min: 1,
            max: 100
        };
        const input_n = number("Size", 1, options_size);
        const input_m = number("Turns", 1, options_turn);
        const side = input_n > 1 ? input_n : 1;
        const turn = input_m > 1 ? input_m : 1;
        return (
            <Flip_flop side={side} turn={turn}>
                <Board />
            </Flip_flop>
        );
    });