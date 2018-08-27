import React from "react";
import S28 from "./lib/S28.js";
import "./index.less";

class Table extends React.Component {
	render() {
		let num=this.props.num, color=this.props.color, N=this.props.N;
		let origin_color=this.props.origin_color, origin_num=this.props.origin_num;
		let i=this.props.i, j=this.props.j;
		let sqr, cl=['LIGHTPINK','LIGHTSALMON','LAVENDER','FUCHSIA','BLUEVIOLET','GREENYELLOW','MAROON','TAN','SILVER'];
		if(origin_color==-1) {
			if(origin_num==null) {
				if(origin_color==color) {
					sqr=(
						<input style={{backgroundColor: 'white', border: "5px solid black", color: "black"}}
						type="text"
						maxLength="1"
						onChange={e => this.props.onChange(e)}/>
					);
				} else {
					sqr=(
						<input style={{backgroundColor: cl[color%N], border: "5px solid black", color: "black"}}
						type="text"
						maxLength="1"
						onChange={e => this.props.onChange(e)}/>
					);
				}
			} else {
				if(origin_color==color) {
					sqr=(
						<button 
						style={{backgroundColor: 'white', border: "5px solid blue", color: "black"}}
						onClick={() => this.props.changeColor({x: i, y: j})}>
						{origin_num}</button>
					);
				} else {
					sqr=(
						<button 
						style={{backgroundColor: cl[color%N], border: "5px solid blue", color: "black"}}
						onClick={() => this.props.changeColor({x: i, y: j})}>
						{origin_num}</button>
					);
				}
			}
		} else {
			if(origin_num==null) {
				sqr=(
					<input
					style={{backgroundColor: cl[color%N], border: "5px solid blue", color: "yellow"}}
					type="text"
					maxLength="1"
					onChange={e => this.props.onChange(e)}>
					</input>
				);
			} else {
				sqr=(
					<div
					style={{backgroundColor: cl[color], border: "5px solid black", color: "yellow"}}>
					{num}</div>
				);
			}
		}
		return <td>{sqr}</td>
	}
}

let gamestatus;

class Paragraph extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleChange = this.handleChange.bind(this);
	}

	async handleChange(event, x, y) {
   		let value = event.target.value;
    	this.props.update({val: value, x: x, y: y});
  	}

  	//check if the player has finished the game or not
  	//by checking 5 times: 
  	//unique combinations of numbers and colors
  	//different colors in each row and column
  	//different numbers in each row and column
  	async checkgamestatus(nums, colors, N) { 
  		let check=[];
  		gamestatus=[];
  		for(let i=0;i<N;i++) {
  			check.push([]);
  			for(let j=0;j<N;j++) {
  				check[i][j]=0;
  			}
  		}
  		for(let i=0;i<N;i++) {
  			for(let j=0;j<N;j++) {
  				if(colors[i][j]==-1) return;
  			}
  		}
  		for(let i=0;i<N;i++) {
  			for(let j=0;j<N;j++) {
  				if(nums[i][j]==null) return;
  			}
  		}
  		for(let i=0;i<N;i++) {
  			for(let j=0;j<N;j++) {
  				if(check[nums[i][j]-1][colors[i][j]%N]==1) return;
  				else check[nums[i][j]-1][colors[i][j]%N]=1;
  			}
  		}
  		check=[];
  		for(let i=0;i<N;i++) {
  			check.push([]);
  			for(let j=0;j<N;j++) {
  				check[i][j]=0;
  			}
  		}
  		for(let i=0;i<N;i++) {
  			for(let j=0;j<N;j++) {
  				if(check[i][nums[i][j]-1]==1) return;
  				else check[i][nums[i][j]-1]=1;
  			}
  		}
  		check=[];
  		for(let i=0;i<N;i++) {
  			check.push([]);
  			for(let j=0;j<N;j++) {
  				check[i][j]=0;
  			}
  		}
  		for(let i=0;i<N;i++) {
  			for(let j=0;j<N;j++) {
  				if(check[i][colors[i][j]%N]==1) return;
  				else check[i][colors[i][j]%N]=1;
  			}
  		}
  		check=[];
  		for(let i=0;i<N;i++) {
  			check.push([]);
  			for(let j=0;j<N;j++) {
  				check[i][j]=0;
  			}
  		}
  		for(let i=0;i<N;i++) {
  			for(let j=0;j<N;j++) {
  				if(check[i][nums[j][i]-1]==1) return;
  				else check[i][nums[j][i]-1]=1;
  			}
  		}
  		check=[];
  		for(let i=0;i<N;i++) {
  			check.push([]);
  			for(let j=0;j<N;j++) {
  				check[i][j]=0;
  			}
  		}
  		for(let i=0;i<N;i++) {
  			for(let j=0;j<N;j++) {
  				if(check[i][colors[j][i]%N]==1) return;
  				else check[i][colors[j][i]%N]=1;
  			}
  		}
  		gamestatus=["Chúc mừng, bạn đã thành công !!!"];
  		return;
  	}

	render() {
		let nums=this.props.state.nums, N=this.props.state.N, colors=this.props.state.colors;
		let origin_nums=this.props.state.origin_nums, origin_colors=this.props.state.origin_colors;
		let err=this.props.error ? this.props.error.message : 'NULL';
		let row, tab=[];
		var changeColor=this.props.changeColor.bind(this);

		function changec(x, y) {
  			throw new Error(JSON.stringify(val));
			this.props.state.nums[0][0]=1;
		}

		for(let i=0;i<N;i++) {
			row=[];
			for(let j=0;j<N;j++) {
				row.push(
					<Table 
						i={i}
						j={j}
						N={N} 
						num={nums[i][j]}
						color={colors[i][j]}
						origin_color={origin_colors[i][j]}
						origin_num={origin_nums[i][j]}
						onChange={e => this.handleChange(e, i, j)}
						changeColor={changeColor}>
					</Table>
				);
			}
			tab.push(<tr>{row}</tr>);
		}
		this.checkgamestatus(nums, colors, N);
		return (
			<div class="S28">
				<div>
					<h1>
						<table>{tab}</table>
						<div>{gamestatus}</div>
					</h1>
				</div>
			</div>
		);
	}
}

export default Paragraph;