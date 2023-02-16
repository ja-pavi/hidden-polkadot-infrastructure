// Function imports to query event data
const { querySystemEvents } = require("./FunctionCalls/Queries/system-events")
const { apiConnection } = require("./api-connector")

// Universal script to query all event data into historical database
async function historicalEventData(networkNames) {
    networkNames.forEach((networkName) => apiConnection(querySystemEvents, networkName));
}

// Parse network names from command line. Default if none are specified
const defaultNetworkNames = ['Polkadot', 'Kusama', 'Rococo'];
const networkNames = process.argv.length > 2 ? process.argv.slice(2) : defaultNetworkNames;
historicalEventData(networkNames);