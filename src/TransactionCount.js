import React from 'react';

class TransactionCount extends React.Component {
	render () {
		return (
			<div className="transactions-count-card">
        <div className="transactions-count">{this.props.count}</div>
        <hr className="hr-score"/>
        <span className="transactions-title">Transactions</span>
      </div>
			)
	}
}

export default TransactionCount;