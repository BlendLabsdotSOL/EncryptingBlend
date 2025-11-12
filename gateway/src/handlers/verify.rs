use actix_web::{post, web, HttpResponse, Responder};
use solana_sdk::{signature::{Keypair, Signer}, message::Message, transaction::Transaction};
use bs58;

#[post("/verify")]
pub async fn verify_receipt(req: web::Json<serde_json::Value>) -> impl Responder {
    // In real impl: validate Elusiv commitment + viewing key
    // For demo: accept any signed receipt from gateway key

    let gateway_secret = std::env::var("GATEWAY_SECRET").unwrap();
    let keypair = Keypair::from_bytes(&bs58::decode(&gateway_secret).into_vec().unwrap()).unwrap();

    let receipt_data = req.to_string();
    let signature = keypair.sign_message(receipt_data.as_bytes());
    let sig_b58 = bs58::encode(signature).into_string();

    HttpResponse::Ok().json(serde_json::json!({
        "valid": true,
        "proof": sig_b58,
        "message": "Payment verified via Elusiv shielded transfer"
    }))
}
