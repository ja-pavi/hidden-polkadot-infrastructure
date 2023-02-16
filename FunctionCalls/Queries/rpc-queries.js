const { apiConnection } = require("../../api-connector");

// Function Exports
module.exports = { rpcQueries };

// RPC Queries
async function rpcQueries(api, ADDR) {

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();

    // Creating a count system, to only grab a specific number of blocks 
    let count = 0

    // Subscription of header deriving author information for each block added
    const limitAuthor = await api.derive.chain.subscribeNewHeads((lastHeader) => {
      console.log(count + ': ' + `#${lastHeader.number} was authored by ${lastHeader.author}`);
    });

    // Retrieve the current timestamp via subscription
    const limitTimestamps = await api.query.timestamp.now((moment) => {
      console.log(count + ': ' + `The last block has a timestamp of `);
      var timeParser = parseInt(moment);
      console.log(count + ': ' + new Date(timeParser));
    });

    // Subscribe to balance changes for our account
    const limitSystemAccount = await api.query.system.account(ADDR, ({ nonce, data: balance }) => {
      console.log(count + ': ' + `Free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
    });

    // Subscription to the header with constant stream of new blocks up until given limit
    const limitSubscribe = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
      console.log(count + ': ' + `${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}` + '\n');

      // Incrementing count to log stated number of logs of the stream of blocks
      if (++count > 10) {
        limitSystemAccount();
        limitSubscribe();
        limitAuthor();
        limitTimestamps();
        process.exit();
      }
    });
  }

const boundRpcQueries = (api) => rpcQueries(api, '5GMvdfqVgc577ziNrkbKUNCqmEUJk21HtbQ3Z2XzVeyhTpi4');
apiConnection(boundRpcQueries, "Rococo")
