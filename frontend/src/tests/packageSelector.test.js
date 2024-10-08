import findPackageForOrder from '../api/packageSelector'; // Adjust the import path as needed
import packageData from '../api/packagesData';

describe('findPackageForOrder - Single Weight Tests', () => {
    it('should return correct package details for 1kg x 1', () => {
        const orderItems = [{ weightCategory: 1, quantity: 1 }];
        const result = findPackageForOrder(orderItems);

        expect(result).toEqual({
            packageType: "1", // 1kg package
            dimensions: packageData["1"].dimensions,
            totalWeight: 1.90 // Adjust if necessary based on your logic
        });
    });

    it('should return correct package details for 5kg x 1', () => {
        const orderItems = [{ weightCategory: 5, quantity: 1 }];
        const result = findPackageForOrder(orderItems);

        expect(result).toEqual({
            packageType: "5", // 5kg package
            dimensions: packageData["5"].dimensions,
            totalWeight: 5.60 // Adjust if necessary based on your logic
        });
    });

    it('should return correct package details for 10kg x 1', () => {
        const orderItems = [{ weightCategory: 10, quantity: 1 }];
        const result = findPackageForOrder(orderItems);

        expect(result).toEqual({
            packageType: "10", // 10kg package
            dimensions: packageData["10"].dimensions,
            totalWeight: 10.80 // Adjust if necessary based on your logic
        });
    });
});

describe('findPackageForOrder - Single Weight Multiple Quantities Tests', () => {
    it('should return correct package details for 1kg x 3', () => {
        const orderItems = [{ weightCategory: 1, quantity: 3 }];
        const result = findPackageForOrder(orderItems);

        expect(result).toEqual({
            packageType: "5", // Adjust based on your logic for packing 3 x 1kg
            dimensions: packageData["5"].dimensions,
            totalWeight: packageData["5"].possibleCombinations[1].totalWeight // Adjust if necessary based on your logic
        });
    });

    it('should return correct package details for 5kg x 2', () => {
        const orderItems = [{ weightCategory: 5, quantity: 2 }];
        const result = findPackageForOrder(orderItems);

        expect(result).toEqual({
            packageType: "20", // Adjust based on your logic for packing 2 x 5kg
            dimensions: packageData["20"].dimensions,
            totalWeight: packageData["20"].possibleCombinations[0].totalWeight // Adjust if necessary based on your logic
        });
    });

    it('should return correct package details for 10kg x 2', () => {
        const orderItems = [{ weightCategory: 10, quantity: 2 }];
        const result = findPackageForOrder(orderItems);

        expect(result).toEqual({
            packageType: "20", // Adjust based on your logic for packing 2 x 10kg
            dimensions: packageData["20"].dimensions,
            totalWeight: packageData["20"].possibleCombinations[8].totalWeight // Adjust if necessary based on your logic
        });
    });
});

