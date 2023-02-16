from web3 import Web3

import asyncio
import json
import requests
from websockets import connect

moonbeam_ws_url = 'wss://moonbeam.blastapi.io/cce77a65-cc3d-4b9c-a94e-ac40b532a4ec'
moonbeam_http_url = 'https://moonbeam.blastapi.io/cce77a65-cc3d-4b9c-a94e-ac40b532a4ec'
web3 = Web3(Web3.HTTPProvider(moonbeam_http_url))


async def get_event():
    async with connect(moonbeam_ws_url) as ws:
        await ws.send('{"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}')
        subscription_response = await ws.recv()
        print(subscription_response) # {"jsonrpc":"2.0","id":1,"result":"0xd67da23f62a01f58042bc73d3f1c8936"} 

        while True:
                event = json.loads(await asyncio.wait_for(ws.recv(), timeout=15))
                txHash = event['params']['result']
                print(txHash)

if __name__ == "__main__":
    while True:
        asyncio.get_event_loop().run_until_complete(get_event())

