
## Privacy Flow

1. Client requests `/premium` → **402 Payment Required**
2. Client calls `/pay-intent` → gets **shielded instructions**
3. Client uses **Elusiv SDK** → deposits & pays from **private balance**
4. Gateway watches **commitment pool** → detects payment
5. Gateway **unshields to merchant** on schedule
6. Gateway signs **ZK receipt**
7. Merchant verifies → serves content

> **No public link between payer and merchant**
