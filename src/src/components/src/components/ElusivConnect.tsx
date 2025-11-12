import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Shield } from 'lucide-react';

export default function ElusivConnect() {
  const { connected } = useWallet();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
        <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
        <span className="text-sm font-medium text-green-700 dark:text-green-300">
          {connected ? 'Elusiv Ready' : 'Connect Wallet'}
        </span>
      </div>
      <WalletMultiButton className="!bg-primary !hover:bg-primary-dark" />
    </div>
  );
}
