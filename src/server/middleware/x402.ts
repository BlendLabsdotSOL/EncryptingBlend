import { Request, Response, NextFunction } from 'express';

interface X402Options {
  price: number;
  token: string;
  gatewayUrl: string;
}

export const x402Middleware = (opts: X402Options) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Simulate paid check (in prod: validate receipt from gateway)
    if (req.headers['x-receipt']) {
      return next();
    }

    res.status(402).set({
      'Pay': `${opts.gatewayUrl}; amount=${opts.price}; asset=${opts.token}`,
      'Content-Type': 'application/json'
    }).json({
      error: 'Payment Required',
      price: opts.price,
      token: opts.token,
      gateway: opts.gatewayUrl
    });
  };
};
