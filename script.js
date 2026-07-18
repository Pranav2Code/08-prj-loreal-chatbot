/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Set initial message
chatWindow.textContent = "👋 Hello! How can I help you today?";

const workerUrl = "https://banana-bot.423prao.workers.dev/";

/* Handle form submit */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Send the user's message to the worker as a messages array.
  sendmessagetoOpenAI(userInput);
});

async function sendmessagetoOpenAI(userInput) {
  try {
    // Create an array of message objects for OpenAI.
    const messages = [
      {
        role: "system",
        content: "You are a L'Oreal Paris customer service assistant. You are helpful, friendly, and professional. You will only answer questions related to L'Oreal Paris products and services. If the user asks a question that is not related to L'Oreal Paris, politely inform them that you can only provide assistance with L'Oreal Paris products and services.",
      },
      {
        role: "user",
        content: userInput.value.trim(),
      },
    ];
    const response = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    // Show the assistant reply in the chat window.
    chatWindow.textContent = reply;
  } catch (error) {
    console.error(`There was an error, ${error}`);
  }
}
