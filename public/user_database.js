class WebSocketConnection {
  constructor() {
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.addEventListener("open", (event) => {
      console.log("WebSocket connection established");
    });

    this.socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed");
    });

    this.socket.addEventListener("error", (event) => {
      console.error("WebSocket connection error:", event.error);
    });

    this.socket.addEventListener("message", (event) => {
      const message = event.data;
      console.log("Received message from WebSocket:", message);
    });
  }

  connect() {
    return this.socket;
  }
}

const socketConnection = new WebSocketConnection();
const socket = socketConnection.connect();

function broadcastEvent(username, level, creatureName, onSuccess, onError) {
  const event = {
    type: "newPost",
    data: {
      username,
      level,
      creatureName,
    },
  };

  if (socket.readyState === WebSocket.OPEN) {
    try {
      socket.send(JSON.stringify(event));
      onSuccess();
    } catch (error) {
      onError(error);
    }
  } else if (socket.readyState === WebSocket.CONNECTING) {
    socket.addEventListener("open", () => {
      try {
        socket.send(JSON.stringify(event));
        onSuccess();
      } catch (error) {
        onError(error);
      }
    });
  } else {
    const error = new Error("WebSocket connection not open. Message not sent.");
    onError(error);
  }
}

function displayMessage(owner, level, name) {
  const messageContainer = document.getElementById("forumUpdateMsg");
  messageContainer.textContent = `${owner} just created a level ${level} ${name}!`;

  messageContainer.style.opacity = "0.7";
  messageContainer.style.display = "block";
  messageContainer.style.width = "150px";
  messageContainer.style.height = "50px";
  messageContainer.style.padding = "5px";
  messageContainer.style.fontSize = "12px";

  setTimeout(() => {
    messageContainer.style.opacity = "0";
    setTimeout(() => {
      messageContainer.style.display = "none";
    }, 1000);
  }, 3000);
}

function broadcastEventSuccessCallback(creature) {
  displayMessage(creature.owner, creature.level, creature.name);
}

function broadcastEventErrorCallback(error) {
  console.error("Error sending WebSocket message:", error);
}

async function loadCurrentUserCreatures() {
  let creatures = [];

  try {
    // Get the latest creature from the service
    const response = await fetch("/api/creatures");
    const responseData = await response.json();
    console.log("Response data:", responseData);
    creatures = responseData;

    // Save the currentUserCreatures in case we go offline in the future
    localStorage.setItem("allCreatures", JSON.stringify(creatures));
  } catch {
    // If there was an error then just use the last saved currentUserCreatures
    const creaturesText = localStorage.getItem("allCreatures");
    if (creaturesText) {
      creatures = JSON.parse(creaturesText);
    }
  }

  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  // Display each creature that is associated with the current user's username
  creatures.forEach((creature, i) => {
    if (creature.owner == getUsername()) {
      const tableRow = document.createElement("tr");
      tableRow.setAttribute("class", "table-light");

      const level = document.createElement("th");
      level.setAttribute("scope", "row");
      level.textContent = creature.level;
      tableRow.appendChild(level);

      const name = document.createElement("td");
      name.textContent = creature.name;
      tableRow.appendChild(name);

      const date = document.createElement("td");
      date.textContent = creature.createdDate;
      tableRow.appendChild(date);

      const actions = document.createElement("td");
      const edit = document.createElement("button");
      edit.setAttribute("type", "button");
      edit.setAttribute("name", "edit");
      edit.classList.add("fa", "fa-edit");
      actions.appendChild(edit);
      edit.addEventListener("click", () => {
        localStorage.setItem("loadCreature", creature.creatureId);
        window.location.href = "creature_creator.html";
      });

      const upload = document.createElement("button");
      upload.setAttribute("type", "button");
      upload.setAttribute("name", "upload");
      upload.classList.add("fa", "fa-upload");
      actions.appendChild(upload);
      upload.addEventListener("click", async () => {
        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(creature),
          });

          // Store what the service gave us as the forum
          const forum = await response.json();
          localStorage.setItem("forum", JSON.stringify(forum));

          // socket.send(creature.owner + ' just created a level ' + creature.level + ' ' + creature.name);
          broadcastEvent(
            creature.owner,
            creature.level,
            creature.name,
            () => broadcastEventSuccessCallback(creature),
            broadcastEventErrorCallback
          );
        } catch {
          // If there was an error then just track the forum locally
          uploadCreatureLocal(creature);
        }
      });

      const trash = document.createElement("button");
      trash.setAttribute("type", "button");
      trash.setAttribute("name", "delete");
      trash.classList.add("fa", "fa-trash");
      actions.appendChild(trash);
      trash.addEventListener("click", async () => {
        try {
          const response = await fetch("/api/delete", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(creature.creatureId),
          });

          const deleteMessage = await response.json();
          console.log(deleteMessage);
        } catch {
          deleteCreatureLocal(i);
        }

        tableRow.remove();
      });

      tableRow.appendChild(actions);
      tableBody.appendChild(tableRow);
    }
  });
}

function uploadCreatureLocal(creature) {
  let forum = [];
  const forumText = localStorage.getItem("forum");
  if (forumText) {
    forum = JSON.parse(forumText);
    for (var i = 0; i < forum.length; i++) {
      if (forum[i].creatureId == creature.creatureId) {
        forum.splice(i, 1);
        break;
      }
    }
  }
  forum.push(creature);
  localStorage.setItem("forum", JSON.stringify(forum));
}

function deleteCreatureLocal(i) {
  let creatures = [];
  const creaturesText = localStorage.getItem("allCreatures");
  if (creaturesText) {
    creatures = JSON.parse(creaturesText);
  }
  creatures.splice(i, 1);
  localStorage.setItem("allCreatures", JSON.stringify(creatures));
}

function getUsername() {
  return localStorage.getItem("userName") || "Unknown";
}

function insertUsername() {
  const usernameElement = document.getElementById("username");
  const username = getUsername();

  if (username && username !== "Unknown") {
    usernameElement.innerHTML = username;
  } else {
    usernameElement.innerHTML = "Unknown";
  }
}

function newMonster() {
  localStorage.setItem("loadCreature", "new");
  window.location.href = "creature_creator.html";
}

function logout() {
  localStorage.removeItem("userName");
  fetch(`/api/auth/logout`, {
    method: "delete",
  }).then(() => (window.location.href = "index.html"));
}

insertUsername();
loadCurrentUserCreatures();