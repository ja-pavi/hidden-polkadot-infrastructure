// Function Imports
const { apiConnection } = require("../../api-connector");

// Function Exports
module.exports = { mapEntries };

 
 // Map Entries Function
  async function mapEntries(api) {

    // Retrieve the active era
    const activeEra = await api.query.staking.activeEra();

    // retrieve all exposures for the active era
    const exposures = await api.query.staking.erasStakers.entries(activeEra.index);

    exposures.forEach(([key, exposure]) => {
      console.log('key arguments:', key.args.map((k) => k.toHuman()));
      console.log('     exposure:', exposure.toHuman());
    });

    // retrieve all the nominator keys
    const keys = await api.query.staking.nominators.keys();

    // extract the first key argument [AccountId] as string
    const nominatorIds = keys.map(({ args: [nominatorId] }) => nominatorId);

    // Uncomment this for list of all nominator ID's
    // console.log('all nominators:', nominatorIds.join(', '));
  }

  apiConnection(mapEntries, "Rococo")