"use strict";
Object.defineProperty(exports, "__esModule", {value: true});


const BoardGame = {
    /*
        Initializing board
        @param playField an array containing the current gameplay as well as the answer
     */
    default(props = {size: 36}) {
        const playField = [];
        const opt = ["+", "-", "*"];
        //We pregenerate the answer and calculate it
        for (let i = 0; i < props.size; i++) {
            playField.push([]);
            for (let j = 0; j < props.size; j++) {
                /*
                @param ans: Answer of the Game
                @param play: The current value that's the player is having on that cell
                @param hinted: true if the hint was placed on the cell
                 Preload all the field with black cell, replace it with white cell later
                 black cell will be recognized by String "b"
                 */
                playField[i].push({ans: "b", play: "b", hinted: false});
            }
        }

        //Initializing answer
        for (let i = 0; i < props.size - 2; i++) {
            for (let j = 0; j < props.size - 2; j++) {
                if (playField[i][j].ans >= 0 || (i % 2 === 1 && j % 2 === 1)) {
                    continue;
                }
                else if (i % 2 === 0 && j % 2 === 0) {
                    playField[i][j].ans = Math.floor(Math.random() * 10) + 1;
                }
                else if (i % 2 === 1 || j % 2 === 1) {
                    playField[i][j].ans = opt[Math.floor(Math.random() * 3)];
                }

                playField[i][j].play = "a";
            }
        }


        for (let i = 0; i < props.size - 2; i += 2) {
            playField[i][props.size - 2].ans = "=";
            playField[i][props.size - 2].play = "=";
            let ans;
            //Create a mathematic function in string
            for (let j = 0; j < props.size - 2; j++) {
                console.log(ans);
                if (!ans) {
                    ans = playField[i][j].ans;
                    continue;
                }
                ans += playField[i][j].ans;
            }
            //Convert the string into JS Function and calculate
            ans = eval(ans);
            playField[i][props.size - 1].ans = ans;
            playField[i][props.size - 1].play = ans;
        }

        //Same but to calculate the Horizontal result
        for (let i = 0; i < props.size - 2; i += 2) {
            playField[props.size - 2][i].ans = "=";
            playField[props.size - 2][i].play = "=";

            let ans;
            for (let j = 0; j < props.size - 2; j++) {
                if (!ans) {
                    ans = playField[j][i].ans;
                    continue;
                }
                ans += playField[j][i].ans;
            }
            ans = eval(ans);


            playField[props.size - 1][i].ans = ans;
            playField[props.size - 1][i].play = ans;
        }

        return {playField};
    },


    actions: {
        async hint(state) {
            let x = 0, y = 0;
            let playField = state.playField.slice();

            //Counting the number of hints
            let count = 0;
            for (let i = 0; i < playField.length - 2; i++) {
                for (let j = 0; j < playField.length - 2; j++) {
                    if (playField[i][j].hinted) {
                        count++;
                    }
                }
            }
            //Limit 3 Hint
            if (count >= 3) {
                throw new Error("Bạn không thể dùng thêm sự trợ giúp nữa");
            }

            //If the hints are avaliable, generate new hint
            while (playField[x][y].play === "b" || playField[x][y].hinted) {
                x = Math.abs(Math.floor(Math.random() * playField.length - 2));
                y = Math.abs(Math.floor(Math.random() * playField.length - 2));
            }

            playField[x][y].hinted = true;
            playField[x][y].play = playField[x][y].ans;

            return {playField};
        },
        async reset(state) {
            //Reset the field
            let playField = state.playField.slice();
            for (let i = 0; i < state.playField.length - 2; i++) {
                for (let j = 0; j < state.playField.length - 2; j++) {
                    //Didn't reset the hint, as it the correct answer to the game
                    if (playField[i][j].play !== "b" && !playField[i][j].hinted) {
                        playField[i][j].play = "a";
                    }
                }
            }
            return {playField};
        },
        async change(state, {x, y, val}) {
            //Changing the cell value
            //We will use a rotation each time a player click a specific cell
            //Ex: 1 -> 2, 2 -> 3 ... 9 -> 0 and so on
            const size = state.playField.length - 2;
            //Redundant check, but for safe purpose
            if (x >= size || y >= size) {
                throw new Error("Bạn không thể điến số vào đây");
            }

            console.log(state.playField[x][y].play);
            console.log(state.playField[x][y].play === "b");
            if (state.playField[x][y].play === "b") {
                throw new Error("Bạn không thể điến số vào đây");
            }

            const playField = state.playField.slice();
            console.log(playField);
            //Assigning new Values if cell haven't been touched before
            if (val === "a"
                && state.playField[x + 1][y].play !== "b"
                && state.playField[x][y + 1].play !== "b") {
                //Cell that's contain numbers (except the result) never have any black cell next to it
                //Only check the left and right because a cell contains an operator will have a b
                val = 1;
            }
            else if (val === "a") {
                val = "+";
            }
            else if (Number.isInteger(val) && val === 10) {
                val = 1;
            }
            else if (Number.isInteger(val)) {
                val++;
            }
            else if (!Number.isInteger(val)) {
                switch (val) {
                    case "+":
                        val = "-";
                        break;
                    case "-":
                        val = "*";
                        break;
                    case "*":
                        val = "+";
                        break;
                }
            }

            playField[x][y].play = val;

            return {playField};
        }
    },
    //The move always valid due to the prevention
    isValid(state) {
        return true;
    },

    isEnding(state) {
        //Checking game ending, we loop through all of the equation
        const field = state.playField;
        const length = field.length;

        let gameEnd = true;
        outerLoop: for (let i = 0; i < length - 2; i += 2) {
            let ans;
            for (let j = 0; j < length - 2; j++) {
                if (field[i][j].play === "b") {
                    continue;
                }
                if (field[i][j].play === "a") {
                    gameEnd = false;
                    break outerLoop;
                }
                if (!ans) {
                    ans = field[i][j].play;
                    continue;
                }
                ans += field[i][j].play;

            }

            ans = eval(ans);

            if (ans !== field[i][length - 1].ans) {
                gameEnd = false;
                break;
            }
        }


        outerLoop: for (let i = 0; i < length - 2; i += 2) {
            let ans;
            console.log(i);
            for (let j = 0; j < length - 2; j++) {
                if (field[j][i] === "b") {
                    continue;
                }

                if (field[j][i].play === "a") {
                    gameEnd = false;
                    break outerLoop;
                }
                if (!ans) {
                    ans = field[j][i].play;
                    continue;
                }
                ans += field[j][i].play;

            }
            ans = eval(ans);

            if (ans !== field[length - 1][i].ans) {
                gameEnd = false;
                break;
            }
        }

        if (!gameEnd) {
            return null;
        }

        return "won";
    }
};
exports.default = BoardGame;