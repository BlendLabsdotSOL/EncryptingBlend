use actix_web::{HttpResponse, Responder, web};
use serde_json::json;

pub fn x402_middleware(
    price: u64,
    token: &str,
    gateway_url: String,
) -> impl Fn(web::ReqData<String>, web::HttpRequest) -> impl std::future::Future<Output = impl Responder> {
    move |merchant_pubkey: web::ReqData<String>, req: web::HttpRequest| {
        async move {
            if req.headers().contains_key("x-receipt") {
                return HttpResponse::Ok().json(json!({
                    "message": "Welcome to private premium content!",
                    "paid_via": "x402 + Elusiv"
                }));
            }

            HttpResponse::PaymentRequired()
                .insert_header(("Pay", format!("{}?amount={}&asset={}", gateway_url, price, token)))
                .json(json!({
                    "error": "Payment Required",
                    "price": price,
                    "token": token,
                    "gateway": gateway_url
                }))
        }
    }
}
