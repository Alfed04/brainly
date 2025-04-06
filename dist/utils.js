"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(len) {
    const options = "asdfghjklqwertyuiopzxcvbnm@4312567829";
    const length = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor((Math.random() * length))];
    }
    return ans;
}
