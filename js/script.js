//================ DISPLAY =================//

const display = document.getElementById("display");

const buttons = document.querySelectorAll(".buttons button");

const historyList = document.getElementById("history-list");

let history = [];

//================ BUTTON CLICK =================//

buttons.forEach(button => {

    button.addEventListener("click", () => {

        let value = button.innerText;

        switch (value) {

            case "AC":
                display.value = "";
                break;

            case "⌫":
                display.value = display.value.slice(0, -1);
                break;

            case "=":

                if (display.value === "") return;

                try {

                    let expression = display.value.replace(/%/g, "/100");

                    let result = eval(expression);

                    history.unshift(display.value + " = " + result);

                    updateHistory();

                    display.value = result;

                }

                catch {

                    display.value = "Error";

                }

                break;

            default:

                display.value += value;

        }

    });

});

//================ HISTORY =================//

function updateHistory() {

    historyList.innerHTML = "";

    history.slice(0, 10).forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

    });

}
//================ DARK MODE =================//

const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("dark")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});

//================ KEYBOARD SUPPORT =================//

document.addEventListener("keydown", (e) => {

    const key = e.key;

    if (!isNaN(key) || "+-*/.%".includes(key)) {

        display.value += key;

    }

    else if (key === "Enter") {

        e.preventDefault();

        try {

            let expression = display.value.replace(/%/g, "/100");

            let result = eval(expression);

            history.unshift(display.value + " = " + result);

            updateHistory();

            display.value = result;

        }

        catch {

            display.value = "Error";

        }

    }

    else if (key === "Backspace") {

        display.value = display.value.slice(0, -1);

    }

    else if (key === "Delete") {

        display.value = "";

    }

});
//================ PREVENT DOUBLE OPERATORS =================//

const operators = ["+", "-", "*", "/", "%", "."];

buttons.forEach(button => {

    button.addEventListener("click", () => {

        let value = button.innerText;

        if (operators.includes(value)) {

            let lastChar = display.value.slice(-1);

            if (operators.includes(lastChar)) {

                display.value =
                    display.value.slice(0, -1) + value;

            }

        }

    });

});

//================ REMOVE DEFAULT HISTORY =================//

function updateHistory() {

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML = "<li>No calculations yet</li>";

        return;

    }

    history.slice(0,10).forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        historyList.appendChild(li);

    });

}

//================ CLEAR ERROR =================//

display.addEventListener("click",()=>{

    if(display.value==="Error"){

        display.value="";

    }

});
//================ CLEAR HISTORY =================//

const clearHistoryBtn = document.getElementById("clear-history");

clearHistoryBtn.addEventListener("click",()=>{

    history=[];

    updateHistory();

});

//================ COPY RESULT =================//

const copyBtn=document.querySelector(".copy-btn");

copyBtn.addEventListener("click",()=>{

    if(display.value==="") return;

    navigator.clipboard.writeText(display.value);

    copyBtn.innerHTML='<i class="fa-solid fa-check"></i> Copied!';

    setTimeout(()=>{

        copyBtn.innerHTML='<i class="fa-solid fa-copy"></i> Copy Result';

    },1500);

});