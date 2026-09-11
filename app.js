const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-button");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const turnText = document.querySelector("#turn");

let turnO = true;
let moveCount = 0;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const updateTurn = () => {
    turnText.textContent = turnO ? "O's Turn" : "X's Turn";
};

const checkWinner = () => {
    for (const pattern of winPatterns) {
        const pos1Val = boxes[pattern[0]].textContent;
        const pos2Val = boxes[pattern[1]].textContent;
        const pos3Val = boxes[pattern[2]].textContent;

        if (
            pos1Val !== "" &&
            pos1Val === pos2Val &&
            pos2Val === pos3Val
        ) {
            showMessage(`🎉 Winner: ${pos1Val} 🎉`);
            return true;
        }
    }

    if (moveCount === 9) {
        showMessage("😐 It's a Draw!");
        return true;
    }

    return false;
};

const showMessage = (message) => {
    msg.textContent = message;
    msgContainer.classList.remove("hide");
    turnText.textContent = "";
    gameOver = true;
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.textContent = "";
        box.style.color = "";
    });
};

const resetGame = () => {
    turnO = true;
    moveCount = 0;
    gameOver = false;
    msgContainer.classList.add("hide");
    enableBoxes();
    updateTurn();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.textContent !== "") {
            return;
        }

        if (turnO) {
            box.textContent = "O";
            box.style.color = "#800e13";
        } else {
            box.textContent = "X";
            box.style.color = "#231942";
        }

        box.disabled = true;
        moveCount++;

        const finished = checkWinner();

        if (!finished) {
            turnO = !turnO;
            updateTurn();
        }
    });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

updateTurn();
