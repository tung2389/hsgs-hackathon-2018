"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

let S28={
	default (props={N: 5}) {
		// Init
		let N=props.N, nums=[], colors=[], check=[], origin_nums=[], origin_colors=[];
		let t1=[],t2=[],t3=[],t4=[],deladd=0, del=0;
		// t4, deladd, del, t5, t1, t2, t3 are used as temporary memories
		// del = number of elements we are going to remove from the board with + deladd as a random 0 or 1
		// origin_colors are the start colors of each element in the board
		// origin_nums are the start numeric value of each element in the board
		// colors are colors of each element currently in the board
		// nums are numeric value of each element currently in the board
		function backtrack(pos) {
			if(pos<N) {
				for(let i=0;i<N;i++) {
					if(check[i]==0) {
						check[i]=1;
						t1.push(i);
						backtrack(pos+1);
						t1.pop();
						check[i]=0;
					}
				}
			} else {
				colors=[];
				for(let i=0;i<N;i++) {
					colors.push([]);
					for(let j=0;j<N;j++) {
						colors[i][(j+t3[i])%N]=t2[(j+t1[i])%N];
					}
				}
				for(let i=0;i<N;i++) {
					for(let j=i+1;j<N;j++) {
						if(colors[i][0]==colors[j][0]) {
							colors=[];
							return;
						}
					}
				}

			}
		}


		// random each rows with a cyclic pattern

		
		for(let i=0;i<N;i++) {
			t1.push(i+1);
		}
		for(let i=0;i<N;i++) {
			let tmp=Math.floor(Math.random()*t1.length);
			t2.push(t1[tmp]);
			t1.splice(tmp,1);
		}
		for(let i=0;i<N;i++) {
			t1.push(i);
		}
		for(let i=0;i<N;i++) {
			nums.push([]);
			origin_nums.push([]);
			let tmp=Math.floor(Math.random()*t1.length);
			t3.push(N-t1[tmp]-1);
			for(let j=0;j<N;j++) {
				nums[i][j]=t2[(j+t1[tmp])%N];
				origin_nums[i][j]=t2[(j+t1[tmp])%N];
			}
			t1.splice(tmp,1);
		}
		t2=[];
		for(let i=0;i<N;i++) {
			t1.push(i);
		}
		for(let i=0;i<N;i++) {
			let tmp=Math.floor(Math.random()*t1.length);
			t2.push(t1[tmp]);
			t1.splice(tmp,1);
		}
		for(let i=0;i<N;i++) {
			t1.push(i);
		}
		for(let i=0;i<N;i++) {
			let tmp=Math.floor(Math.random()*t1.length);
			colors.push([]);
			origin_colors.push([]);
			for(let j=0;j<N;j++) {
				colors[i][(j+t3[i])%N]=t2[(j+t1[tmp])%N];
				origin_colors[i][(j+t3[i])%N]=t2[(j+t1[tmp])%N];
			}
			t1.splice(tmp,1);
		}
		if(N>3) {
		for(let k=0;k<N;k++) {
			for(let i=0;i<N;i++) {
				for(let j=i+1;j<N;j++) {
					if(colors[i][k]==colors[j][k]&&colors[i][k]>-1) {
						if(Math.floor(Math.random()*2)==0) colors[i][k]=-1,origin_colors[i][k]=-1;
						else colors[j][k]=-1,origin_colors[j][k]=-1;
						del--;
					}
				}
			}
		}}

		// delete some of the numbers and colors in the board

		del=Math.floor(N*6/9);

		for(let i=0;i<N;i++) {
			t4=[];
			for(let j=0;j<N;j++) {
				t4.push(j);
			}
			deladd=Math.round(Math.random());
			for(let j=0;j<del+deladd;j++) {
				let t5=Math.floor(Math.random()*t4.length);
				colors[t4[t5]][i]=-1;
				origin_colors[t4[t5]][i]=-1;
				t4.splice(t5, 1);
			}
		}	

		del=Math.floor(N*6/9);

		for(let i=0;i<N;i++) {
			t4=[];
			for(let j=0;j<N;j++) {
				t4.push(j);
			}
			deladd=Math.round(Math.random());
			for(let j=0;j<del+deladd;j++) {
				let t5=Math.floor(Math.random()*t4.length);
				nums[t4[t5]][i]=null;
				origin_nums[t4[t5]][i]=null;
				t4.splice(t5, 1);
			}
		}
		return ({N, nums, colors, origin_nums, origin_colors});
	},

	actions: {
		async update(state, {val, x, y}) {
			let nums=state.nums, N=state.N, colors=state.colors;
			let origin_nums=state.origin_nums, origin_colors=state.origin_colors;
			if(val != "" && (parseInt(val) != val||val == '0')) {
				throw new Error(JSON.stringify('Nhập sai định dạng, chỉ nhập số nguyên từ 1 đến N'));
			}
			else nums[x][y]=parseInt(val);
			if(val == ""&&origin_colors[x][y]==-1) colors[x][y]++;
			return ({N, nums, colors, origin_nums, origin_colors});
		},

		async changeColor(state, {x, y}) {
			let nums=state.nums, N=state.N, colors=state.colors;
			let origin_nums=state.origin_nums, origin_colors=state.origin_colors;
			colors[x][y]++;
			return ({N, nums, colors, origin_nums, origin_colors});
		}
	},

	isValid(state) {
		return true;
	},

	isEnding(state) {
		return false;
	}
};

exports.default=S28;