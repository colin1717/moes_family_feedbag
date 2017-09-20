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

	addPieFeed(pieFeed) {
		const interaction = {};

		console.log('addPieFeed is running');
		this.setState({ pieFeed: pieFeed });


		//interactions here is one interaction from the PIE feed
		let interactions = pieFeed["children"][0]["children"];
		console.log(interactions);

		interaction["transactionDate"] = this.findTransactionDate(interactions);
		interaction["emailAddress"] = this.findEmailAddress(interactions);
		interaction["locale"] = this.findLocale(interactions);
		interaction["userName"] = this.findUserName(interactions);
		interaction["deploymentZone"] = this.findDeploymentZone(interactions);
		interaction["userId"] = this.findUserId(interactions);

		// this.findProducts(interactions);

		console.log(interaction);
	}

	findTransactionDate(interactions) {
				for (let key of interactions) {
			if (key["name"] === "TransactionDate"){
				// console.log(`Here's the transactionDate: ${key["value"]}`);
				// interaction.set("transactionDate", key["value"]);
				return key["value"]
			} 
		}
	}

	findEmailAddress(interactions){
		for (let key of interactions) {
			if (key["name"] === "EmailAddress"){
				return key["value"]
			}
		}
	}

	findLocale(interactions){
		for (let key of interactions){
			if (key["name"] === "Locale"){
				return key["value"]
			}
		}
	}

	findUserName(interactions){
		for (let key of interactions){
			if (key["name"] === "UserName"){
				return key["value"]
			}
		}
	} 

	findDeploymentZone(interactions){
		for (let key of interactions){
			if (key["name"] === "DeploymentZone"){
				return key["value"]
			}
		}
	}

	findUserId(interactions){
		for (let key of interactions){
			if (key["name"] === "UserID") {
				return key["value"]
			}
		}
	}


	//right now this is console loging each exteranl ID in the products array
	findProducts(interactions){
		for (let key of interactions){
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
        <FeedInput pieFeed={this.addPieFeed.bind(this)}/>
      </div>
    );
  }
}

export default App;
