import packageData from "./packageData.js";

const fetchPackageForOrder = (itemsArray) => {

    // Convert itemsArray to a string format to easily compare with combinations in packageData
    const itemsString = JSON.stringify(itemsArray.sort((a, b) => a.weight - b.weight));

    // Iterate through the packageData to find the correct package for the given combination
    for (let packageKey in packageData) {
        const { dimensions, combinations } = packageData[packageKey];

        // Iterate through each combination in the current package
        for (let combo of combinations) {
            // Sort the combo items by weight to match the sorted itemsArray string
            const comboString = JSON.stringify(combo.items.sort((a, b) => a.weight - b.weight));

            // Compare the sorted comboString with the sorted itemsArray string
            if (comboString === itemsString) {

                // console.log({
                //     packageCategory: packageKey,
                //     totalWeight: combo.totalWeight,
                //     dimensions: dimensions
                // })
                // If a match is found, return the package details
                return {
                    packageCategory: packageKey,
                    totalWeight: combo.totalWeight,
                    dimensions: dimensions
                };
            }
        }
    }

    // If no matching package is found, return null or an error message
    return null;
}



export default fetchPackageForOrder