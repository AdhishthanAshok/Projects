async function sendMessage() {
  const userInput = document.getElementById("userInput");
  const chatBody = document.getElementById("chatBody");

  const userMessage = userInput.value;

  const userMessageElement = document.createElement("div");
  userMessageElement.className = "user-message";
  userMessageElement.textContent = userMessage;
  chatBody.appendChild(userMessageElement);

  const loadingMessageElement = document.createElement("div");
  loadingMessageElement.className = "loading-message";
  loadingMessageElement.textContent = "Generating the response....";
  chatBody.appendChild(loadingMessageElement);

  const url = "https://robomatic-ai.p.rapidapi.com/api";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "05d4449ebemsh26f52f204d83b58p14a84bjsne331f949f69b",
      "X-RapidAPI-Host": "robomatic-ai.p.rapidapi.com",
    },
    body: new URLSearchParams({
      in: userMessage,
      op: "in",
      cbot: "1",
      SessionID: "RapidAPI1",
      cbid: "1",
      key: "RHMN5hnQ4wTYZBGCF3dfxzypt68rVP",
      ChatSource: "RapidAPI",
      duration: "1",
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const botResponse = result.out;

    chatBody.removeChild(loadingMessageElement);

    const botMessageElement = document.createElement("div");
    botMessageElement.className = "bot-message";
    botMessageElement.textContent = botResponse;
    chatBody.appendChild(botMessageElement);
  } catch (error) {
    console.error(error);
  }

  userInput.value = "";

  chatBody.scrollTop = chatBody.scrollHeight;
}
