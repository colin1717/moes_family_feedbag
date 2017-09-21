import React, { Component } from 'react';
import FeedInput from './FeedInput';

import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			interactions: []
		}
	}

	//this builds an array of pretty formatted interaction and saves it to state
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

		interaction["transactionDate"] = this.findTransactionDate(rawInteraction);
		interaction["emailAddress"] = this.findEmailAddress(rawInteraction);
		interaction["locale"] = this.findLocale(rawInteraction);
		interaction["userName"] = this.findUserName(rawInteraction);
		interaction["deploymentZone"] = this.findDeploymentZone(rawInteraction);
		interaction["userId"] = this.findUserId(rawInteraction);

		// this.findProducts(interactions);

		return interaction;
	}



	//below methods find values from the PIE feed and return them
	findTransactionDate(rawInteraction) {
		for (let key of rawInteraction) {
			if (key['name'] === "TransactionDate"){
				return key["value"]
			}
		} 
	}

	findEmailAddress(rawInteraction){
		for (let key of rawInteraction) {
			if (key["name"] === "EmailAddress"){
				return key["value"]
			}
		}
	}

	findLocale(rawInteraction){
		for (let key of rawInteraction){
			if (key["name"] === "Locale"){
				return key["value"]
			}
		}
	}

	findUserName(rawInteraction){
		for (let key of rawInteraction){
			if (key["name"] === "UserName"){
				return key["value"]
			}
		}
	} 

	findDeploymentZone(rawInteraction){
		for (let key of rawInteraction){
			if (key["name"] === "DeploymentZone"){
				return key["value"]
			}
		}
	}

	findUserId(rawInteraction){
		for (let key of rawInteraction){
			if (key["name"] === "UserID") {
				return key["value"]
			}
		}
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

	findProductExternalId(){

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
				          <div className="transactions-count-card">
				            <div className="transactions-count">17</div>
				            <hr className="hr-score"/>
				            <span className="transactions-title">Transactions</span>
				          </div>
				        </div>
				        <div className="col-sm-4">
				          <div className="atr-card">100% Email</div>
				          <div className="atr-card">100% User Name</div>
				          <div className="atr-card">100% User Id</div>
				        </div>
				        <div className="col-sm-4">
				          <div className="atr-card">100% Transaction Date</div>
				          <div className="atr-card">100% Deployment Zone</div>
				          <div className="atr-card">100% Locale</div>
				        </div>
				      </div>
				    </div>
				  </section>

      </div>

    );
  }
}

export default App;
