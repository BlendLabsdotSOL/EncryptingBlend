import { Elusiv, TokenType } from '@elusiv/sdk';
import { Connection, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

let elusiv: Elusiv | null = null;

export const getElusivInstance = async (): Promise<Elusiv> => {
  if (elusiv) return elusiv;

  const seed = bs58.decode(process.env.ELUSIV_SEED_PHRASE!);
  const keypair = Keypair.fromSecretKey(seed);
  const connection = new Connection(process.env.RPC_URL!);

  elusiv = await Elusiv.getElusivInstance(
    seed,
    keypair.publicKey,
    connection
  );

  return elusiv;
};

export const sendPrivatePayment = async (
  amount: number,
  tokenType: TokenType = 'USDC'
) => {
  const elusiv = await getElusivInstance();
  const topupTx = await elusiv.buildTopUpTx(amount, tokenType);
  // Sign & send...

  const sendTx = await elusiv.buildSendTx(
    amount,
    process.env.MERCHANT_PUBLIC_KEY!,
    tokenType
  );

  return sendTx;
};
