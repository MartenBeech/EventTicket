export interface SignedMessage {
  message: Uint8Array;
  signature: Uint8Array;
  publicKey: string;
}
