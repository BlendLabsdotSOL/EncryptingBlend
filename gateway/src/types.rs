use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize)]
pub struct PaymentIntent {
    pub id: String,
    pub amount: u64,
    pub token: String,
    pub expires_at: u64,
    pub privacy_mode: String,
}

#[derive(Deserialize)]
pub struct PayIntentRequest {
    pub amount: u64,
    pub token: String,
}

#[derive(Serialize)]
pub struct PayIntentResponse {
    pub intent: PaymentIntent,
    pub instructions: String,
}

#[derive(Deserialize)]
pub struct VerifyRequest {
    pub receipt: String,
}

impl PaymentIntent {
    pub fn new(amount: u64, token: String) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            amount,
            token,
            expires_at: (chrono::Utc::now() + chrono::Duration::minutes(15)).timestamp() as u64,
            privacy_mode: "elusiv".to_string(),
        }
    }
}
