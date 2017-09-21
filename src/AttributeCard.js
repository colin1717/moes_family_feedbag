import React from 'react';

class AttributeCard extends React.Component {
	render() {
		return(
			<div>
				<div className="atr-card">{this.props.value}</div>
			</div>
			)
	}
}

export default AttributeCard;