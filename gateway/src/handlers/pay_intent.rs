use actix_web::{post, web, HttpResponse, Responder};
use crate::types::{PayIntentRequest, PayIntentResponse, PaymentIntent};

#[post("/pay-intent")]
pub async fn pay_intent(req: web::Json<PayIntentRequest>) -> impl Responder {
    let intent = PaymentIntent::new(req.amount, req.token.clone());

    let response = PayIntentResponse {
        intent: intent.clone(),
        instructions: format!(
            "Use Elusiv SDK to send {} {} to shielded pool with memo: {}",
            req.amount, req.token, intent.id
        ),
    };

    // In prod: store in Redis/DB + start watcher
    println!("Intent created: {}", intent.id);

    HttpResponse::Ok().json(response)
}
