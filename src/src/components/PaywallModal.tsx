import { X, Shield, Lock, Zap } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
  price: number;
  token: string;
}

export default function PaywallModal({ isOpen, onClose, onPay, price, token }: PaywallModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Premium Content</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold">Private Payment</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your identity and amount are hidden on-chain
                </p>
              </div>
            </div>
          </div>

          <div className="text-center py-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {(price / 1_000_000).toFixed(2)} {token}
            </p>
            <p className="text-sm text-gray-500">One-time private payment</p>
          </div>

          <button
            onClick={onPay}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Pay Privately with Elusiv
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Lock className="w-4 h-4" />
            <span>End-to-end encrypted • No KYC • Instant unlock</span>
          </div>
        </div>
      </div>
    </div>
  );
}
