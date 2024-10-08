import packageData from "./packagesData.js";

function findPackageForOrder(orderItems) {
    for (const [packageKey, packageInfo] of Object.entries(packageData)) {
        const { possibleCombinations } = packageInfo;

        for (const combination of possibleCombinations) {
            const matches = orderItems.every(item => {
                const index = combination.weights.indexOf(item.weightCategory);
                return index !== -1 && combination.quantity[index] === item.quantity;
            });

            if (matches) {
                return {
                    packageType: packageKey,
                    dimensions: packageInfo.dimensions,
                    totalWeight: combination.totalWeight
                };
            }
        }
    }
    return null; // No matching package found
}

const orderItems = [
    { weightCategory: 10, quantity: 1 },
    { weightCategory: 5, quantity: 2 }
];

console.log(findPackageForOrder(orderItems))

export default findPackageForOrder
