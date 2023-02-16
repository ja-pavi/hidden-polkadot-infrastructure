const { apiConnection } = require("../api-connector");
const { FETCH_PENDING_EXTRINSICS_DELAY } = require('../env.js');

// Function Exports
module.exports = { pendingExtrinsics };

  async function main(api) {

    // Sets intervals to consistently check for all pending extrinsics
    setInterval(() => pendingExtrinsics(api), FETCH_PENDING_EXTRINSICS_DELAY);

  }

  async function pendingExtrinsics(api) {
    
    // Unsubsribe to the header if limitExtrinsics is called again
    const limitExtrinsics = await api.rpc.author.pendingExtrinsics((extrinsics) => {

      // Returns if there is any pending extrinsics at the moment
      if(extrinsics.length === 0) {

        // Empty
        console.log('No pending extrinsics');

      } else {

        // Returns Currently Pending Extrinsics
        console.log('Recieved ' + extrinsics.length + ' pending extrinsics');

      }
    
      // Individually prepares each extrinsic for the console log
      extrinsics.forEach(function (item, index) {

        // Utilizes toHuman() to make JSON readable
        const data = JSON.stringify(item.toHuman(), ",", 4);
        console.log('Extrinsic #' + (index + 1) + ":\n" + data);
        
      });
    })
  }

apiConnection(main, "Kusama");