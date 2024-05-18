document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('toggle-password');

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.src = type === 'password' ? 'invisibleeye.png' : 'visibleeye.png';
    });
});

document.getElementById("login-form").addEventListener("submit", function (t) {
    t.preventDefault();
    const o = document.getElementById("password").value;
    const e = 10;
    let n = parseInt(localStorage.getItem("loginAttempts")) || 0;
    let s = localStorage.getItem("isLockedOut") === "true";
    if (s) {
        alert("Your account is locked due to too many failed attempts. contact me cuz ur bad.");
        return;
    }
    function c(t) {
        const o = document.createElement("div");
        o.appendChild(document.createTextNode(t));
        return o.innerHTML;
    }
    function r(t) {
        const o = {};
        const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const n = "ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba";
        for (let t = 0; t < e.length; t++) {
            o[e[t]] = n[t];
        }
        return t.split("").map(t => o[t] || t).join("");
    }
    function u(t) {
        return atob(t);
    }
    function a(t) {
        const o = u(t);
        return r(o);
    }
    function l() {
        console.log("Random noise 1");
        return Math.random() * 100;
    }
    function i() {
        let o = [];
        for (let t = 0; t < 10; t++) {
            o.push(Math.random());
        }
        return o;
    }
    function f(t) {
        return t.split("").reverse().join("");
    }
    function m() {
        return (new Date).toISOString();
    }
    const d = "This is noise";
    const g = 12345;
    const p = { key: "value" };
    const w = [1, 2, 3, 4, 5];
    const h = true;
    console.log(l(), i(), f(d), m());
    console.log(d, g, p, w, h);
    const k = "b2Ztemd2NDk4MTI2VFpHVg==";
    const A = a(k);
    const S = c(o);
    if (S === A) {
        alert("Welcome to Lunate, Premium User");
        sessionStorage.setItem("levelOfAccess", "noAds");
        window.location.replace("transform.html");
    } else if (S === "") {
        sessionStorage.setItem("levelOfAccess", "yesAds");
        window.location.replace("transform.html");
    } else {
        n++;
        localStorage.setItem("loginAttempts", n);
        alert("Incorrect password. You have " + (e - n) + " attempt(s) left.");
        if (n >= e) {
            localStorage.setItem("isLockedOut", "true");
            alert("Too many failed attempts. Your account is now locked. l bozo ur trash kid");
        }
    }
});
