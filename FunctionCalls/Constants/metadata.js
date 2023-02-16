// Function Imports
const { apiConnection } = require("../../api-connector");

// Function Exports
module.exports = { printMetadata, entryMetadata };

  // Prints the runtime Metadata of the chain
  function printMetadata(api) {

    const metadata = JSON.parse(api.runtimeMetadata.toString())
    
    console.dir(metadata, {depth: null, colors: false});
  }

  // Entry Metadata Function
  async function entryMetadata(api, ADDR) {

    // Extract the info
    const { meta, method, section } = api.query.system.account;

    // Display some info on a specific entry
    console.log(`${section}.${method}: ${meta.documentation.join(' ')}`);
    console.log(`query key: ${api.query.system.account.key(ADDR)}`);
  }

apiConnection(printMetadata, "Rococo")