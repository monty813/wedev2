// -----------------------------
// CLICKME BUTTON
// -----------------------------
const clickMeBtn = document.getElementById("clickMe");
if (clickMeBtn) {
    clickMeBtn.addEventListener("click", () => {
        alert("Hello from JS!");
        console.log("ClickMe button clicked");
        const p = document.getElementById("somePTag");
        if (p) p.innerHTML = "Other text";
    });
}

// -----------------------------
// FIRST BUTTON
// -----------------------------
const firstButton = document.getElementById("firstButton");
if (firstButton) {
    firstButton.addEventListener("click", () => {
        alert("lmaolmao...");
        console.log("First button clicked");
        const p = document.getElementById("somePTag");
        if (p) p.innerHTML = "Monkey";
    });
}

// -----------------------------
// BUTTON WITH ID 3 (increment counter)
// -----------------------------
const btn3 = document.getElementById("3");
if (btn3) {
    btn3.addEventListener("click", () => {
        btn3.innerHTML = "+" + (parseInt(btn3.innerHTML) + 1);
        console.log("Button 3 clicked, new value:", btn3.innerHTML);
    });
}

// -----------------------------
// CARDS PAGE (only runs if elements exist)
// -----------------------------
const cardContainer = document.getElementById('cardContainer');
const addBtn = document.getElementById('addCard');

if (cardContainer && addBtn) {
    let counter = 1;

    addBtn.addEventListener('click', () => {
        const col = document.createElement('div');
        col.className = 'col-sm-4';

        const card = document.createElement('div');
        card.className = 'card p-3';
        card.dataset.cardId = counter;

        const text123 = document.getElementById("textInput").value;

        card.innerHTML = `
            <h5>Card #${counter}</h5>
            <p>${text123}</p>
            <button class="btn btn-outline-primary likeBtn" data-likes="0">❤️ 0</button>
            <button class="btn btn-danger deleteBtn">Delete</button>
        `;

        col.appendChild(card);
        cardContainer.appendChild(col);

        counter++;
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteBtn')) {
            const card = event.target.closest('.card');
            card.parentElement.remove();
            console.log("Card deleted:", card.dataset.cardId);
        }

        if (event.target.classList.contains('likeBtn')) {
            const btn = event.target;
            let likes = parseInt(btn.dataset.likes) + 1;
            btn.dataset.likes = likes;
            btn.innerHTML = `❤️ ${likes}`;
            console.log("Card liked, total likes:", likes);
        }
    });
}

// -----------------------------
// TIMER PAGE (only runs if button exists)
// -----------------------------
const timerBtn = document.getElementById("timerStart");

if (timerBtn) {

    // --- STYLE FOR BOTH BUTTONS ---
    const styleButton = (btn) => {
        btn.style.padding = "6px 12px";
        btn.style.border = "1px solid #444";
        btn.style.borderRadius = "5px";
        btn.style.background = "#e6e6e6";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "14px";
        btn.style.marginLeft = "5px";
    };

    // --- CREATE TIMER DISPLAY BOX ---
    let timerDisplay = document.getElementById("timerDisplay");
    if (!timerDisplay) {
        timerDisplay = document.createElement("span");
        timerDisplay.id = "timerDisplay";
        timerDisplay.style.marginLeft = "10px";
        timerDisplay.style.padding = "4px 10px";
        timerDisplay.style.border = "1px solid #444";
        timerDisplay.style.borderRadius = "5px";
        timerDisplay.style.background = "#f8f8f8";
        timerDisplay.style.display = "inline-block";
        timerDisplay.style.minWidth = "70px";
        timerDisplay.style.textAlign = "center";
        timerBtn.parentElement.appendChild(timerDisplay);
    }
    timerDisplay.innerHTML = "00:00";

    // --- CREATE STOP BUTTON ---
    let stopBtn = document.getElementById("timerStop");
    if (!stopBtn) {
        stopBtn = document.createElement("button");
        stopBtn.id = "timerStop";
        stopBtn.textContent = "Stop";
        timerBtn.parentElement.appendChild(stopBtn);
    }

    styleButton(timerBtn);
    styleButton(stopBtn);

    let intervalID = -1;
    let timerToBeIncremented = 0;

    const formatTime = (totalSeconds) => {
        let minutes = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(2, "0");
        let seconds = (totalSeconds % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    // --- START ---
    timerBtn.addEventListener("click", () => {
        if (intervalID !== -1) return;

        intervalID = setInterval(() => {
            timerDisplay.innerHTML = formatTime(timerToBeIncremented);
            timerToBeIncremented++;
        }, 1000);
    });

    // --- STOP ---
    stopBtn.addEventListener("click", () => {
        if (intervalID !== -1) {
            clearInterval(intervalID);
            intervalID = -1;
        }
    });
}