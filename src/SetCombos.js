import React from 'react';

class SetCombos extends React.Component {
	constructor(props){
		super(props);
		//console.log(this.props);
		//this.numCombos = 0;
		this.comboSatisfied = false;
		this.state = {
			availableSetCombos: [],
			availableSetComboFrags: [],
			buttonPressed: false,
			selectedSet: 0,
			selectedComboSize: 2
		}
	}

	handleCompute = () => {
		this.availableSetCombos = [];
		this.availableSetComboFrags = [];
		//this.computeSetCombos(0, [], 2, parseInt(this.props.slots));
		//console.log(this.state.selectedComboSize, this.state.selectedSet);
		this.computeSetCombos(0, [this.props.setEffects[this.state.selectedSet]], parseInt(this.state.selectedComboSize), parseInt(this.props.slots));
		this.setState({
			availableSetCombos: this.availableSetCombos,
			availableSetComboFrags: this.availableSetComboFrags,
			buttonPressed: true
		});
	}

	containsGroup = (setList, set) => {
		for (const item of setList) {
			if (set.groupId === item.groupId) {
				return true;
			}
		}
		return false;
	}

	findGoodCombinations = (fragsList, index, fragsSoFar, valueMatrixSoFar, comboSize, goalMatrix) => {
		if (this.comboSatisfied) {
			return;
		}

		let satisfied = true;
		for (let i = 0; i < valueMatrixSoFar.length; i ++) {
			if (valueMatrixSoFar[i] < goalMatrix[i]) {
				satisfied = false;
				break;
			}
		}

		if (satisfied) {
			// let combo = '';
			// for (const set of this.currentSetCombo) {
			// 	combo += set.name + ',';
			// }
			// console.log('combo:', combo);
			// combo = '';
			// for (const frag of fragsSoFar) {
			// 	combo += this.props.fragments[frag.fragId].name + ',';
			// }
			// console.log('fragments:', combo);

			this.availableSetCombos.push(this.currentSetCombo);
			this.availableSetComboFrags.push(fragsSoFar);
			this.comboSatisfied = true;
		} else if (fragsSoFar.length === comboSize) {
			return;
		} else {
			for (let i = index; i < fragsList.length; i ++) {
				const valueMatrixSoFarCopy = [...valueMatrixSoFar];
				for (let j = 0; j < fragsList[i].matrix.length; j ++) {
					valueMatrixSoFarCopy[j] += fragsList[i].matrix[j];
				}
				this.findGoodCombinations(fragsList, i + 1, [...fragsSoFar, fragsList[i]], valueMatrixSoFarCopy, comboSize, goalMatrix);
			}
		}
	}

	computeSetCombos = (index, setsSoFar, comboSize, numSlots) => {
		if (setsSoFar.length === comboSize) {

			//building requirement matrix
			//example, if 3 sets A B C each require 4 5 3 relics respectively, then the req matrix is [4, 5, 3]
			//the req matrix matches setsSoFar
			const reqMatrix = new Array(setsSoFar.length);
			//satisfactionReq will be used to determine if the set effect is even possible in the first place
			let satisfactionReq = 0;
			for (let i = 0; i < reqMatrix.length; i ++) {
				reqMatrix[i] = setsSoFar[i].reqNum;
				satisfactionReq += setsSoFar[i].reqNum;
			}

			//satisfactionMatrix will be used to find the number of overlapping fragments in the set list
			const satisfactionMatrix = new Array(this.props.fragments.length).fill(0);

			//building the fragment matrix
			//each fragment may satisfy some of the required sets
			//if there are 3 fragments X Y Z, and X satisfies A and B, Y satisfies nothing, and Z satifies only C
			//then the fragment matrix will be [[1, 1, 0], [0, 0, 0], [0, 0, 1]]
			const fragCounts = new Array(this.props.fragments.length);
			for (let i = 0; i < fragCounts.length; i ++) {
				fragCounts[i] = new Array(setsSoFar.length).fill(0);
			}
			for (let i = 0; i < setsSoFar.length; i ++) {
				const set = setsSoFar[i];
				for (const frag of set.reqFragsList) {
					fragCounts[frag][i] = 1;
					satisfactionMatrix[frag] ++;
				}
			}

			//before looking for combinations to satisfy the set combination, determine if the set combination is possible first
			//the satisfaction matrix is [4, 5, 3], then we need 4+5+3=12 relics to satisfy the combination
			//but this number can be reduced with overlapping fragments
			//since each fragment can satisfy up to 2 sets, subtract 12 by the number of overlappers to get the minimum slots needed
			//the overlappers are found inside satisfactionMatrix
			let numOverlaps = 0;
			for (let i = 0; i < satisfactionMatrix.length; i ++) {
				if (satisfactionMatrix[i] == 2 && this.props.unlocked[i]) {
					numOverlaps ++;
				}
			}
			if (numSlots < (satisfactionReq - numOverlaps)) {
				return;
			}


			//console.log(fragCounts);

			const usableFrags = [];
			for (let i = 0; i < fragCounts.length; i ++) {
				if (this.props.unlocked[i]) {
					let sum = 0;
					for (const num of fragCounts[i]) { sum += num; }
					if (sum > 0) {
						usableFrags.push({
							fragId: i,
							matrix: fragCounts[i]
						});
					}
				}
			}

			this.currentSetCombo = setsSoFar;
			this.comboSatisfied = false;
			this.findGoodCombinations(usableFrags, 0, [], new Array(comboSize).fill(0), numSlots, reqMatrix);
			// if (this.comboSatisfied) {
			// 	console.log('combo found!');
			// }
		} else {
			for (let i = index; i < this.props.setEffects.length; i ++) {
				const set = this.props.setEffects[i];
				if (!this.containsGroup(setsSoFar, set)) {
					this.computeSetCombos(i + 1, [...setsSoFar, set], comboSize, numSlots);
				}
			}
		}
	}

	handleSelectedSetChange = (event) => {
		this.setState({selectedSet: event.target.value});
	};

	handleComboSizeChange = (event) => {
		this.setState({selectedComboSize: event.target.value});
	}

	render() {
		const setSelectOptions = this.props.setEffects.map((set, index) => {
			return (<option value={index} key={index}>{set.name}</option>);
		});

		const content = this.state.availableSetCombos.map((setCombo, index) => {
			const setList = setCombo.map((set, index2) =>
				<p key={index2}>{set.name}&nbsp;{index2 < setCombo.length - 1 ? '+ ' : ''}</p>
			);
			const fragList = this.state.availableSetComboFrags[index].map((frag, index2) =>
				<p key={index2}>[{this.props.fragments[frag.fragId].name}]&nbsp;</p>
			);
			return (<div key={index} className="set-combo">
				<div><b>{setList}</b></div>
				<div>{fragList}</div>
			</div>);
		});
		return(<div>
			<div className="content-top">
				<div id="compute-selection">
					<p>Pick a starting set:</p>	
					<select className="compute-option" value={this.state.selectedSet} onChange={this.handleSelectedSetChange}>{setSelectOptions}</select>
					<p>How many sets?</p>
					<select className="compute-option" value={this.state.selectedComboSize} onChange={this.handleComboSizeChange}>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
					</select>
					<button id="compute-button" onClick={() => this.handleCompute()}>Compute Available Combinations&nbsp;</button>
					<p>{'This will be slow when you have most relics and slots unlocked for now, sorry!'}</p>
				</div>
				{this.state.buttonPressed && (!content || content.length === 0) ? 'No available combinations found' : 'Only one fragment combination will be shown per set combination (optimal combinations may not be shown)'}
			</div>
			{content}
		</div>);
	}
}

export default SetCombos;