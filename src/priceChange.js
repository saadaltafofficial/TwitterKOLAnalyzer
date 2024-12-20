export default function calculateCompletePriceChange(arr) {
    if (!arr || arr.length < 2) {
        throw new Error("Price history must contain at least two values to measure changes.");
    }

    // Get the first and last prices
    const firstPrice = arr[0].value;
    const lastPrice = arr[arr.length - 1].value;

    // Calculate the percentage change
    const change = ((lastPrice - firstPrice) / firstPrice) * 100;

    return {
        firstPrice,
        lastPrice,
        change: change.toFixed(2) + "%", // Format change to 2 decimal places
    };
}
