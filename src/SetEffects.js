import React from 'react';

class SetEffects extends React.Component {
	constructor(props) {
		super(props);

		//console.log(props);

		//this.fragments = props.fragments;
		//this.setEffects = props.setEffects;

		//console.log(this.setEffects);

		this.state = {
			showLocked: true,
			showUnlocked: true
		};
	}

	flipShowLocked = (event) => {
		this.setState({showLocked: !this.state.showLocked});
	};

	flipShowUnlocked = (event) => {
		this.setState({showUnlocked: !this.state.showUnlocked});
	};

	render() {
		const fragReqs = (reqFragsList) => {
			return reqFragsList.map((id) =>
				<div key={id} className={this.props.unlocked[id] ? 'unlocked' : 'locked-faint'}>
					{/*<input type="checkbox" checked={this.props.unlocked[id]} />*/}
					{this.props.fragments[id].name}
				</div>
			);
		};

		const setList = this.props.setEffects.map((setEffect) => {
			let numUnlocked = 0;
			for (const id of setEffect.reqFragsList) {
				//console.log('checking', id);
				if (this.props.unlocked[id]) {
					numUnlocked ++;
				}
			}

			return(<div className={"setEffect" + ((numUnlocked >= setEffect.reqNum && !this.state.showUnlocked) || (numUnlocked < setEffect.reqNum && !this.state.showLocked) ? ' filtered': '')} key={setEffect.name}>
					<div className={(numUnlocked >= setEffect.reqNum ? 'unlocked' : 'locked')}>
						<b>{setEffect.name}
						<p>
							&nbsp;&nbsp;{'[' + numUnlocked + ' / ' + setEffect.reqNum + ']'}
						</p>
						</b>
					</div>
					<div>{setEffect.effects}</div>
					<div>{fragReqs(setEffect.reqFragsList)}</div>
			</div>);
		});

		return (<div>
			<div className="content-top">
				<div className="filter-type">
					<input type="checkbox" defaultChecked={this.state.showLocked} onChange={this.flipShowLocked} />
					<p>Unavailable Set Effects</p>
				</div>
				<div className="filter-type">
					<input type="checkbox" defaultChecked={this.state.showLocked} onChange={this.flipShowUnlocked} />
					<p>Available Set Effects</p>
				</div>
			</div>
			{setList}
		</div>);
	}
}

export default SetEffects;