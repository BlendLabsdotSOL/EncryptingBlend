import express from 'express';
import { PaymentIntent } from '../../gateway/types';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', (req, res) => {
  const { amount, token } = req.body;

  const intent: PaymentIntent = {
    id: uuidv4(),
    amount,
    token,
    gatewayAddress: 'shielded_gateway_address_via_elusiv',
    expiresAt: Date.now() + 15 * 60 * 1000,
    privacyMode: 'elusiv'
  };

  // In prod: store intent in DB
  console.log('Payment intent created:', intent.id);

  res.json({
    intent,
    instructions: {
      elusiv: `Use Elusiv SDK to send ${amount} ${token} to shielded pool. Include intentId in memo.`,
      memo: intent.id
    }
  });
});

export { router as payIntentRouter };
