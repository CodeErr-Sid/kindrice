// Mapping of weight categories to package dimensions
const packages = {
    1: { length: 10, breadth: 9.25, height: 1.75 },
    5: { length: 14.25, breadth: 13.5, height: 3.5 },
    10: { length: 16, breadth: 15, height: 5.5 },
    20: { length: 41, breadth: 29, height: 27 }
};

// Function to select package dimensions based on weight
const packageSelector = (weight) => {
    // Find the largest package key that is greater than or equal to the weight
    const applicableKey = Object.keys(packages)
        .map(Number) // Convert keys to numbers
        .filter(key => weight <= key) // Filter keys based on weight
        .sort((a, b) => a - b) // Sort in ascending order
        .shift(); // Get the first (smallest) key

    // Return the corresponding package dimensions or null if none found
    return applicableKey ? packages[applicableKey] : null;
};

export default packageSelector;