const accountsOpts = {
    LOCAL: [
        {
            username: "administrator@asttravel.com.vn",
            password: "y!PRSwqG[NVdH{1(h6L",
            backupCode: "92XX1AL2, BFUWXLMN, VQMGSKX3, 3ZYDYHTH, V6EP2XEQ, WYZNAHNB, 6X0ST3JM, 4SCSBXAN"
        },
        {
            username: "tuankhaixp258@gmail.com",
            password: "eCZxzJi+o}h4[@FvI[K",
            backupCode: "UJC2CUNP, 9GOQC93P, XNO3MFQ4, HKGC8LSV, Z4ZQX0II, HMBFV6A0, 8PMVZTQX, 6F0LYW6Y"
        },
        {
            username: "hoangtu.bookerast@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.corpLearWithWorkflow@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.corpMemberWithWorkflow@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.corpLeadWithoutWorkflow@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.corpMemberWithoutWorkflow@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.hotel@asttravel.com.vn",
            password: "Ast@575724"
        },
    ],
    UAT: [
        {
            username: "administrator@asttravel.com.vn",
            password: "y!PRSwqG[NVdH{1(h6L",
            backupCode: "92XX1AL2, BFUWXLMN, VQMGSKX3, 3ZYDYHTH, V6EP2XEQ, WYZNAHNB, 6X0ST3JM, 4SCSBXAN"
        },
        {
            username: "tuankhaixp258@gmail.com",
            password: "eCZxzJi+o}h4[@FvI[K",
            backupCode: "UJC2CUNP, 9GOQC93P, XNO3MFQ4, HKGC8LSV, Z4ZQX0II, HMBFV6A0, 8PMVZTQX, 6F0LYW6Y"
        },
        {
            username: "hoangtu.bookerast@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.corpLearWithWorkflow@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.corpMemberWithWorkflow@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.corpLeadWithoutWorkflow@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.corpMemberWithoutWorkflow@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.hotel@asttravel.com.vn",
            password: "Ast@575724"
        },
    ],
    PROD: [
        {
            username: "administrator@asttravel.com.vn",
            password: "y!PRSwqG[NVdH{1(h6L",
            backupCode: "92XX1AL2, BFUWXLMN, VQMGSKX3, 3ZYDYHTH, V6EP2XEQ, WYZNAHNB, 6X0ST3JM, 4SCSBXAN"
        },
        {
            username: "tuankhaixp258@gmail.com",
            password: "eCZxzJi+o}h4[@FvI[K",
            backupCode: "UJC2CUNP, 9GOQC93P, XNO3MFQ4, HKGC8LSV, Z4ZQX0II, HMBFV6A0, 8PMVZTQX, 6F0LYW6Y"
        },
        {
            username: "hoangtu.bookerast@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.corpLearWithWorkflow@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.corpMemberWithWorkflow@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.corpLeadWithoutWorkflow@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.corpMemberWithoutWorkflow@asttravel.com.vn",
            password: "Ast@575724"
        },
        {
            username: "hoangtu.hotel@asttravel.com.vn",
            password: "Ast@575724"
        },
    ]
}

const LOCAL = "http://localhost:3500";
const UAT = "https://uat-hotel.ast.com.vn";
const PROD = "https://khachsan.ast.com.vn";
const ENV = window.location.href.includes(LOCAL) ? "LOCAL" : window.location.href.includes(UAT) ? "UAT" : window.location.href.includes(PROD) ? "PROD" : null;
const accounts = accountsOpts[ENV];

function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const interval = 50;
        let elapsed = 0;

        const timer = setInterval(() => {
            const el = document.querySelector(selector);
            if (el) {
                clearInterval(timer);
                resolve(el);
            }

            elapsed += interval;
            if (elapsed >= timeout) {
                clearInterval(timer);
                reject("Timeout: " + selector);
            }
        }, interval);
    });
}

function setInputValue(el, value) {
    if (!el) return;

    const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
    ).set;

    setter.call(el, value);

    el.dispatchEvent(new Event("input", { bubbles: true }));
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function attachAutocomplete(input) {
    let currentIndex = -1;
    let currentList = [];

    const box = document.createElement("div");
    Object.assign(box.style, {
        position: "absolute",
        border: "1px solid #ccc",
        background: "#fff",
        zIndex: 9999,
        maxHeight: "300px",
        overflowY: "auto",
        display: "none",
        fontSize: "13px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        borderRadius: "8px",
        backgroundColor: "#191c20",
        color: "#fff",
    });

    document.body.appendChild(box);

    function render(list) {
        currentList = list;

        if (!list.length) {
            box.style.display = "none";
            return;
        }

        box.innerHTML = list
            .map((acc, i) => `
        <div data-index="${i}" style="padding:6px 12px; cursor:pointer">
          ${acc.username}
        </div>
      `)
            .join("");

        const rect = input.getBoundingClientRect();

        // render trước để đo height
        box.style.display = "block";
        box.style.visibility = "hidden";

        const boxHeight = box.offsetHeight;
        let top = rect.top + window.scrollY - boxHeight;
        if (top < 0) top = rect.bottom + window.scrollY;
        box.style.top = top - 5 + "px";

        // const top = rect.bottom + window.scrollY;
        // box.style.top = top + "px";

        box.style.left = rect.left + window.scrollX + "px";
        box.style.width = rect.width + "px";
        box.style.visibility = "visible";

        [...box.children].forEach((el, i) => {
            el.onmouseenter = () => highlight(i);
            el.onclick = () => select(currentList[i]);
        });
    }

    function highlight(index) {
        currentIndex = index;
        [...box.children].forEach((el, i) => {
            el.style.background = i === index ? "#303337" : "#191c20";
        });
    }

    function select(acc) {
        setInputValue(input, acc.username);
        box.style.display = "none";
        currentIndex = -1;
    }

    function filter(value) {
        const v = value.toLowerCase();
        return accounts.filter(acc =>
            acc.username.toLowerCase().includes(v)
        );
    }

    // focus → show all
    input.addEventListener("focus", () => {
        currentIndex = -1;
        render(accounts);
    });

    // input → filter
    input.addEventListener("input", (e) => {
        currentIndex = -1;
        render(filter(e.target.value));
    });

    // keyboard navigation
    input.addEventListener("keydown", (e) => {
        const items = box.children;
        if (!items.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % items.length;
            highlight(currentIndex);
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            highlight(currentIndex);
        }

        if (e.key === "Enter" && currentIndex >= 0) {
            e.preventDefault();
            select(currentList[currentIndex]);
        }
    });

    // click ngoài → hide
    document.addEventListener("click", (e) => {
        if (!box.contains(e.target) && e.target !== input) {
            box.style.display = "none";
        }
    });
}

let lastHandledUsername = null;
async function onSubmit(username) {
    const account = accounts.find(acc => acc.username === (username || "").trim());

    // nếu không match → reset trạng thái
    if (!account) {
        lastHandledUsername = null;
        return;
    }

    // nếu đã xử lý username này rồi → bỏ qua
    // if (lastHandledUsername === account.username) return;

    lastHandledUsername = account.username;

    await sleep(100);

    const passwordInput = await waitForElement('[data-testid="input-password"] input');
    const loginBtn = await waitForElement('[data-testid="btn-login"]');

    setInputValue(passwordInput, account.password);

    loginBtn.click();

    await onSubmit2FaDialog(account);
}

async function onSubmit2FaDialog(account) {
    if (!account.backupCode) return;

    const use2FABtn = await waitForElement('[data-testid="btn-use-code-2fa"]');
    use2FABtn.click();

    const backupCodeInput = await waitForElement('[data-testid="input-code-2fa"] input');
    await setInputValue(backupCodeInput, account.backupCode);

    const submit2FABtn = await waitForElement('[data-testid="btn-submit-2fa"]');
    submit2FABtn.click();
}

(async () => {
    console.log("Start JS");
    if (!ENV) return;

    const usernameInput = await waitForElement('[data-testid="input-username"] input');
    if (!usernameInput) return;

    console.log("Adding event listener");
    const loginBtn = await waitForElement('[data-testid="btn-login"]');
    loginBtn.addEventListener("click", async (e) => {
        const account = accounts.find(acc => acc.username === (usernameInput.value || "").trim());
        await onSubmit2FaDialog(account);
    });

    usernameInput.addEventListener("keyup", async (e) => {
        // console.log("keyup: ", e.target.value);
        await onSubmit(e.target.value);
    });

    usernameInput.addEventListener("dblclick", async (e) => {
        // console.log("dblclick: ", e.target.value);
        await onSubmit(e.target.value);
    });

    attachAutocomplete(usernameInput);

    const helpText = await waitForElement('[data-testid="help-text"]');
    helpText.innerHTML += `<span style="background-color:#4da6ff; color:#fff; margin-left:6px; border-radius: 50%; padding: 1px 3px; font-size: 8px;">✔</span>`;
})();