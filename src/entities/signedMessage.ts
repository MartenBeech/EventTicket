export interface SignedMessage {
  message: Uint8Array;
  signature: Uint8Array;
  publicKey: string;
}

export interface SignedMessageSimplified {
  message: number[];
  signature: number[];
  publicKey: string;
}
