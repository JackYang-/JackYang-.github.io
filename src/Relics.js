import React from 'react';

class Relics extends React.Component {
	constructor(props) {
		super(props);

		//this.fragments = props.fragments;
		//this.propagateChanges = props.handleChange;

		// this.state = {
		// 	unlocked: props.unlocked
		// };

		this.state = {
			showCombat: true,
			showSkilling: true,
			showHarvesting: true,
			showProduction: true,
			showMisc: true
		};
	}

	shouldShow = (fragment) => {
		return (fragment.type === 'Combat' && this.state.showCombat)
		|| (fragment.type === 'Skilling' && this.state.showSkilling)
		|| (fragment.type === 'Harvesting' && this.state.showHarvesting)
		|| (fragment.type === 'Production' && this.state.showProduction)
		|| (fragment.type === 'Miscellaneous' && this.state.showMisc);
	};

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
		currentUnlocked[event.target.getAttribute('index')] = event.target.checked;
		this.props.handleChange(currentUnlocked);
	};

	flipFilter = (event) => {
		const field = event.target.getAttribute('field');
		if (field === 'Combat') {
			this.setState({showCombat: !this.state.showCombat});
		} else if (field === 'Skilling') {
			this.setState({showSkilling: !this.state.showSkilling});
		} else if (field === 'Harvesting') {
			this.setState({showHarvesting: !this.state.showHarvesting});
		} else if (field === 'Production') {
			this.setState({showProduction: !this.state.showProduction});
		} else if (field === 'Miscellaneous') {
			this.setState({showMisc: !this.state.showMisc});
		}
	}


	render() {

		const fragmentsList = this.props.fragments.map((fragment, index) => 
			<div className={"fragment" + (!this.shouldShow(fragment) ? " filtered" : "")} key={index}>
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
			<div className="content-top">
				<button className="fragment-buttons" onClick={this.clearAll}>Clear All Relics</button>
				<button className="fragment-buttons" onClick={this.selectAll}>Select All Relics</button>
				<div className="fragment-filters">
					<div className="filter-type" >
						<input type="checkbox" field="Combat" defaultChecked={this.state.showCombat} onChange={this.flipFilter} />
						<p>Combat</p>
					</div>
					<div className="filter-type">
						<input type="checkbox" field="Skilling" defaultChecked={this.state.showSkilling} onChange={this.flipFilter} />
						<p>Skilling</p>
					</div>
					<div className="filter-type">
						<input type="checkbox" field="Harvesting" defaultChecked={this.state.showHarvesting} onChange={this.flipFilter} />
						<p>Harvesting</p>
					</div>
					<div className="filter-type">
						<input type="checkbox" field="Production" defaultChecked={this.state.showProduction} onChange={this.flipFilter} />
						<p>Production</p>
					</div>
					<div className="filter-type">
						<input type="checkbox" field="Miscellaneous" defaultChecked={this.state.showMisc} onChange={this.flipFilter} />
						<p>Miscellaneous</p>
					</div>
				</div>
			</div>
			<div className="fragmentList">
				{fragmentsList}
			</div>
		</div>);
	}
}

export default Relics;