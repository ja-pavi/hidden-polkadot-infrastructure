// Package Imports
const { ApiPromise, WsProvider } = require('@polkadot/api');

// Function Exports
module.exports = { apiConnection };

  // Universal API Connector Function that allows for any function 
  // to make use of the API without unnecessary calls.
  // Very helpful for testing functions, as each can run inside any
  // given .js file.

  // To use just pass the name of the function into the first parameter,
  // than pass the network name into the second parameter. 
  async function apiConnection(functionCall, networkName) {

    switch (networkName) {
      case 'Polkadot':
        network = "wss://rpc.polkadot.io";
        break;
      case 'Kusama':
        network = "wss://kusama-rpc.polkadot.io";
        break;
      case 'Westend':
        network = "wss://westend-rpc.polkadot.io";
        break;
      case 'Rococo':
        network = "wss://rococo-rpc.polkadot.io";
        break;
      default:
        throw 'Invalid network name';
    }

    // Swap out the WsProvider URL with any of the given networks
    // as the second parameter.
    const wsProvider = new WsProvider(network);
    const api = await ApiPromise.create({ provider: wsProvider });

    // Retrieve the chain & node information information via rpc calls
    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
    ]);

    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion} \n`);
    console.log(`Running ~ \n`);

    functionCall(api);
  }