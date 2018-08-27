  "use strict";
// exports = {};
Object.defineProperty(exports, "__esModule", { value: true });


// import {randomize} from './utilities.js';
// import {doNothing} from './utilities.js';

function randomize(min, max) {
	let r = Math.random();
	return Math.floor(r * (max - min) + min);
	// randomize function
}

function doNothing() {
}

const flipflop = {
	default(props = {side: 3, turn: 3}) {
		var stateMap = [];
		// this map will contain game board
		var side = props.side;
		// length of side for the board
		for (let i = 1 ; i <= side ; i++) {
			var row = new Array(side).fill(true);
			stateMap.push(row);
		};
		// initialize board
		var limit = side - 1; 	
		// limit coordinates preventing out-of-bound errors
		var step = props.turn;
		// this variable will change: number of remaining steps
		var turn = props.turn;
		// this variable will NOT change: number of turns set by user (used to renew game state)

		// prepare the problem
		const vertical_diff = [1, 0, -1, 0];
		const horizontal_diff = [0, 1, 0, -1];

		for (let n = 1 ; n <= step ; n++) {
			// for each step
			let candidate_x = randomize(0, side - 1), candidate_y = randomize(0, side - 1);
			// randomize the coordinates && flip using the result coordinates
			stateMap[candidate_x][candidate_y] = !stateMap[candidate_x][candidate_y];;
			// console.log(n,candidate_x, candidate_y);
			for (let i = 0 ; i <= 3 ; i++) {
				let adjacent_x = candidate_x + horizontal_diff[i];
				let adjacent_y = candidate_y + vertical_diff[i];
				if (adjacent_x < 0 || adjacent_y < 0 || adjacent_x > limit || adjacent_y > limit)
					doNothing();
				else stateMap[adjacent_x][adjacent_y] = !stateMap[adjacent_x][adjacent_y];
			}
		}
		let started = false;
		// whether game has started: will change to TRUE upon a flip from user
		return {stateMap, side, step, started, turn};
	},
	actions: {
		async flip(state, {x, y}) {
			let stateMap = state.stateMap;
			let limit = state.side - 1;
			// map the variables from the passed values in (state)

			state.step--; let something = state.step;
			// decrement the (step) count

			const vertical_diff = [1, 0, -1, 0];
			const horizontal_diff = [0, 1, 0, -1];

			stateMap[x][y] = !stateMap[x][y];
			for (let i = 0 ; i <= 3 ; i++) {
				let adjacent_x = x + horizontal_diff[i];
				let adjacent_y = y + vertical_diff[i];
				if (adjacent_x < 0 || adjacent_y < 0 || adjacent_x > limit || adjacent_y > limit)
					doNothing();
				else stateMap[adjacent_x][adjacent_y] = !stateMap[adjacent_x][adjacent_y];
			}
			let turn = state.turn;
			// pass the unchanged values same as it is
			let started = this.props.state.started;
			started = true;
			// make (started) TRUE since user already initiated the game
			let ret = {stateMap, side, something, started, turn};
			return ret;
		}, 
		async renew (state) {
			let side = state.side;
			// mapping variables

			state.stateMap.length = 0;
			// clear the map

			var stateMap = [];
			for (let i = 1 ; i <= side ; i++) {
				let row = new Array(side).fill(true);
				stateMap.push(row);
			};
			state.stateMap = stateMap;
			// re-initialize stateMap

			const vertical_diff = [1, 0, -1, 0];
			const horizontal_diff = [0, 1, 0, -1];
			let limit = state.side - 1;
			state.step = state.turn;
			let turn = state.turn;
			for (let n = 1 ; n <= turn ; n++) {
				let candidate_x = randomize(0, side - 1), candidate_y = randomize(0, side - 1);
				// console.log(n, candidate_x, candidate_y);
				stateMap[candidate_x][candidate_y] = !stateMap[candidate_x][candidate_y];
				for (let i = 0 ; i <= 3 ; i++) {
					let adjacent_x = candidate_x + horizontal_diff[i];
					let adjacent_y = candidate_y + vertical_diff[i];
					if (adjacent_x < 0 || adjacent_y < 0 || adjacent_x > limit || adjacent_y > limit)
						doNothing();
					else stateMap[adjacent_x][adjacent_y] = !stateMap[adjacent_x][adjacent_y];
				}
			}
			// same as above
			var started = false;
			// remove (started), set back to false
			return {stateMap, side, step, started, turn};
		},
	},
	isValid(state) {
		return true;
		// unneeded function
	},
	isEnding(state) {
		let stateMap = state.stateMap;
		var end = true;
		for (let subarray of stateMap)
			for (let cell of subarray)
				if (!cell) end = cell;
		if (end) {
			return "won";
		}
		else {
			if (state.step <= 0) return "lost";
			else return null;
		}
	}
};

exports.default = flipflop;