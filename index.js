const btnEl = document.getElementById("btn");
const emojiNameEl = document.getElementById("emoji-name");

let emojis = [];

async function getEmojis() {
    try {
        const response = await fetch("https://emoji-api.com/emojis?access_key=773b58f681fb786fafdb8392e8b8a75ddc177fd1");
        const data = await response.json();

        emojis = data.slice(0, 1500).map((emoji) => ({
            emojiName: emoji.character,
            emojiCode: emoji.unicodeName,  
        }));

        btnEl.innerText = "Get Random Emoji";
        btnEl.disabled = false;
    } catch (error) {
        console.error("Data could not be received");
        btnEl.innerText = "Error Loading Emojis";
    }
}

getEmojis();

btnEl.addEventListener("click", () => {
    if (emojis.length === 0) {
        btnEl.innerText = "Loading...";
        return;  
    }

    const randomIndex = Math.floor(Math.random() * emojis.length);
    btnEl.innerText = emojis[randomIndex].emojiName;
    emojiNameEl.innerText = emojis[randomIndex].emojiCode;
});
