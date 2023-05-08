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
import {
  appId,
  indexerUrl,
  purestakeAPIKey,
  purestakeBaseServer,
} from "../../env";
import { key_address, key_mnemonic } from "../constants";
import { getStoreValue, setStorePair } from "../store";
import { Buffer } from "buffer";
import { sha512_256 } from "js-sha512";

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
  const url = `${purestakeBaseServer}/accounts/${algorandAddress}`;
  const headers = {
    "X-API-key": purestakeAPIKey,
    "Content-Type": "application/json",
  };

  const response = await axios.get(url, { headers });
  return response.data;
};

const getTransactionParams = async () => {
  const url = `${purestakeBaseServer}/transactions/params`;
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
  const algorandAddress = await getStoreValue(key_address);
  const mnemonic = await getStoreValue(key_mnemonic);

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
      `${purestakeBaseServer}/transactions`,
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
  const algorandAddress = await getStoreValue(key_address);
  const mnemonic = await getStoreValue(key_mnemonic);

  const txn: TransactionLike = {
    type: TransactionType.axfer,
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
      `${purestakeBaseServer}/transactions`,
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

export const buyAssetTransaction = async (assetId: number) => {
  const transactionParams = await getTransactionParams();
  const algorandAddress = await getStoreValue(key_address);
  const mnemonic = await getStoreValue(key_mnemonic);

  const hash = sha512_256("get_asset(asset)void");
  const methodSelector = Buffer.from(hash.slice(0, 8), "hex");

  const assetIndex = 0; // Since we have only one asset in the appForeignAssets array
  const arg = algosdk.encodeUint64(assetIndex);

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
    appArgs: [new Uint8Array(methodSelector), arg],
  };

  const account = algosdk.mnemonicToSecretKey(mnemonic);
  const signedTxn = algosdk.signTransaction(txn, account.sk);
  try {
    const { data: txId } = await axios.post(
      `${purestakeBaseServer}/transactions`,
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

interface Asset {
  amount: number;
  "asset-id": number;
  deleted: boolean;
  "is-frozen": boolean;
  "opted-in-at-round": number;
}

const getAssetDataFromAccount = async (accountAddr: string) => {
  try {
    const response = await axios.get(
      `${indexerUrl}/accounts/${accountAddr}/assets`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const assets: Asset[] = response.data.assets;

    return assets;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("Axios request failed", err.response?.data, err.toJSON());
    } else {
      console.error(err);
    }
    return [];
  }
};

export const getAssetIdsFromAccount = async (accountAddr: string) => {
  const assets = await getAssetDataFromAccount(accountAddr);
  const assetIds = assets.map((asset) => {
    return asset["asset-id"];
  });
  return assetIds;
};

export const getAssetAmountFromAccount = async (
  accountAddr: string,
  assetId: number
) => {
  const assets = await getAssetDataFromAccount(accountAddr);

  const asset = assets.find((asset) => asset["asset-id"] === assetId);
  if (asset) {
    return asset.amount;
  }
  return -1;
};

const getAssetParams = async (assetId: number) => {
  try {
    const response = await axios.get(`${indexerUrl}/assets/${assetId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.asset.params;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("Axios request failed", err.response?.data, err.toJSON());
    } else {
      console.error(err);
    }
    return "";
  }
};

export const getUrlFromAssetId = async (assetId: number): Promise<string> => {
  const assetParams = await getAssetParams(assetId);
  if (assetParams) {
    return assetParams.url;
  }
  return "";
};

export const getTotalFromAsset = async (assetId: number): Promise<number> => {
  const assetParams = await getAssetParams(assetId);
  if (assetParams) {
    return assetParams.total;
  }
  return -1;
};
