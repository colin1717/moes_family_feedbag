import React, { Component } from 'react';
import FeedInput from './FeedInput';
import TransactionCount from './TransactionCount';
import AttributeCard from './AttributeCard';
import * as parsePieFeed from './scripts/parsePieFeed';

import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			interactions: []
		}
	}

//this takes the raw JSON from PIE feed and builds an array of interactions and saves it to state
buildInteractionsArray(pieFeedJson){
	let interactions = []
	for (let rawInteraction of pieFeedJson["children"]) {
		interactions.push(parsePieFeed.buildInteraction(rawInteraction["children"]))
	}

	this.setState({ interactions: interactions})
}


//functions to calculate % for attribute cards
//element is the name of the element in the PIE feed
//devide number of interactions w/o element by total interactions
//if result is NaN return element else return the result
calcPercentage(interactions, element){
	let count = interactions.length;
	for (let interaction of interactions) {
		if (interaction[element] === undefined) {
			count -= 1;
		} 
	} 
	let result;

	isNaN(Math.floor(((count)/interactions.length) * 100)) ? result = element : result = `${Math.floor(((count)/interactions.length) * 100)}% ${element}`;

	return result;
}

//fucntion to calc the precentage of the product children elements
calcProductPercentage(interactions, element) {
	let totalProductCount = 0;
	let productsWithElementsCount = 0;
	for (let productArray of interactions) {

			for (let product of productArray['products']) {
				totalProductCount += 1

				if(product.hasOwnProperty(element)) {
					productsWithElementsCount +=1 
				}
			}

	}
	return `${productsWithElementsCount} / ${totalProductCount}`
}

//counts the number of interactions with product arrays
calcProductCount(interactions) {
	let count = interactions.length;
	for (let interaction of interactions){
		if (interaction["products"].length <= 0) {
			count -= 1;
		}
	}
	return count;
}

  render() {
    return (
      <div className="App">

          <header>
				    <div className="title">Moe's Family Feedbag</div>
				  </header>
				  <FeedInput buildInteractionsArray={this.buildInteractionsArray.bind(this)} />
				  <section className='pie-results'>
				    <div className="container">
				      <div className="row">
				        <div className="col-sm-4">
				          <TransactionCount count={this.state.interactions.length} productCount={this.calcProductCount(this.state.interactions)} />
				        </div>
				        <div className="col-sm-4">
				          <AttributeCard value={this.calcPercentage(this.state.interactions, "emailAddress")} />
				          <AttributeCard value={this.calcPercentage(this.state.interactions, "userName")} />
				          <AttributeCard value={this.calcPercentage(this.state.interactions, "userId")} />
				        </div>
				        <div className="col-sm-4">
				          <AttributeCard value={this.calcPercentage(this.state.interactions, "transactionDate")} />
				          <AttributeCard value={this.calcPercentage(this.state.interactions, "deploymentZone")} />
				          <AttributeCard value={this.calcPercentage(this.state.interactions, "locale")} />
				        </div>
				      </div>
				    </div>
				        <div className="products">
					      <div className="container">
					        <div className="row">
					          <div className="col-sm-1"></div>
					          <div className="col-sm-5">
					            <div className="product-info-card">
					              <span className="product-info-title">PIE Feed Products</span>
					              <hr className='product-score'/>
					              <span className="product-info">{this.calcProductPercentage(this.state.interactions, 'externalId')} contain External Ids</span>
					              <hr />
					              <span className="product-info">{this.calcProductPercentage(this.state.interactions, 'imageUrl')} contain PIE Feed Image URLs</span>
					              <hr />
					              <span className="product-info">{this.calcProductPercentage(this.state.interactions, 'name')} contain PIE Feed Names</span>
					              <hr />
					              <span className="product-info">{this.calcProductPercentage(this.state.interactions, 'price')} contain PIE Feed Prices</span>
					            </div>
					          </div>
					          <div className="col-sm-1"></div>
					          <div className="col-sm-5">
					          	<div className="product-info-card">
					          		<div className="product-info-title">Product Feed</div>
					          		<div className="product-score"></div>
					          	</div>
					          </div>
					        </div>
					      </div>
					    </div>
				  </section>

      </div>

    );
  }
}

export default App;
