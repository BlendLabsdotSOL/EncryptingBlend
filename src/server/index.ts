import express from 'express';
import { payIntentRouter } from './routes/pay-intent';
import { verifyRouter } from './routes/verify-receipt';
import { x402Middleware } from './middleware/x402';

const app = express();
app.use(express.json());

// Public route: trigger payment
app.get('/premium-content', x402Middleware({
  price: 1_000_000, // 1 USDC
  token: 'USDC',
  gatewayUrl: 'http://localhost:3000/pay-intent'
}), (req, res) => {
  res.json({ message: "Welcome to premium content! Paid privately." });
});

// Gateway APIs
app.use('/pay-intent', payIntentRouter);
app.use('/verify', verifyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`x402 Private Gateway running on :${PORT}`);
});
