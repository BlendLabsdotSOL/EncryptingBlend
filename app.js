// app.js
const API_URL = 'http://localhost:3000';

// DOM Elements
const unlockBtn = document.getElementById('unlock-btn');
const modal = document.getElementById('paywall-modal');
const closeModal = document.getElementById('close-modal');
const payBtn = document.getElementById('pay-btn');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
const walletConnect = document.getElementById('wallet-connect');

// State
let wallet = null;
let elusiv = null;

// === Wallet Connect (Phantom) ===
async function connectWallet() {
  if (!window.solana?.isPhantom) {
    alert('Phantom wallet not found!');
    return;
  }

  try {
    const resp = await window.solana.connect();
    wallet = resp.publicKey.toString();
    renderWalletButton();
    await initElusiv();
  } catch (err) {
    console.error(err);
  }
}

function renderWalletButton() {
  walletConnect.innerHTML = `
    <div class="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
      <i data-lucide="shield" class="w-4 h-4 text-green-600"></i>
      <span class="text-sm font-medium text-green-700 dark:text-green-300">Connected</span>
    </div>
    <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
      ${wallet.slice(0, 4)}...${wallet.slice(-4)}
    </button>
  `;
  lucide.createIcons();
}

// === Elusiv Init ===
async function initElusiv() {
  if (!wallet) return;

  // In real app: derive seed from wallet
  const seed = new Uint8Array(32); // Replace with real seed
  crypto.getRandomValues(seed);

  const { Elusiv } = await import('https://cdn.jsdelivr.net/npm/@elusiv/sdk@0.2.0/dist/index.js');
  const connection = new (await import('https://cdn.jsdelivr.net/npm/@solana/web3.js@1.95.0/dist/index.js')).Connection(
    'https://api.mainnet-beta.solana.com'
  );

  elusiv = await Elusiv.getElusivInstance(seed, new Uint8Array(32), connection);
}

// === API Calls ===
async function createPaymentIntent() {
  const res = await fetch(`${API_URL}/pay-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 1_000_000, token: 'USDC' })
  });
  return res.json();
}

async function verifyReceipt(receipt) {
  const res = await fetch(`${API_URL}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ receipt })
  });
  return res.json();
}

// === Pay Flow ===
async function payWithElusiv() {
  if (!elusiv) {
    alert('Connect wallet first!');
    return;
  }

  showToast('Shielding payment...', 'bg-purple-600');

  try {
    // 1. Create intent
    const { intent } = await createPaymentIntent();

    // 2. Top up Elusiv (simulated)
    await new Promise(r => setTimeout(r, 1500));

    // 3. Send private
    // const tx = await elusiv.send(1_000_000, merchantPubkey, intent.id);
    // await connection.confirmTransaction(tx);

    // 4. Simulate gateway detection
    await new Promise(r => setTimeout(r, 2000));

    // 5. Get receipt
    const receipt = `gateway-signed:${intent.id}:${Date.now()}`;
    const verify = await verifyReceipt(receipt);

    if (verify.valid) {
      showToast('Unlocked! Enjoy premium.', 'bg-green-600');
      setTimeout(() => {
        modal.classList.add('hidden');
        document.querySelector('main').innerHTML = `
          <div class="text-center py-20">
            <i data-lucide="check-circle" class="w-20 h-20 text-green-600 mx-auto mb-4"></i>
            <h2 class="text-4xl font-bold mb-4">Welcome to Premium!</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300">Your payment was 100% private.</p>
          </div>
        `;
        lucide.createIcons();
      }, 1000);
    }
  } catch (err) {
    showToast('Payment failed', 'bg-red-600');
    console.error(err);
  }
}

// === Toast ===
function showToast(message, bg = 'bg-purple-600') {
  toastMsg.textContent = message;
  toast.className = `flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl text-white ${bg}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}

// === Event Listeners ===
unlockBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

payBtn.addEventListener('click', payWithElusiv);

// Wallet button
walletConnect.innerHTML = `
  <button id="connect-wallet" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2">
    <i data-lucide="wallet"></i>
    Connect Wallet
  </button>
`;
document.getElementById('connect-wallet').addEventListener('click', connectWallet);

// Init icons
lucide.createIcons();
