import { useState } from 'react';
import PaywallModal from '../components/PaywallModal';
import PaymentStatus from '../components/PaymentStatus';
import ElusivConnect from '../components/ElusivConnect';
import { createPaymentIntent } from '../lib/api';

export default function Premium() {
  const [showPaywall, setShowPaywall] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'paying' | 'success'>('idle');

  const handlePay = async () => {
    setPaymentStatus('paying');
    try {
      const intent = await createPaymentIntent(1_000_000, 'USDC');
      // In real app: trigger Elusiv SDK flow
      setTimeout(() => {
        setPaymentStatus('success');
        setShowPaywall(false);
      }, 3000);
    } catch (err) {
      alert('Payment failed');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <header className="border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">CoinBlend</h1>
            <ElusivConnect />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Unlock Private Premium Content
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Pay once, stay anonymous forever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {['Zero Linkability', 'ZK Privacy', 'Instant Access'].map((feat) => (
              <div key={feat} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="bg-primary/10 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{feat}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feat === 'Zero Linkability' && 'No on-chain trace to you'}
                  {feat === 'ZK Privacy' && 'Elusiv hides amount & sender'}
                  {feat === 'Instant Access' && 'Unlock in <3 seconds'}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowPaywall(true)}
              className="bg-primary hover:bg-primary-dark text-white text-xl font-bold py-4 px-12 rounded-xl shadow-xl transition transform hover:scale-105"
            >
              Unlock Premium Now
            </button>
          </div>

          <PaymentStatus status={paymentStatus} />
        </main>
      </div>

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onPay={handlePay}
        price={1_000_000}
        token="USDC"
      />
    </>
  );
}
