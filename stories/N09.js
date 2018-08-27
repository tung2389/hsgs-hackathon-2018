import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import ReactGame from "react-gameboard/lib/component";
import Paragraph from "../src/N09/index.jsx";
import Game from "../src/N09/lib/N09.js";
import Guide from "../src/N09/guide.jsx";

const N09 = ReactGame(Game);

storiesOf("Chikapu(N09)", module)
  .addDecorator(withKnobs)
  .add("Hướng dẫn", () => <Guide> </Guide>)
  .add("Mức dễ", () => (
    <N09 N={4}>
      <Paragraph />
    </N09>
  ))
  .add("Mức trung bình", () => (
    <N09 N={6}>
      <Paragraph />
    </N09>
  ))
  .add("Tùy chọn", () => {
    const options = {
      range: true,
      step: 1,
      min: 4,
      max: 10
    };
    return (
      <N09 N={number("Kích cỡ bảng", 5, options)}>
        <Paragraph />
      </N09>
    );
  });
