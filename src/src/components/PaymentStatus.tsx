import { CheckCircle, Loader2 } from 'lucide-react';

export default function PaymentStatus({ status }: { status: 'idle' | 'paying' | 'success' }) {
  if (status === 'idle') return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl transition-all ${
        status === 'success' ? 'bg-green-500' : 'bg-primary'
      } text-white`}>
        {status === 'paying' && (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Shielding payment...</span>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle className="w-5 h-5" />
            <span>Unlocked! Enjoy premium.</span>
          </>
        )}
      </div>
    </div>
  );
}
