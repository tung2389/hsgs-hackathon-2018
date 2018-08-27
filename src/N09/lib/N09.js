"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var N09={
	default (props={N: 5}) {
		// Init
		// N=number of numbers;
		// num=list of numbers, the last one is the result;
		// oper=(0 1 2 3) ~ (+ - * /) not necessary because we will check last *res* with last *num* so just leave it as N times 0;
		// initial *res*=prefix summation of *num*;
		// random num then calculate res
		let N=props.N, num=[], oper=[], res=[], now, tmp, ans=[];
		num.push(Math.round(Math.random()*49)+1);
		oper.push(-1);
		ans.push(0);
		now=num[0];
		for(let i=1;i<N-1;i++) {
			oper.push(-1);
			tmp=Math.floor(Math.random()*4);
			ans.push(tmp);
			switch(tmp) {
				case 0:
					num.push(Math.round(Math.random()*49)+1);
					now+=num[i];
					break;
				case 1:
					if(now<6) {
						ans.pop();
						oper.pop();
						i--;
					}
					else {
						num.push(Math.floor(Math.random()*(now-1)+1));
						now-=num[i];
					}
					break;
				case 2:
					num.push(Math.round(Math.random()*29)+1);
					now*=num[i];
					break;
				case 3:
					let d=[];
					for(let j=1;j<=now;j++){
						if(now%j==0) d.push(j);
					}
					num.push(d[Math.floor(Math.random()*d.length)]);
					now/=num[i];
					break;
			}
		}
		num.push(now);
		for(let i=1;i<N;i++) {
			res.push(-1);
		}
		return ({N, num, oper, res, ans});
	},

	actions: {
		async changeo(state, {pos}) { //change an operation and recalculate the whole array
			let oper=state.oper, N=state.N, num=state.num, res=[], now=0, ans=state.ans;
			oper[pos]++;
			for(let i=0;i<N-1;i++) {
				switch(oper[i]%4) {
					case 0:
						now+=num[i];
						break;
					case 1:
						if(now-num[i]<0) {
							now*=num[i];
							oper[i]=2;
						}
						else now-=num[i];
						break;
					case 2:
						now*=num[i];
						break;
					case 3:
						if(now%num[i]>0) {
							now+=num[i];
							oper[i]=0;
						}
						else now/=num[i];
						break;
				}
				res.push(now);
			}
			return ({N, num, oper, res, ans});
		},

		// Change to knob so no need to use these commented functions
		// async inN(state) { 
		// 	let N=state.N+1 , num=[], oper=[], res=[], now, tmp, ans=[];
		// 	num.push(Math.round(Math.random()*49)+1);
		// 	oper.push(-1);
		// 	ans.push(0);
		// 	now=num[0];
		// 	for(let i=1;i<N-1;i++) {
		// 		oper.push(-1);
		// 		tmp=Math.floor(Math.random()*4);
		// 		ans.push(tmp);
		// 		switch(tmp) {
		// 			case 0:
		// 				num.push(Math.round(Math.random()*49)+1);
		// 				now+=num[i];
		// 				break;
		// 			case 1:
		// 				if(now<6) {
		// 					ans.pop();
		// 					oper.pop();
		// 					i--;
		// 				}
		// 				else {
		// 					num.push(Math.floor(Math.random()*now));
		// 					now-=num[i];
		// 				}
		// 				break;
		// 			case 2:
		// 				num.push(Math.round(Math.random()*29));
		// 				now*=num[i];
		// 				break;
		// 			case 3:	
		// 				let d=[];
		// 				for(let j=1;j<=now;j++){
		// 					if(now%j==0) d.push(j);
		// 				}
		// 				num.push(d[Math.floor(Math.random()*d.length)]);
		// 				now/=num[i];
		// 				break;
		// 		}
		// 	}
		// 	num.push(now);
		// 	for(let i=1;i<N;i++) {
		// 		res.push(-1);
		// 	}
		// 	return ({N, num, oper, res, ans});
		// },

		// async deN(state) {
		// 	let N=state.N-1 , num=[], oper=[], res=[], now, tmp, ans=[];
		// 	if(N<4) N=4;
		// 	num.push(Math.round(Math.random()*49)+1);
		// 	oper.push(-1);
		// 	ans.push(0);
		// 	now=num[0];
		// 	for(let i=1;i<N-1;i++) {
		// 		oper.push(-1);
		// 		tmp=Math.floor(Math.random()*4);
		// 		ans.push(tmp);
		// 		switch(tmp) {
		// 			case 0:
		// 				num.push(Math.round(Math.random()*49)+1);
		// 				now+=num[i];
		// 				break;
		// 			case 1:
		// 				if(now<6) {
		// 					ans.pop();
		// 					oper.pop();
		// 					i--;
		// 				}
		// 				else {
		// 					num.push(Math.floor(Math.random()*now));
		// 					now-=num[i];
		// 				}
		// 				break;
		// 			case 2:
		// 				num.push(Math.round(Math.random()*29));
		// 				now*=num[i];
		// 				break;
		// 			case 3:	
		// 				let d=[];
		// 				for(let j=1;j<=now;j++){
		// 					if(now%j==0) d.push(j);
		// 				}
		// 				num.push(d[Math.floor(Math.random()*d.length)]);
		// 				now/=num[i];
		// 				break;
		// 		}
		// 	}
		// 	num.push(now);
		// 	for(let i=1;i<N;i++) {
		// 		res.push(-1);
		// 	}
		// 	return ({N, num, oper, res, ans});
		// },

		async ans(state) { //show answer
			let N=state.N, num=state.num, oper=state.ans, res=[], ans=state.ans, now=0;
			for(let i=0;i<N-1;i++) {
				switch(oper[i]%4) {
					case 0:
						now+=num[i];
						break;
					case 1:
						if(now-num[i]<0) {
							now*=num[i];
							oper[i]=2;
						}
						else now-=num[i];
						break;
					case 2:
						now*=num[i];
						break;
					case 3:
						if(now%num[i]>0) {
							now+=num[i];
							oper[i]=0;
						}
						else now/=num[i];
						break;
				}
				res.push(now);
			}
			return ({N, num, oper, res, ans});
		}
	},

	isValid(state) {
		return true;
	},

	isEnding(state) {
		if(state.res[state.N-2]==state.num[state.N-1]) return true;
		else return false;
		return null;
	}
};

exports.default=N09;