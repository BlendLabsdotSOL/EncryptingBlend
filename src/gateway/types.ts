export interface PaymentIntent {
  id: string;
  amount: number;
  token: string;
  gatewayAddress: string;
  expiresAt: number;
  privacyMode: 'elusiv' | 'public' | 'confidential';
}

export interface PaymentReceipt {
  intentId: string;
  txSignature?: string;
  proof?: string; // ZK or Elusiv viewing key
  gatewaySignature: string;
}
