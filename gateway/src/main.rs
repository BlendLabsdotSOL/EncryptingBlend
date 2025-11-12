use actix_web::{App, HttpServer, web};
use dotenvy::dotenv;
use std::env;

mod handlers;
mod middleware;
mod types;

use handlers::{pay_intent, verify_receipt};
use middleware::x402_middleware;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let port = env::var("PORT").unwrap_or("3000".to_string());
    let merchant_pubkey = env::var("MERCHANT_PUBKEY").unwrap();

    println!("x402 Private Gateway starting on :{}", port);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(merchant_pubkey.clone()))
            // Public paid content
            .route("/premium", web::get().to(
                x402_middleware(1_000_000, "USDC", "/pay-intent".to_string())
            ).wrap(actix_web::middleware::Logger::default()))
            // Gateway APIs
            .service(pay_intent)
            .service(verify_receipt)
    })
    .bind(format!("0.0.0.0:{}", port))?
    .run()
    .await
}
