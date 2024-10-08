// jest.config.cjs
module.exports = {
    testEnvironment: "jsdom", // Use 'jsdom' for React testing
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to handle .js and .jsx files
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
