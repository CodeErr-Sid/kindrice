// Package Data

const packageData = {
    "1": {
        dimensions: { length: 21.5, breadth: 18.5, height: 9 },
        combinations: [
            { items: [{ weight: 1, quantity: 1 }], totalWeight: 1.90 }
        ]
    },
    "5": {
        dimensions: { length: 37.5, breadth: 36.5, height: 10 },
        combinations: [
            { items: [{ weight: 1, quantity: 3 }], totalWeight: 3.75 },
            { items: [{ weight: 5, quantity: 1 }], totalWeight: 5.60 }
        ]
    },
    "10": {
        dimensions: { length: 42.5, breadth: 40, height: 16 },
        combinations: [
            { items: [{ weight: 10, quantity: 1 }], totalWeight: 10.80 }
        ]
    },
    "20": {
        dimensions: { length: 50, breadth: 40, height: 23 },
        combinations: [
            { items: [{ weight: 1, quantity: 1 }, { weight: 5, quantity: 2 }], totalWeight: 12 },
            { items: [{ weight: 1, quantity: 2 }, { weight: 5, quantity: 2 }], totalWeight: 13 },
            { items: [{ weight: 1, quantity: 3 }, { weight: 5, quantity: 2 }], totalWeight: 14.2 },
            { items: [{ weight: 1, quantity: 1 }, { weight: 5, quantity: 1 }, { weight: 10, quantity: 1 }], totalWeight: 17 },
            { items: [{ weight: 1, quantity: 2 }, { weight: 5, quantity: 1 }, { weight: 10, quantity: 1 }], totalWeight: 18.1 },
            { items: [{ weight: 1, quantity: 3 }, { weight: 5, quantity: 1 }, { weight: 10, quantity: 1 }], totalWeight: 19.2 },
            { items: [{ weight: 1, quantity: 1 }, { weight: 10, quantity: 1 }], totalWeight: 12 },
            { items: [{ weight: 1, quantity: 2 }, { weight: 10, quantity: 1 }], totalWeight: 13 },
            { items: [{ weight: 1, quantity: 3 }, { weight: 10, quantity: 1 }], totalWeight: 14 },
            { items: [{ weight: 5, quantity: 2 }], totalWeight: 11 }, 
            { items: [{ weight: 5, quantity: 1 }, { weight: 10, quantity: 1 }], totalWeight: 16 },
            { items: [{ weight: 10, quantity: 2 }], totalWeight: 20.95 }
        ]
    }
};

export default packageData;
