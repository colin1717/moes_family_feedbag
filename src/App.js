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
		console.log(`rawInteraction: ${JSON.stringify(rawInteraction)}`)

		const interaction = {};

		interaction["transactionDate"] = this.findElement(rawInteraction, "TransactionDate");
		interaction["emailAddress"] = this.findElement(rawInteraction, "EmailAddress");
		interaction["locale"] = this.findElement(rawInteraction, "Locale");
		interaction["userName"] = this.findElement(rawInteraction, "UserName");
		interaction["deploymentZone"] = this.findElement(rawInteraction, "DeploymentZone");
		interaction["userId"] = this.findElement(rawInteraction, "UserID");
		interaction['products'] = this.findProducts(rawInteraction);
		

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

//this returns a formatted array of Maps that contain each piece of product info
findProducts(rawInteraction){
  let finalProductArr = [] 
  for (let key of rawInteraction){
    if(key['name'] === "Products") {
      let productsArr = key['children']
      
      for (let singleComplexProductArr of productsArr ) {
       // console.log(singleComplexProductArr['children'])
        let singleProduct = new Map()
        for (let singleProductArr of singleComplexProductArr['children']) {
          console.log(singleProductArr)
          
          singleProductArr['name'] === "ExternalId" ? singleProduct["externalId"] = singleProductArr['value'] : singleProduct["externalId"] = undefined
          singleProductArr['name'] === "ImageUrl" ? singleProduct['imageUrl'] = singleProductArr['value'] : singleProduct['imageUrl'] = undefined
          singleProductArr['name'] === "Name" ? singleProduct['name'] = singleProductArr['value'] : singleProduct['name'] = undefined
          singleProductArr['name'] === "Price" ? singleProduct['price'] = singleProductArr['value'] : singleProduct['price'] = undefined
            console.log(singleProduct)
         
          finalProductArr.push(singleProduct) 
            
        }
        console.log('==============================')

      }
    }
  }
  console.log(`finalProductArr: ${JSON.stringify(finalProductArr)}`)
  return finalProductArr;
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
