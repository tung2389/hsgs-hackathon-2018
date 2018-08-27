import React from "react";

class train extends React.Component {
    constructor(props)  {
        super(props);
        this.state = {date: new Date()};
    }
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
    tick() {
        this.setState({
          date: new Date()
        });
      }
      render() {
        return (
            <div>
                <p> 
                CHÀO MỪNG CÁC BẠN ĐẾN VỚI GAME VUI (XO) CUA HUYNHSPM:
                </p>
                <h1> It is {this.state.date.toLocaleTimeString()} </h1>
            </div>
        );
    }
}
export default train;