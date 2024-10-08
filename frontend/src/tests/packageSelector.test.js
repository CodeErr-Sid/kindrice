import findPackageForOrder from '../api/packageSelector'; // Adjust the import path as needed
import packageData from '../api/packagesData';

const itemsArray = [
    {
        "items": [{ "weight": 1, "quantity": 1 }],
        "totalWeight": 1.90,
        "dimensions": { "length": 21.5, "breadth": 18.5, "height": 9 },
        "package": "1"
    },
    {
        "items": [{ "weight": 1, "quantity": 3 }],
        "totalWeight": 3.75,
        "dimensions": { "length": 37.5, "breadth": 36.5, "height": 10 },
        "package": "5"
    },
    {
        "items": [{ "weight": 5, "quantity": 1 }],
        "totalWeight": 5.60,
        "dimensions": { "length": 37.5, "breadth": 36.5, "height": 10 },
        "package": "5"
    },
    {
        "items": [{ "weight": 10, "quantity": 1 }],
        "totalWeight": 10.80,
        "dimensions": { "length": 42.5, "breadth": 40, "height": 16 },
        "package": "10"
    },
    {
        "items": [{ "weight": 5, "quantity": 2 }, { "weight": 1, "quantity": 1 }],
        "totalWeight": 12,
        "dimensions": { "length": 50, "breadth": 40, "height": 23 },
        "package": "20"
    },
    {
        "items": [{ "weight": 5, "quantity": 2 }, { "weight": 1, "quantity": 2 }],
        "totalWeight": 13,
        "dimensions": { "length": 50, "breadth": 40, "height": 23 },
        "package": "20"
    },
    {
        "items": [{ "weight": 5, "quantity": 2 }, { "weight": 1, "quantity": 3 }],
        "totalWeight": 14.2,
        "dimensions": { "length": 50, "breadth": 40, "height": 23 },
        "package": "20"
    },
    {
        "items": [{ "weight": 10, "quantity": 1 }, { "weight": 1, "quantity": 1 }, { "weight": 5, "quantity": 1 }],
        "totalWeight": 17,
        "dimensions": { "length": 50, "breadth": 40, "height": 23 },
        "package": "20"
    },
    {
        "items": [{ "weight": 10, "quantity": 1 }, { "weight": 5, "quantity": 1 }, { "weight": 1, "quantity": 2 }],
        "totalWeight": 18.1,
        "dimensions": { "length": 50, "breadth": 40, "height": 23 },
        "package": "20"
    },
    {
        "items": [{ "weight": 10, "quantity": 1 }, { "weight": 5, "quantity": 1 }, { "weight": 1, "quantity": 3 }],
        "totalWeight": 19.2,
        "dimensions": { "length": 50, "breadth": 40, "height": 23 },
        "package": "20"
    },
    {
        "items": [{ "weight": 10, "quantity": 1 }, { "weight": 1, "quantity": 1 }],
        "totalWeight": 12,
        "dimensions": { "length": 50, "breadth": 40, "height": 23 },
        "package": "20"
    },
    {
        "items": [{ "weight": 10, "quantity": 1 }, { "weight": 1, "quantity": 2 }],
        "totalWeight": 13,
        "dimensions": { "length": 50, "breadth": 40, "height": 23 },
        "package": "20"
    },
    {
        "items": [{ "weight": 10, "quantity": 1 }, { "weight": 1, "quantity": 3 }],
        "totalWeight": 14,
        "dimensions": { "length": 50, "breadth": 40, "height": 23 },
        "package": "20"
    },
    {
        "items": [{ "weight": 5, "quantity": 2 }],
        "totalWeight": 11,
        "dimensions": { "length": 50, "breadth": 40, "height": 23 },
        "package": "20"
    },
    {
        "items": [{ "weight": 10, "quantity": 1 }, { "weight": 5, "quantity": 1 }],
        "totalWeight": 16,
        "dimensions": { "length": 50, "breadth": 40, "height": 23 },
        "package": "20"
    },
    {
        "items": [{ "weight": 10, "quantity": 2 }],
        "totalWeight": 20.95,
        "dimensions": { "length": 50, "breadth": 40, "height": 23 },
        "package": "20"
    }
]



describe('findPackageForOrder - All weight tests', () => {

    // Case 1: Single product and quantity
    describe('Case 1: Single product and quantity', () => {
        for (let item of itemsArray) {
            const weights = item.items;
            if (weights.length === 1 && weights[0].quantity === 1) {
                const combinationString = `${weights[0].weight} x ${weights[0].quantity}`;

                it(`should return correct package details for ${combinationString}`, () => {
                    const orderItems = weights;
                    const result = findPackageForOrder(orderItems);

                    expect(result).toEqual({
                        package: item.package,
                        dimensions: item.dimensions,
                        totalWeight: item.totalWeight
                    });
                });
            }
        }
    });

    // Case 2: Multiple quantities of a single product
    describe('Case 2: Multiple quantities of a single product', () => {
        for (let item of itemsArray) {
            const weights = item.items;
            if (weights.length === 1 && weights[0].quantity > 1) {
                const combinationString = `${weights[0].weight} x ${weights[0].quantity}`;

                it(`should return correct package details for ${combinationString}`, () => {
                    const orderItems = weights;
                    const result = findPackageForOrder(orderItems);

                    expect(result).toEqual({
                        package: item.package,
                        dimensions: item.dimensions,
                        totalWeight: item.totalWeight
                    });
                });
            }
        }
    });

    // Case 3: Multiple products with a single quantity each
    describe('Case 3: Multiple products with a single quantity each', () => {
        for (let item of itemsArray) {
            const weights = item.items;
            if (weights.length > 1 && weights.every(w => w.quantity === 1)) {
                const combinationString = weights.map(w => `${w.weight} x ${w.quantity}`).join(' + ');

                it(`should return correct package details for ${combinationString}`, () => {
                    const orderItems = weights;
                    const result = findPackageForOrder(orderItems);

                    expect(result).toEqual({
                        package: item.package,
                        dimensions: item.dimensions,
                        totalWeight: item.totalWeight
                    });
                });
            }
        }
    });

    // Case 4: Multiple products and multiple quantities
    describe('Case 4: Multiple products and multiple quantities', () => {
        for (let item of itemsArray) {
            const weights = item.items;
            if (weights.length > 1 && weights.some(w => w.quantity > 1)) {
                const combinationString = weights.map(w => `${w.weight} x ${w.quantity}`).join(' + ');

                it(`should return correct package details for ${combinationString}`, () => {
                    const orderItems = weights;
                    const result = findPackageForOrder(orderItems);

                    expect(result).toEqual({
                        package: item.package,
                        dimensions: item.dimensions,
                        totalWeight: item.totalWeight
                    });
                });
            }
        }
    });
});



