import algosdk, {
  TransactionLike,
  secretKeyToMnemonic,
  signTransaction,
  AppNoOpTxn,
  OnApplicationComplete,
  TransactionType,
} from "algosdk";
import axios from "axios";
import { getRandomBytes } from "expo-crypto";
import { appId, purestakeAPIKey, purestakeBaseServer } from "../../env";
import { key_address, key_mnemonic } from "../constants";
import { getStoreValue, setStorePair } from "../store";
import { Buffer } from "buffer";

export const createAccount = async () => {
  const privateKeyBytes = getRandomBytes(32);
  const privateKey = new Uint8Array(privateKeyBytes);
  const mnemonic = secretKeyToMnemonic(privateKey);
  const account = algosdk.mnemonicToSecretKey(mnemonic);
  await setStorePair(key_mnemonic, mnemonic);
  await setStorePair(key_address, account.addr);
  return { mnemonic, addr: account.addr };
};

export const getAccount = async () => {
  const algorandAddress = getStoreValue(key_address);
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

interface CreateTransactionProps {
  addressTo: string;
  algoAmount: number;
}

export const createTransaction = async (props: CreateTransactionProps) => {
  const transactionParams = await getTransactionParams();
  const algorandAddress = (await getStoreValue(key_address)) as string;
  const mnemonic = (await getStoreValue(key_mnemonic)) as string;

  const txn: TransactionLike = {
    flatFee: true,
    from: algorandAddress,
    to: props.addressTo,
    fee: transactionParams["min-fee"],
    amount: props.algoAmount * 1000000,
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
    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("Axios request failed", err.response?.data, err.toJSON());
    } else {
      console.error(err);
    }
    return false;
  }
};

export const optInAsset = async (assetId: number) => {
  const transactionParams = await getTransactionParams();
  const algorandAddress = (await getStoreValue(key_address)) as string;
  const mnemonic = (await getStoreValue(key_mnemonic)) as string;

  const txn: any = {
    type: "axfer",
    flatFee: true,
    from: algorandAddress,
    to: algorandAddress,
    fee: transactionParams["min-fee"],
    amount: 0,
    firstRound: transactionParams["last-round"] + 1,
    lastRound: transactionParams["last-round"] + 1000,
    genesisID: transactionParams["genesis-id"],
    genesisHash: transactionParams["genesis-hash"],
    assetIndex: assetId,
  };

  const account = algosdk.mnemonicToSecretKey(mnemonic);
  const signedTxn = algosdk.signTransaction(txn, account.sk);
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
    console.log("Transaction sent:");
    console.log(txId);
    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("Axios request failed", err.response?.data, err.toJSON());
    } else {
      console.error(err);
    }
    return false;
  }
};

export const applicationCallTransaction = async (assetId: number) => {
  const transactionParams = await getTransactionParams();
  const algorandAddress = (await getStoreValue(key_address)) as string;
  const mnemonic = (await getStoreValue(key_mnemonic)) as string;

  const txn: AppNoOpTxn = {
    appIndex: appId,
    appOnComplete: OnApplicationComplete.NoOpOC,
    fee: Math.max(1000, transactionParams["min-fee"]),
    flatFee: true,
    firstRound: transactionParams["last-round"] + 1,
    from: algorandAddress,
    genesisHash: transactionParams["genesis-hash"],
    genesisID: transactionParams["genesis-id"],
    lastRound: transactionParams["last-round"] + 1000,
    type: TransactionType.appl,
    appForeignAssets: [assetId],
    appArgs: [
      new Uint8Array(Buffer.from("get_assets")),
      new Uint8Array(Buffer.from(algosdk.encodeUint64(assetId))),
    ],
  };

  const account = algosdk.mnemonicToSecretKey(mnemonic);
  const signedTxn = algosdk.signTransaction(txn, account.sk);
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
    console.log("Transaction sent:");
    console.log(txId);
    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("Axios request failed", err.response?.data, err.toJSON());
    } else {
      console.error(err);
    }
    return false;
  }
};
