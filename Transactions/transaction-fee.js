const { Keyring } = require('@polkadot/api');

const { apiConnection } = require("../api-connector");

const keyring = new Keyring({ type: 'sr25519' });

module.exports = { feeEstimate };

async function feeEstimate(api) {

    const alice = keyring.addFromUri('//Alice');
    const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

    // estimate the fees as RuntimeDispatchInfo, using the signer (either
    // address or locked/unlocked keypair) (When overrides are applied, e.g
    //  nonce, the format would be `paymentInfo(sender, { nonce })`)
    const info = await api.tx.balances
    .transfer(BOB, 123)
    .paymentInfo(alice);

    // log relevant info, partialFee is Balance, estimated for current
    console.log(`
    class=${info.class.toString()},
    weight=${info.weight.toString()},
    partialFee=${info.partialFee.toHuman()}
    `);
}

apiConnection(feeEstimate, "Rococo")
