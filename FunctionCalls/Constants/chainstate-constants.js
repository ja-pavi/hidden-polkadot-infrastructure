// Function Imports
const { apiConnection } = require('../../api-connector');

// Function Exports
module.exports = { chainStateConstants };

  // Chain Constants are values that are defined in the runtime and used as part of chain operations 
  function chainStateConstants(api) {

    // Real time console outputs for the current chain state
    console.log("Genesis Hash in Hex: " + api.genesisHash.toHex());
    console.log("The length of an epoch (session) in Babe: " + api.consts.babe.epochDuration.toNumber());
    console.log("The amount required to create a new account: " + api.consts.balances.existentialDeposit.toNumber());
    console.log("The chain runtime version: " + api.runtimeVersion.toString());
    console.log("The version of the API: " + api.libraryInfo.toString());
  }

apiConnection(chainStateConstants, "Rococo")