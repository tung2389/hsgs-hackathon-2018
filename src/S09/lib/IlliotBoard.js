"use strict";
Object.defineProperty(exports, "__esModule", {value: true});

const Illiot = {
    default(props = {sizer: 6, cur: 1}) {
        const ranRange = 1 + props.sizer / 2;

        let size = props.sizer;

        let board = [
            [[], [], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], [], []]
        ];
        // board 0 means final state
        // board 1 means player state
        let cards = [];
        // -> the array contains cards
        let uCard = [];
        // -> the array contains the status used or not of a card
        let cPlace = [[], [], [], [], [], []];
        let hPlace = [[], [], [], [], [], []];
        // -> the array shows the status of a grid
        for (let i = 0; i < size / 2; i++)
            for (let j = 0; j < size / 2; j++) {
                cPlace[i].push(-1);
                hPlace[i].push(-1);
            }
        // remaincard -> the cards u have 2 fill
        let remainCard = (size / 2) * (size / 2) - (size / 2) + 2;
        //initializing
        for (let i = 0; i < remainCard; i++) uCard.push(false);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                board[0][i].push(-1);
                board[1][i].push("X");
            }
        }
        //GET THE SQUARE OF 4
        for (let i = 1; i < size; i += 2) {
            for (let j = 1; j < size; j += 2) {
                let ranNum = Math.floor(Math.random() * ranRange) + 1;
                board[0][i][j] = ranNum;
                board[0][i + 1][j] = ranNum;
                board[0][i][j + 1] = ranNum;
                board[0][i + 1][j + 1] = ranNum;
            }
        }
        // GET 4 CORNER
        board[0][0][0] = Math.floor(Math.random() * ranRange) + 1;
        board[0][0][size - 1] = Math.floor(Math.random() * ranRange) + 1;
        board[0][size - 1][0] = Math.floor(Math.random() * ranRange) + 1;
        board[0][size - 1][size - 1] = Math.floor(Math.random() * ranRange) + 1;
        // GET SIDE BAR OF 2
        for (let i = 1; i < size; i += 2) {
            board[0][0][i] = Math.floor(Math.random() * ranRange) + 1;
            board[0][0][i + 1] = board[0][0][i];

            board[0][i][0] = Math.floor(Math.random() * ranRange) + 1;
            board[0][i + 1][0] = board[0][i][0];

            board[0][n - 1][i] = Math.floor(Math.random() * ranRange) + 1;
            board[0][n - 1][i + 1] = board[0][n - 1][i];

            board[0][i][n - 1] = Math.floor(Math.random() * ranRange) + 1;
            board[0][i + 1][n - 1] = board[0][i][n - 1];
        }
        // FILLING STARTING STATE
        let filled = 0;
        while (filled < props.cur) {
            const x = Math.floor(Math.random() * (size / 2));
            const y = Math.floor(Math.random() * (size / 2));
            if (board[1][x * 2][y * 2] !== "X") continue;
            board[1][x * 2][y * 2] = board[0][x * 2][y * 2];
            board[1][x * 2][1 + y * 2] = board[0][x * 2][1 + y * 2];
            board[1][1 + x * 2][y * 2] = board[0][1 + x * 2][y * 2];
            board[1][1 + x * 2][1 + y * 2] = board[0][1 + x * 2][1 + y * 2];
            filled++;
        }
        // filling cards into card deck
        for (let i = 0; i < size; i += 2) {
            for (let j = 0; j < size; j += 2) {

                let thisCard = [
                    [board[0][i][j], board[0][i][j + 1]],
                    [board[0][i + 1][j], board[0][i + 1][j + 1]]
                ];
                if (board[1][i][j] === "X") {
                    let rRotate = Math.floor(Math.random() * 4);

                    for (let k = 0; k < rRotate; k++) {
                        const helpCard = thisCard;
                        thisCard[0][0] = helpCard[1][0];
                        thisCard[0][1] = helpCard[0][0];
                        thisCard[1][0] = helpCard[1][1];
                        thisCard[1][1] = helpCard[0][1];
                    }
                    cards.push(thisCard);
                }
            }
        }
        return {board, cards, remainCard, cPlace, uCard, size, hPlace};
    },
    actions: {
        // -> vị trí thẻ hàng cx cột cy ,
        // điền thẻ ncard , xoay nrotate lần theo chiều kim đh,
        // boolean freeloc để giải phóng ô thẻ đó
        async move(state, {cx, cy, nCard, nRotate, freeLoc}) {
            // free a pos
            let x = cx - 1;
            let y = cy - 1;
            let hPlace = state.hPlace.map(v => v.slice());
            let board = state.board.map(v => v.slice());
            let cards = state.cards.map(v => v.slice());
            let remainCard = state.remainCard.map(v => v.slice());
            let cPlace = state.cPlace.map(v => v.slice());
            let uCard = state.uCard.map(v => v.slice());
            let size = state.size.map(v => v.slice());
            // to free a card from a position
            if (freeLoc === true) {
                if (cPlace[x][y] === -1) {
                    throw new Error("Ô này ko có thẻ để giải phóng");
                }
                else if (cPlace[x][y] !== -1) {
                    uCard[cPlace[x][y]] = false;
                    cPlace[x][y] = -1;
                    board[1][x * 2][y * 2] = "#";
                    board[1][1 + x * 2][y * 2] = "#";
                    board[1][x * 2][1 + y * 2] = "#";
                    board[1][1 + x * 2][1 + y * 2] = "#";
                }
            }
            else if (cPlace[x][y] !== -1) {
                throw new Error("Ô này đã có thẻ, hãy điền ô khác hoặc giải phóng");
            }
            else if (uCard[nCard] === true) {
                throw new Error("Thẻ hiện đã được sử dụng, " +
                    "hãy giải phóng thẻ này hoặc sử dụng thẻ khác");
            }
            // xoay theo chieu kim dong ho
            else if (freeLoc === false && cPlace[x][y] === -1
                && uCard[nCard] === false) {
                let thisCard = cards[nCard];
                for (let k = 1; k <= nRotate; k++) {
                    const helpCard = thisCard;
                    thisCard[0][0] = helpCard[1][0];
                    thisCard[0][1] = helpCard[0][0];
                    thisCard[1][0] = helpCard[1][1];
                    thisCard[1][1] = helpCard[0][1];
                }
                // dien gia tri
                uCard[nCard] = true;
                cPlace[x][y] = nCard;
                board[1][x * 2][y * 2] = thisCard[0][0];
                board[1][1 + x * 2][y * 2] = thisCard[1][0];
                board[1][x * 2][1 + y * 2] = thisCard[0][1];
                board[1][1 + x * 2][1 + y * 2] = thisCard[1][1];
            }
            return {board, cards, remainCard, cPlace, uCard, size, hPlace};
        },
        async hint(state) {
            let size = state.size.map(v => v.slice());
            let sidec = size / 2;
            let cards = state.cards.map(v => v.slice());
            let board = state.board.map(v => v.slice());
            let remainCard = state.remainCard.map(v => v.slice());
            let cPlace = state.cPlace.map(v => v.slice());
            let uCard = state.uCard.map(v => v.slice());
            let total = sidec * sidec;
            let hPlace = state.hPlace.map(v => v.slice());
            let hinted = false;
            for (let i = 0; i < total; i++) {
                let colB = total % (sidec + 1);
                let rowB = (total - colB) / (sidec + 1);
                if (cPlace[rowB][colB] === -1) {
                    if (uCard[hPlace[rowB][colB]] === false) {
                        uCard[hPlace[rowB][colB]] = true;
                        cPlace[rowB][colB] = hPlace[rowB][colB];
                        hinted = true;
                        break;
                    }
                }
            }
            if (!hinted) throw new Error("No hint to be made");
            return {board, cards, remainCard, cPlace, uCard, size, hPlace};
        }
    },
    isValid(state) {
        return true;
    },
    isEnding(state) {
        const board = state.board;
        const size = state.size;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (board[1][i][j] !== board[0][i][j]) return null;
            }
        }
        return "won";
    }

};
exports.default = Illiot;