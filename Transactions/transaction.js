// Import the keyring as required
const { Keyring } = require('@polkadot/api');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

// Function imports
const { apiConnection } = require("../api-connector");

// Create a keyring instance
const keyring = new Keyring({ type: 'sr25519' });

module.exports = { createAndTrackTransaction, sendMessage, transactionInclusion};

async function createAndTrackTransaction(api) {

    // Create alice (carry-over from the keyring section)
    const alice = keyring.addFromUri('//Alice');
    const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';


    // Make a transfer from Alice to BOB, waiting for inclusion
    const unsub = await api.tx.balances
    .transfer(BOB, 12345)
    .signAndSend(alice, (result) => {
        console.log(`Current status is ${result.status}`);

        if (result.status.isInBlock) {
            console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
        } else if (result.status.isFinalized) {
            console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
            unsub();
        }
    });
}

async function sendMessage(sender) {
    
    // Yet to implement WASM so you can add sender parameter to messages
    const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });

    // Convert message, sign and then verify
    const message = stringToU8a('this is our message');
    const signature = alice.sign(message);
    const isValid = alice.verify(message, signature, alice.publicKey);

    // Log info
    console.log(`The signature ${u8aToHex(signature)}, is ${isValid ? '' : 'in'}valid`);

}

async function transactionInclusion() {

    const unsub = await api.tx.balances
        .transfer(BOB, 12345)
        .signAndSend(alice, ({ events = [], status, txHash }) => {
            console.log(`Current status is ${status.type}`);

        if (status.isFinalized) {
            console.log(`Transaction included at blockHash ${status.asFinalized}`);
            console.log(`Transaction hash ${txHash.toHex()}`);

            // Loop through Vec<EventRecord> to display all events
            events.forEach(({ phase, event: { data, method, section } }) => {
                console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
            });

            unsub();
        }
    });
}

async function feeEstimate(api) {

    const alice = keyring.addFromUri('//Alice');
    const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

    // estimate the fees as RuntimeDispatchInfo, using the signer (either
    // address or locked/unlocked keypair) (When overrides are applied, e.g
    //  nonce, the format would be `paymentInfo(sender, { nonce })`)
    const info = await api.tx.balances
    .transfer(alice, 123)
    .paymentInfo(BOB);

    // log relevant info, partialFee is Balance, estimated for current
    console.log(`
    class=${info.class.toString()},
    weight=${info.weight.toString()},
    partialFee=${info.partialFee.toHuman()}
    `);
}

apiConnection(feeEstimate, "Rococo")