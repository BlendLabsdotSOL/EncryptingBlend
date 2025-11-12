const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const createPaymentIntent = async (amount: number, token: string) => {
  const res = await fetch(`${API_URL}/pay-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, token }),
  });
  return res.json();
};

export const verifyReceipt = async (receipt: string) => {
  const res = await fetch(`${API_URL}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ receipt }),
  });
  return res.json();
};
