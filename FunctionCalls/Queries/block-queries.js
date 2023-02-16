const { apiConnection } = require("../../api-connector");

// Function Exports
module.exports = { blockQueries };

  // Block Query Functions
  async function blockQueries(api, ADDR) {

    // Retrieve the current block header
    const lastHdr = await api.rpc.chain.getHeader();

    // Get a decorated api instance at a specific block
    const apiAt = await api.at(lastHdr.hash);

    // query the balance at this point of the chain
    const { data: { free } } = await api.query.system.account(ADDR);

    // Display the free balance
    console.log(`The current free is ${free.toString()}`);
  }

const boundBlockQueries = (api) => blockQueries(api, '5GMvdfqVgc577ziNrkbKUNCqmEUJk21HtbQ3Z2XzVeyhTpi4');
apiConnection(boundBlockQueries, "Rococo")

console.log('retings')