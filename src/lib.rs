use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn collatz(n: String) -> String {
    log("TABLE_START");
    log("Step|Number|Calculation");
    let mut n: u128 = n.trim().parse().unwrap_or(1);
    let mut i: u128 = 0;
    log(&format!("{}|{}|", i.to_string(), n.to_string()));
    while n != 1 {
        if n % 2 == 0 {
            n = n / 2;
            i += 1;
            log(&format!("{}|{}|n/2", i.to_string(), n.to_string()));
        } else {
            n = 3 * n + 1;
            i += 1;
            log(&format!("{}|{}|3n+1", i.to_string(), n.to_string()));
        }
    }
    log("TABLE_END");
    i.to_string()
}
