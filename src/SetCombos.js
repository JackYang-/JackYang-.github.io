import React from 'react';

class SetCombos extends React.Component {
	constructor(props){
		super(props);
		console.log(this.props);
		//this.numCombos = 0;
		this.comboSatisfied = false;
		this.state = {
			availableSetCombos: [],
			availableSetComboFrags: [],
			buttonPressed: false
		}
	}

	handleCompute = () => {
		// this.setState({
		// 	availableSetCombos: [],
		// 	availableSetComboFrags: [],
		// 	buttonPressed: false
		// }, () => {
		// 	this.availableSetCombos = [];
		// 	this.availableSetComboFrags = [];
		// 	this.computeSetCombos(0, [], 2, parseInt(this.props.slots));
		// 	this.setState({
		// 		availableSetCombos: this.availableSetCombos,
		// 		availableSetComboFrags: this.availableSetComboFrags,
		// 		buttonPressed: true
		// 	});
		// });
		this.availableSetCombos = [];
		this.availableSetComboFrags = [];
		this.computeSetCombos(0, [], 2, parseInt(this.props.slots));
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
			const reqMatrix = new Array(setsSoFar.length);
			for (let i = 0; i < reqMatrix.length; i ++) {
				reqMatrix[i] = setsSoFar[i].reqNum;
			}

			const fragCounts = new Array(this.props.fragments.length);
			for (let i = 0; i < fragCounts.length; i ++) {
				fragCounts[i] = new Array(setsSoFar.length).fill(0);
			}
			// for (let i = 0; i < fragCounts.length; i ++) {
			// 	for (let j = 0; j < fragCounts[i].length; j ++) {
			// 		console.log(fragCounts[i][j]);
			// 	}
			// }
			//console.log('done');
			for (let i = 0; i < setsSoFar.length; i ++) {
				const set = setsSoFar[i];
				for (const frag of set.reqFragsList) {
					fragCounts[frag][i] = 1;
				}
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
			// 	this.numCombos += 1;
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



	render() {
		const content = this.state.availableSetCombos.map((setCombo, index) => {
			const setList = setCombo.map((set, index2) =>
				<p key={index2}>{set.name}&nbsp;{index2 < setCombo.length - 1 ? '+ ' : ''}</p>
			);
			const fragList = this.state.availableSetComboFrags[index].map((frag, index2) =>
				<p key={index2}>[{this.props.fragments[frag.fragId].name}]</p>
			);
			return (<div key={index} className="set-combo">
				<div><b>{setList}</b></div>
				<div>{fragList}</div>
			</div>);
		});
		return(<div>
			<button id="compute-button" onClick={() => this.handleCompute()}>Compute Available Set Effect Combinations&nbsp;</button>
			{this.state.buttonPressed && (!content || content.length === 0) ? 'No available combinations found' : 'For each set combination, only one fragment combination will be shown (there could be better combinations not shown)'}
			{content}
		</div>);
	}
}

export default SetCombos;