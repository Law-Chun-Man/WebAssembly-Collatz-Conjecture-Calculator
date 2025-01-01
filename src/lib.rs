use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn collatz(n: u32) -> u32 {
    log("TABLE_START");
    log("Step|Number|Calculation");
    let mut n = n;
    let mut i = 0;
    log(&format!("{}|{}|", i, n));
    while n != 1 {
        if n % 2 == 0 {
            n = n / 2;
            i += 1;
            log(&format!("{}|{}|n/2", i, n));
        } else {
            n = 3 * n + 1;
            i += 1;
            log(&format!("{}|{}|3n+1", i, n));
        }
    }
    log("TABLE_END");
    i
}
