//this takes one rawInteraction from the PIE feed json and returns it formatted pretty
export function	buildInteraction(rawInteraction) {

	const interaction = {};

	interaction["transactionDate"] = findElement(rawInteraction, "TransactionDate");
	interaction["emailAddress"] = findElement(rawInteraction, "EmailAddress");
	interaction["locale"] = findElement(rawInteraction, "Locale");
	interaction["userName"] = findElement(rawInteraction, "UserName");
	interaction["deploymentZone"] = findElement(rawInteraction, "DeploymentZone");
	interaction["userId"] = findElement(rawInteraction, "UserID");
	interaction['products'] = findProducts2(rawInteraction);
	

	return interaction;
}

//below methods find values from the PIE feed and return them
//rawElement here is the raw element name from the PIE feed
export function findElement(rawInteraction, rawElement) {
	for (let key of rawInteraction) {
		if (key['name'] === rawElement){
			return key["value"];
		}
	}
}

//this returns a formatted array of objects that contain each piece of product info
export function findProducts2(rawInteraction){
  let finalProductArr = [];
  for (let key of rawInteraction){
    if(key['name'] === "Products") {
      let productsArr = key['children']
      
      for (let singleComplexProductArr of productsArr ) {
        let singleProduct = {}
        for (let singleProductArr of singleComplexProductArr['children']) {

        	if (singleProductArr['name'] === "ExternalId") {
        		singleProduct['externalId'] = singleProductArr['value']
        	}
          
          if (singleProductArr['name'] === "ImageUrl") {
          	singleProduct['imageUrl'] = singleProductArr['value']
          }

          if (singleProductArr['name'] === "Name") {
          	singleProduct['name'] = singleProductArr["value"]
          }
          
          if (singleProductArr['name'] === "Price") {
          	singleProduct['price'] = singleProductArr['value']
          }

        }
        finalProductArr.push(singleProduct) 
      }
    }
  }
  return finalProductArr;
}