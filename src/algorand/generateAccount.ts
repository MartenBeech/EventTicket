import { Buffer } from "buffer";
import algosdk, { encodeAddress } from "algosdk";
import * as nacl from "tweetnacl";
import { getRandomBytes } from "expo-crypto";
// import { algodClient } from "./algoclient";
import axios from "axios";
import { purestakeAPIKey, purestakeBaseServer } from "../../env";
import {
  createAccount,
  getAccount,
  getTransactionParams,
} from "../rest/algorand";

export async function firstTransaction() {
  //   try {
  // const myAccount = {
  //   addr: "GQI6IPZE35BG7LXQJFHNJB4YTRSS2K46KZVL37TDBE4GNLOYE5FTXPMFH4",
  //   sk: new Uint8Array([
  //     207, 210, 245, 58, 215, 249, 203, 79, 18, 63, 156, 53, 157, 236, 22,
  //     253, 85, 39, 0, 55, 153, 129, 111, 167, 248, 112, 247, 54, 26, 58, 52,
  //     86,
  //   ]),
  // };
  //Check your balance
  // console.log(algodClient);
  // let accountInfo = await algodClient.accountInformation(myAccount.addr).do();
  // console.log("Account balance: %d microAlgos", accountInfo.amount);
  // // Construct the transaction
  // let params = await algodClient.getTransactionParams().do();
  // // comment out the next two lines to use suggested fee
  // params.fee = algosdk.ALGORAND_MIN_TX_FEE;
  // params.flatFee = true;
  // // receiver defined as TestNet faucet address
  // const receiver =
  //   "RQX6JUHQRR4X7442D7DQPWPFL2JGSX6KX3EXTIXLCPMJ7EZQLBAN5KQFIY";
  // const enc = new TextEncoder();
  // const note = enc.encode("Hello World");
  // let amount = 1000000;
  // let sender = myAccount.addr;
  // let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
  //   from: sender,
  //   to: receiver,
  //   amount: amount,
  //   note: note,
  //   suggestedParams: params,
  // });
  // // Sign the transaction
  // let signedTxn = txn.signTxn(myAccount.sk);
  // let txId = txn.txID().toString();
  // console.log("Signed transaction with txID: %s", txId);
  // // Submit the transaction
  // await algodClient.sendRawTransaction(signedTxn).do();
  // // Wait for confirmation
  // let confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
  // //Get the completed Transaction
  // console.log(
  //   "Transaction " +
  //     txId +
  //     " confirmed in round " +
  //     confirmedTxn["confirmed-round"]
  // );
  // let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
  // console.log("Note field: ", string);
  // accountInfo = await algodClient.accountInformation(myAccount.addr).do();
  // console.log("Transaction Amount: %d microAlgos", confirmedTxn.txn.txn.amt);
  // console.log("Transaction Fee: %d microAlgos", confirmedTxn.txn.txn.fee);
  // console.log("Account balance: %d microAlgos", accountInfo.amount);
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  //   process.exit();
}
