// Function Exports
module.exports = { querySystemEvents };

 // Prints the Query System Events
 async function querySystemEvents(api) {

    const [chain, name] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name()
    ])
    
    // Subscribe to system events via storage
    api.query.system.events((events) => {
      console.log(`\nReceived ${events.length} events:`);
      
      // Loop through the Vec<EventRecord>
      events.forEach(function callback(record, index) {

        // Break in the console to distinguish independent events
        console.log('\n' + chain + ' Event Transaction:'/*+ (index + 1)*/);
        
        // Extract the phase, event and the event types
        const { event, phase } = record;
        const types = event.typeDef;

        // Show what we are busy with
        console.log(event.section + ':' + event.method + '::' + 'phase=' + phase.toString());
        console.log(event.meta.docs.toString());
        
        // Loop through each of the parameters, displaying the type and data
        
        event.data.forEach((data, index) => {
          const messageDescription = JSON.stringify(data, '\n', 4);
          console.log(`${types[index].type}: ` + messageDescription);
        }); 
      });
    });
  }