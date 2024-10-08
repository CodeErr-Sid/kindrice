// Package Data

const packageData = {
    "1": {
        "dimensions": {
            "length": 21.5,
            "breadth": 18.5,
            "height": 9
        },
        "possibleCombinations": [
            {
                "weights": [
                    1
                ],
                "quantity": [
                    1
                ],
                "totalWeight": 1.90
            }
        ]
    },
    "5": {
        "dimensions": {
            "length": 37.5,
            "breadth": 36.5,
            "height": 10
        },
        "possibleCombinations": [
            {
                "weights": [
                    5
                ],
                "quantity": [
                    1
                ],
                "totalWeight": 5.60
            },
            {
                "weights": [
                    1
                ],
                "quantity": [
                    3
                ],
                "totalWeight": 3.75
            }
        ]
    },
    "10": {
        "dimensions": {
            "length": 42.5,
            "breadth": 40,
            "height": 16
        },
        "possibleCombinations": [
            {
                "weights": [
                    10
                ],
                "quantity": [
                    1
                ],
                "totalWeight": 10.80
            }
        ]
    },
    "20": {
        "dimensions": {
            "length": 21.5,
            "breadth": 18.5,
            "height": 9
        },
        "possibleCombinations": [
            {
                "weights": [
                    5
                ],
                "quantity": [
                    2
                ],
                "totalWeight": 11
            },
            {
                "weights": [
                    5,
                    1
                ],
                "quantity": [
                    2,
                    1
                ],
                "totalWeight": 12
            },
            {
                "weights": [
                    5,
                    1
                ],
                "quantity": [
                    2,
                    2
                ],
                "totalWeight": 13
            },
            {
                "weights": [
                    5,
                    1
                ],
                "quantity": [
                    2,
                    3
                ],
                "totalWeight": 14.2
            },
            {
                "weights": [
                    10,
                    5
                ],
                "quantity": [
                    1,
                    1
                ],
                "totalWeight": 16
            },
            {
                "weights": [
                    10,
                    5,
                    1
                ],
                "quantity": [
                    1,
                    1,
                    1
                ],
                "totalWeight": 17
            },
            {
                "weights": [
                    10,
                    5,
                    1
                ],
                "quantity": [
                    1,
                    1,
                    2
                ],
                "totalWeight": 18.1
            },
            {
                "weights": [
                    10,
                    5,
                    1
                ],
                "quantity": [
                    1,
                    1,
                    3
                ],
                "totalWeight": 19.2
            },
            {
                "weights": [
                    10
                ],
                "quantity": [
                    2
                ],
                "totalWeight": 20.95
            }
        ]
    }
}

//  package Selector 
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

export default findPackageForOrder
