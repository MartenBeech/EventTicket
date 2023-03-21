import algosdk, {
  encodeAddress,
  TransactionLike,
  instantiateTxnIfNeeded,
  EncodedSignedTransaction,
  Transaction,
  encodeObj,
} from "algosdk";
import axios from "axios";
import { getRandomBytes } from "expo-crypto";
import nacl from "tweetnacl";
import {
  algorandAddress,
  algorandSecretKey,
  algorandSigningKey,
  purestakeAPIKey,
  purestakeBaseServer,
} from "../../env";
import { Buffer } from "buffer";

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

  console.log(nacl.box.keyPair.fromSecretKey(algorandSecretKey).publicKey);

  const signedTxn = signTransaction(txn, algorandSigningKey);
  try {
    const { data: txId } = await axios.post(
      `${purestakeBaseServer}/v2/transactions`,
      signedTxn.blob,
      {
        headers: {
          "Content-Type": "application/x-binary",
          "X-API-key": purestakeAPIKey,
        },
      }
    );
    console.log(`Transaction sent: ${txId}`);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("Axios request failed", err.response?.data, err.toJSON());
    } else {
      console.error(err);
    }
  }
};

function signTransaction(txn: TransactionLike, sk: Uint8Array) {
  const algoTxn = instantiateTxnIfNeeded(txn);
  return {
    txID: algoTxn.txID().toString(),
    blob: signTxn(sk, algoTxn),
  };
}

function signTxn(sk: Uint8Array, txn: Transaction) {
  // construct signed message
  const sTxn: EncodedSignedTransaction = {
    sig: rawSignTxn(sk, txn),
    txn: txn.get_obj_for_encoding(),
  };
  // add AuthAddr if signing with a different key than From indicates

  return encodeObj(sTxn);
}

function rawSignTxn(sk: Uint8Array, txn: Transaction) {
  const toBeSigned = txn.bytesToSign();
  const sig = nacl.sign(toBeSigned, sk);
  return Buffer.from(sig);
}
