import algosdk, { encodeAddress } from "algosdk";
import axios from "axios";
import { getRandomBytes } from "expo-crypto";
import nacl from "tweetnacl";
import {
  algorandAddress,
  algorandSecretKey,
  purestakeAPIKey,
  purestakeBaseServer,
} from "../../env";

export const createAccount = async () => {
  const privateKeyBytes = getRandomBytes(32);
  const privateKey = new Uint8Array(privateKeyBytes);
  const publicKey = nacl.box.keyPair.fromSecretKey(privateKey).publicKey;
  const address = encodeAddress(publicKey);
  return { address, privateKey };
};

export const getAccount = async () => {
  const url = `${purestakeBaseServer}/v2/accounts/${algorandAddress}`;
  const headers = {
    "X-API-key": purestakeAPIKey,
    "Content-Type": "application/json",
  };

  const response = await axios.get(url, { headers });
  return response.data;
};

export const getTransactionParams = async () => {
  const url = `${purestakeBaseServer}/v2/transactions/params`;
  const headers = {
    "X-API-key": purestakeAPIKey,
    "Content-Type": "application/json",
  };

  const response = await axios.get(url, { headers });
  return response.data;
};

export const createTransaction = async () => {
  const transactionParams = await getTransactionParams();
  const txn = {
    from: algorandAddress,
    to: "RQX6JUHQRR4X7442D7DQPWPFL2JGSX6KX3EXTIXLCPMJ7EZQLBAN5KQFIY",
    fee: transactionParams["min-fee"],
    amount: 2000000,
    firstRound: transactionParams["last-round"] + 1,
    lastRound: transactionParams["last-round"] + 1000,
    genesisID: "testnet-v1.0",
    genesisHash: "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
  };

  console.log(algorandSecretKey);

  const signedTxn = algosdk.signTransaction(txn, algorandSecretKey);
  const { data: txId } = await axios.post(
    `${purestakeBaseServer}/v2/transactions`,
    signedTxn.blob,
    {
      headers: {
        "Content-Type": "application/x-binary",
        "X-Algo-key": purestakeAPIKey,
      },
    }
  );

  console.log(`Transaction sent: ${txId}`);
};
