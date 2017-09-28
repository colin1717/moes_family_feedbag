import React from 'react';

class TransactionCount extends React.Component {
	render () {
		return (
			<div className="transactions-count-card">
        <div className="transactions-count">{this.props.count}</div>
        <span className="transactions-title">Transactions</span>
        <hr className="hr-score"/>
        <div className="transactions-count">17</div>
        <span className="transactions-title">Have Products Defined</span>
      </div>
			)
	}
}

export default TransactionCount;