import algosdk, {
  TransactionLike,
  secretKeyToMnemonic,
  signTransaction,
} from "algosdk";
import axios from "axios";
import { getRandomBytes } from "expo-crypto";
import {
  algorandAddress,
  mnemonic,
  purestakeAPIKey,
  purestakeBaseServer,
} from "../../env";

export const createAccount = async () => {
  const privateKeyBytes = getRandomBytes(32);
  const privateKey = new Uint8Array(privateKeyBytes);
  const mnemonic = secretKeyToMnemonic(privateKey);
  console.log(mnemonic);
  const account = algosdk.mnemonicToSecretKey(mnemonic);
  console.log(account.addr);
  return { mnemonic, addr: account.addr };
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

const getTransactionParams = async () => {
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
  console.log(transactionParams);
  const txn: TransactionLike = {
    flatFee: true,
    from: algorandAddress,
    to: "RQX6JUHQRR4X7442D7DQPWPFL2JGSX6KX3EXTIXLCPMJ7EZQLBAN5KQFIY",
    fee: transactionParams["min-fee"],
    amount: 2000000,
    firstRound: transactionParams["last-round"] + 1,
    lastRound: transactionParams["last-round"] + 1000,
    genesisID: transactionParams["genesis-id"],
    genesisHash: transactionParams["genesis-hash"],
  };

  const account = algosdk.mnemonicToSecretKey(mnemonic);

  const signedTxn = signTransaction(txn, account.sk);
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
    console.log(`Transaction sent:`);
    console.log(txId);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("Axios request failed", err.response?.data, err.toJSON());
    } else {
      console.error(err);
    }
  }
};
