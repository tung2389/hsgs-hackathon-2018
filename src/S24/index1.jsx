import React from "react";
import game from "./lib/gamevui.js";

import "./index.less";

class Row extends React.Component {
    render() {
        console.log('Running');
        const array = [],B = this.props.B, C = this.props.C,D = this.props.D;
        console.table(this.props.pile);
        for (let i = 0; i < this.props.pile.length; ++i)
            if (this.props.pile[i] === -1) {
                console.log('cell');
                array.push(<td
                key = {i}
                style={{
                    backgroundColor: ((i === C && B === D )? "lightblue" : "white"),
                    border: "2px solid black",
                    width: "50px",
                    height: "50px"
                }}
                ></td>);
            }
            else {
                array.push(<td key={i}
                style={{
                    backgroundColor: ((i === C && B === D )? "lightblue" : "white"),
                    border: "2px solid black",
                    width: "50px",
                    height: "50px"
                }}
                >{this.props.pile[i]}</td>);
            }

        return <tr>{array}</tr>;
    }
}
class R extends React.Component {
    render() {
        const array = [], A = this.props.A;
        for (let i = 0; i < this.props.pile.length; ++i)
            if (this.props.pile[i] === -1) {
                array.push(<td
                    style={{
                        backgroundColor: (i === A ? "lightgreen" : "white"),
                        border: "2px solid black",
                        width: "50px",
                        height: "50px"
                    }}
                >
                </td>);
            }
            else {
                array.push(<td key={i}
                style={{
                    backgroundColor: (i === A ? "lightgreen" : "white"),
                    border: "2px solid black",
                    width: "50px",
                    height: "50px"
                }}
                >
                {this.props.pile[i]}</td>);
            }
        return <tr>{array}</tr>;
    }
}
class Board extends React.Component {
    render() {
        let N = this.props.state.piles.length;
        let M = N * N , D;
        let A = this.props.state.A , B = this.props.state.B, C = this.props.state.C;
        const moves = [];
        for (let i = 1; i <= N * N; ++i) {
            moves.push(
                <button className="note"
                    style={{
                        width: "110px",
                        height: "50px",
                        backgroundColor: "yellow"
                    }}
                    onClick={() => this.props.move({ pos: i, x: 0, y: 0 })}>
                    Chose {i}
                </button>
            );
        }
        moves.push(<br />);
        for (let i = 1; i <= N; ++i)
            for (let j = 1; j <= N; ++j)
                moves.push(
                    <button className="note"
                        style={{
                            width: "110px",
                            height: "50px",
                            backgroundColor: "orange"
                        }}
                        onClick={() => this.props.move({ pos: 0, x: i, y: j })}>
                        To {i},{j}
                    </button>
                );
        moves.push(<br />);
        const err = this.props.error ? this.props.error.message : null;
        return (
            <div>
                <table style={{ border: "2px solid green" }}>
                    <tbody>
                        <Row B={B} C={C} D={0} pile={this.props.state.piles[0]} />
                        <Row B={B} C={C} D={1} pile={this.props.state.piles[1]} />
                        <Row B={B} C={C} D={2} pile={this.props.state.piles[2]} />
                        <Row B={B} C={C} D={3} pile={this.props.state.piles[3]} />
                        <R A={A} pile={this.props.state.a} />
                    </tbody>
                </table>
                <hr />
                {moves}
                <button className="note"
                    style={{
                        width: "110px",
                        height: "50px",
                        backgroundColor: "green"
                    }}
                    onClick={() => this.props.undo()}>
                    UNDO
                </button>
                <h1>{JSON.stringify(this.props.isEnding)}</h1>
                <h1>{JSON.stringify(err)}</h1>
            </div>
        );
    }
}
export default Board;
