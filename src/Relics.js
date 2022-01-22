import React from 'react';

class Relics extends React.Component {
	constructor(props) {
		super(props);

		//this.fragments = props.fragments;
		//this.propagateChanges = props.handleChange;

		// this.state = {
		// 	unlocked: props.unlocked
		// };
	}

	clearAll = (event) => {
		const emptyList = new Array(this.props.unlocked.length).fill(false);
		//console.log(emptyList);
		this.props.handleChange(emptyList);
		this.setState(this.state);
	};

	selectAll = (event) => {
		const fullList = new Array(this.props.unlocked.length).fill(true);
		//console.log(fullList);
		this.props.handleChange(fullList);
	};

	handleChange = (event) => {
		const currentUnlocked = [...this.props.unlocked];
		//console.log(event.target.getAttribute('index'), event.target.checked);
		currentUnlocked[event.target.getAttribute('index')] = event.target.checked;
		this.props.handleChange(currentUnlocked);
		//this.setState({unlocked: currentUnlocked});
	};

	//PAD TOP AND BOTTOM TO VERTICALLY CENTER???
	//SCALE SIZE OF CHECKBOX IN CSS

	render() {

		const fragmentsList = this.props.fragments.map((fragment, index) => 
			<div className="fragment" key={index}>
				<div className="checkbox">
					<input key={Math.random()} type="checkbox" index={index} defaultChecked={this.props.unlocked[index]} onChange={this.handleChange} />
				</div>
				<div className="info">
					<div><b>{fragment.name}</b> [{fragment.type}]</div>
					<div>{fragment.effects}</div>
				</div>
			</div>
		);

		return (<div>
			<div>
				<button className="fragment-buttons" onClick={this.clearAll}>Clear All</button>
				<button className="fragment-buttons" onClick={this.selectAll}>Select All</button>
			</div>
			<div className="fragmentList">
				{fragmentsList}
			</div>
		</div>);
	}
}

export default Relics;