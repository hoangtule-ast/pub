const LOCAL = "http://localhost:3500";
const UAT = "https://uat-hotel.ast.com.vn";
const PROD = "https://khachsan.ast.com.vn";
const linkFile = "https://raw.githubusercontent.com/hoangtule-ast/pub/refs/heads/main/src/login.js";

async function init() {
    console.log("init");
    const SCRIPT_ID = "my-injected-script";

    // nếu đã tồn tại thì không chạy nữa
    if (document.getElementById(SCRIPT_ID)) {
        console.log("đã có script");
        return;
    };
    console.log("add script");

    const res = await fetch(linkFile);
    const code = await res.text();
    const wrappedCode = `(async () => { ${code} })().catch(console.error);`;

    const script = document.createElement("script");
    script.type = "module";
    script.id = SCRIPT_ID;
    script.textContent = wrappedCode;

    document.documentElement.appendChild(script);
}

let lastUrl = null;
setInterval(() => {
    if (location.href !== lastUrl && [LOCAL, UAT, PROD].map(p => `${p}/core/auth/login`).some(p => location.href.includes(p))) {
        lastUrl = location.href;
        init();
    }
}, 300);

