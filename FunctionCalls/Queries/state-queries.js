const { apiConnection } = require("../../api-connector");

  
// Function Exports
module.exports = { stateQueries };

  
  // Connecting to basic state queries of the chain
  async function stateQueries(api, ADDR) {

    // Retrieve the last timestamp
    const now = await api.query.timestamp.now();

    // Retrieve the account balance & nonce via the system module
    const { nonce, data: balance } = await api.query.system.account(ADDR);

    // Subscribe to balance changes for our account
    const parameterSub = await api.query.system.account(ADDR, ({ nonce, data: balance }) => {
      console.log(`Free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
    });

    // Multi Subscription to check balance changes for 2 accounts, ADDR1 & ADDR2 
    const multiSub = await api.query.system.account.multi([ADDR, ADDR], (balances) => {
      const [{ data: balance1 }, { data: balance2 }] = balances;
      console.log(`The balances are ${balance1.free} and ${balance2.free}`);
    });

    // Subscribe to the timestamp, our index and balance
    const distinctSub = await api.queryMulti([
      api.query.timestamp.now,
      [api.query.system.account, ADDR]
    ], ([now, { nonce, data: balance }]) => {
      console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
    });

    // Retrieve a snapshot of the validators
    // (all active & waiting based on ValidatorPrefs storage)
    const validatorKeys = await api.query.staking.validators.keys();

    // Subscribe to the balances for these accounts
    const validatorSub = await api.query.balances.account.multi(validatorKeys, (balances) => {
      // Uncomment the console log next line for full map view of the validator keys, though quite obtrusive to console output
      //console.log(`The nonce and free balances are: ${balances.map(([nonce, { free }]) => [nonce, free])}`);
    });

    distinctSub();
    parameterSub();
    multiSub();

    // Retrieve the hash & size of the entry as stored on-chain
    const [entryHash, entrySize] = await Promise.all([
      api.query.system.account.hash(ADDR),
      api.query.system.account.size(ADDR)
    ]);

    // Output the info
    console.log(`The current size is ${entrySize} bytes with a hash of ${entryHash}`);
  }

const boundStateQueries = (api) => stateQueries(api, '5GMvdfqVgc577ziNrkbKUNCqmEUJk21HtbQ3Z2XzVeyhTpi4');
apiConnection(boundStateQueries, "Rococo")