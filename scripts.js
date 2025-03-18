const apiKey = "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"; // Replace with your OpenAI API key
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const userMessage = userInput.value;
    if (!userMessage) return;

    // Display user message
    appendMessage("You", userMessage);
    userInput.value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4", // Use gpt-3.5-turbo if you don't have access to gpt-4
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;
        appendMessage("GPT", reply);
    } catch (error) {
        console.error("Error:", error);
        appendMessage("GPT", "Oops! Something went wrong.");
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to the latest message
}
