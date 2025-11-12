import { Elusiv } from '@elusiv/sdk';
import { Connection, PublicKey } from '@solana/web3.js';
import { getDomainKeySync } from '@elusiv/sdk';

let elusivInstance: Elusiv | null = null;

export const getElusiv = async (seed: Uint8Array, connection: Connection): Promise<Elusiv> => {
  if (elusivInstance) return elusivInstance;

  const { pubkey } = getDomainKeySync("coinblend");
  elusivInstance = await Elusiv.getElusivInstance(seed, pubkey, connection);
  return elusivInstance;
};
