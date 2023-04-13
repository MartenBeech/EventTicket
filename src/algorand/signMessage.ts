import algosdk from "algosdk";
import { convertStringToUint8Array } from "../services/encode";
import { SignedMessage } from "../entities/signedMessage";

interface SignMessageProps {
  publicKey: string;
  mnemonic: string;
}

export const signMessage = (props: SignMessageProps): SignedMessage => {
  const publicKey = props.publicKey;
  const mnemonic = props.mnemonic;
  const privateKey = algosdk.mnemonicToSecretKey(mnemonic).sk;

  const message = convertStringToUint8Array("Hello, Algorand!");
  const signature = algosdk.signBytes(message, privateKey);

  return { message, publicKey, signature };
};

export const verifyMessage = (props: SignedMessage) => {
  const isValid = algosdk.verifyBytes(
    props.message,
    props.signature,
    props.publicKey
  );
  console.log("Signature is valid:", isValid);
};
