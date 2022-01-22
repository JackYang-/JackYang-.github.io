import React from 'react';

class SetEffects extends React.Component {
	constructor(props) {
		super(props);

		//console.log(props);

		//this.fragments = props.fragments;
		//this.setEffects = props.setEffects;

		//console.log(this.setEffects);
	}

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

			return(<div className="setEffect" key={setEffect.name}>
				<div className={numUnlocked >= setEffect.reqNum ? 'unlocked' : 'locked'}>
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
			{setList}
		</div>);
	}
}

export default SetEffects;