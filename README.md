# Polkadot Arbitrage Bot (Hiding the live trading infrastructure)

(Hidden trading infrastructure ******) JavaScript & Python program that sets the foundation for Polkadot arbitrage bot. 

Included at the moment is the ability to pull pending extrinsics, send transactions, calculate fees, track sent extrinsics, event data, rpc calls, block state, chain state, and chain constants through a universal API. 

Although focusing mainly through the Rococo Testnet, the Universal API connection allows for connection to Kusama, Polkadot, or Westend for any function. 


## Sample Relay Chain Query Usage
```
node main.js Polkadot
```

# Interacting with the Moonbeam parachain via Python

## Requirements and installing packages
Please use Python 3.10. Websockets behavior has changed as of Python 3.10,
so I've pointed to a beta version of the Web3 library to resolve conflicting dependencies.
Note: Using a virtualenv is recommended to avoid version conflicts. 
```
source .venv/bin/activate
pip3 install -r requirements.txt
deactivate
```

## Run scripts
```
(.venv) $ python stellaswap_snapshot.py
```

# Misc notes
We use public RPC endpoints here. Eventually when we "productionize", we should migrate off of these (https://docs.moonbeam.network/builders/get-started/endpoints/#endpoint-providers)
