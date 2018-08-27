import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import ReactGame from "react-gameboard/lib/component";
import Paragraph from "../src/S28/index.jsx";
import Game from "../src/S28/lib/S28.js";
import Guide from "../src/S28/guide.jsx";

const S28 = ReactGame(Game);

storiesOf("Pikachu(S28)", module)
	.addDecorator(withKnobs)
	.add("Hướng dẫn", () => <Guide> </Guide>)
	.add("Mức dễ", () => (
		<S28 N={3}>
			<Paragraph/>
		</S28>
	))
	.add("Mức trung bình", () => (
		<S28 N={5}>
			<Paragraph/>
		</S28>
	))
	.add("Tùy chọn", () => {
		const options = {
			range: true,
			step: 1,
			min: 3,
			max: 9
		};
		return (
			<S28 N={number("Kích cỡ bảng", 5, options)}>
				<Paragraph/>
			</S28>
		);
	});