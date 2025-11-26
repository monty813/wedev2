document.getElementById("firstButton").addEventListener("click", () => {
    alert("lmaolmao...");
    console.log("This goes to the Console");
    document.getElementById("somePTag").innerHTML = "Monkey";
});

document.getElementById("3").addEventListener("click", () => {
    document.getElementById("3").innerHTML =
        "+" + (parseInt(document.getElementById("3").innerHTML) + 1)
});


const cardContainer = document.getElementById('cardContainer');
const addBtn = document.getElementById('addCard');

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

    // FIXED: This must be INSIDE the click listener
    col.appendChild(card);
    cardContainer.appendChild(col);

    counter++;
});


// DELETE handler
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteBtn')) {
        const card = event.target.closest('.card');
        console.log('Deleting card with ID:', card.dataset.cardId);
        card.parentElement.remove();
    }
});


// LIKE handler (FIXED)
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('likeBtn')) {

        const btn = event.target;

        let likes = parseInt(btn.dataset.likes);
        likes++;

        btn.dataset.likes = likes;
        btn.innerHTML = `❤️ ${likes}`;
    }
});
