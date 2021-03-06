import React from 'react';
import XMLParser from 'react-xml-parser';


class FeedInput extends React.Component {
	

	getFeed(event) {
		event.preventDefault();
		console.log("FeedInput component");

		//build a function to callback to save the xml
		let pieFeedData;
		const saveData = () => {
			// take output from filereader and convert it to JSON
			pieFeedData = new XMLParser().parseFromString(pieFeedData);


			this.props.buildInteractionsArray(pieFeedData);
		}

		// get file from input
		let pieFeed = this.fileInput.files[0];
		console.log(pieFeed);
		
		//open xml and assign output to a variable
		let reader = new FileReader();
		reader.onload = () => {
			pieFeedData = reader.result;
			//call the callback function
			saveData(pieFeedData)
		};

		reader.readAsText(pieFeed)

	}

	render() {
		return (
			<section>
				    <form onSubmit={this.getFeed.bind(this)}>
				      <input type="file" className="file-input" ref={(input) => {this.fileInput = input}}/>
				      <button type="submit">Submit</button>
				    </form>
			</section>
			)
	}
}

export default FeedInput;