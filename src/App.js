import React, { Component } from 'react';
import FeedInput from './FeedInput';
import TransactionCount from './TransactionCount';
import AttributeCard from './AttributeCard';

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
		console.log('App.js component')
		let interactions = []
		for (let rawInteraction of pieFeedJson["children"]) {
			interactions.push(this.buildInteraction(rawInteraction["children"]))
		}
		console.log(interactions);

		this.setState({ interactions: interactions})
	}


	//this takes one rawInteraction from the PIE feed json and returns it formatted pretty
	buildInteraction(rawInteraction) {
		const interaction = {};

		interaction["transactionDate"] = this.findElement(rawInteraction, "TransactionDate");
		interaction["emailAddress"] = this.findElement(rawInteraction, "EmailAddress");
		interaction["locale"] = this.findElement(rawInteraction, "Locale");
		interaction["userName"] = this.findElement(rawInteraction, "UserName");
		interaction["deploymentZone"] = this.findElement(rawInteraction, "DeploymentZone");
		interaction["userId"] = this.findElement(rawInteraction, "UserID");

		// this.findProducts(interactions);

		return interaction;
	}



//below methods find values from the PIE feed and return them
//rawElement here is the raw element name from the PIE feed
	findElement(rawInteraction, rawElement) {
		for (let key of rawInteraction) {
			if (key['name'] === rawElement){
				return key["value"];
			}
		}
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

//right now this is console loging each exteranl ID in the products array
	findProducts(rawInteraction){
		for (let key of rawInteraction){
			if (key["name"] === "Products") {
				let productsArray = [];
				
				for (let productArr of key["children"]){
					console.log(`productArr children: $productArr["children"]} `)

					for (let product of productArr["children"]){
						
						if (product["name"] === "ExternalId"){
							console.log(product["value"])
						}
					}
				}

				
			}
		}
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
				          <TransactionCount count={this.state.interactions.length}/>
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
				  </section>

      </div>

    );
  }
}

export default App;
