
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://positivity-cb461-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const messagesInDB = ref(database, "messageList");

const subBtn = document.getElementById("submit-btn");
const inputFieldEl = document.getElementById("input-el");
const messageListEl = document.getElementById("ul-el");

subBtn.addEventListener("click", function() {
    let inputVal = inputFieldEl.value;
    push(messagesInDB, inputVal);
    clearInputField();
});

onValue(messagesInDB, function(snapshot) {
    if (snapshot.exists()) {
        let messageArray = Object.entries(snapshot.val());

        clearMessageListEl();

        for (let i = 0; i < messageArray.length; i++) {
            let currentMessage = messageArray[i];
            appendItemToMessageListEl(currentMessage);
        }
    } else {
        messageListEl.innerHTML = "No messages yet";
    }
});

function getRandomColor() {
    const letters = '23456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function appendItemToMessageListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.style.backgroundColor = getRandomColor()
    
    messageListEl.append(newEl);
}

function clearInputField() {
    inputFieldEl.value = "";
}

function clearMessageListEl() {
    messageListEl.innerHTML = "";
}