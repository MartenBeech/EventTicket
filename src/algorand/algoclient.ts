import algosdk from "algosdk";
import { purestakeAPIKey, purestakeBaseServer } from "../../env";

const baseServer = purestakeBaseServer;
const port = "";
const token = {
  "X-API-Key": purestakeAPIKey,
};

export const algodClient = new algosdk.Algodv2(token, baseServer, port);
