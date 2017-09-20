import React, { Component } from 'react';
import FeedInput from './FeedInput';
import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			pieFeed: ""
		}
	}

	buildInteractionsArray(pieFeedJson){
		console.log('App.js component')
		let interactions = []
		for (let rawInteraction of pieFeedJson["children"]) {
			interactions.push(this.buildInteraction(rawInteraction["children"]))
		}
		console.log(interactions);
	}

	buildInteraction(rawInteraction) {
		const interaction = {};

		// console.log('buildInteraction is running');
		// this.setState({ pieFeed: pieFeed });


		interaction["transactionDate"] = this.findTransactionDate(rawInteraction);
		interaction["emailAddress"] = this.findEmailAddress(rawInteraction);
		interaction["locale"] = this.findLocale(rawInteraction);
		interaction["userName"] = this.findUserName(rawInteraction);
		interaction["deploymentZone"] = this.findDeploymentZone(rawInteraction);
		interaction["userId"] = this.findUserId(rawInteraction);

		// this.findProducts(interactions);

		return interaction;
	}



	//fix this !!!!!!
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
        <h1>Moe's Family Feedbag</h1>
        <br/>
        <FeedInput pieFeed={this.buildInteractionsArray.bind(this)}/>
      </div>
    );
  }
}

export default App;
