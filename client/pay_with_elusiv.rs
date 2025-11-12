use elusiv::Elusiv;
use solana_sdk::{pubkey::Pubkey, signer::keypair::Keypair};
use std::str::FromStr;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let rpc_url = "https://api.mainnet-beta.solana.com";
    let client = solana_client::rpc_client::RpcClient::new(rpc_url.to_string());

    let payer = Keypair::from_base58_string(&std::env::var("PAYER_KEY").unwrap());
    let elusiv = Elusiv::new(&client, &payer).await?;

    let amount = 1_000_000; // 1 USDC
    let recipient = Pubkey::from_str("merchant_pubkey_here")?;

    // Step 1: Top up Elusiv
    let topup = elusiv.topup(amount, "USDC").await?;
    client.send_and_confirm_transaction(&topup).await?;

    // Step 2: Private send via gateway intent
    let send = elusiv.send(amount, &recipient, Some("intent-123")).await?;
    println!("Private tx: {}", send);

    Ok(())
}
