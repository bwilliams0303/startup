function newMonster() {
  localStorage.setItem("loadCreature", "new");
}

// const targetNode = document.querySelector("tbody");
// const observer = new MutationObserver((mutationsList) => {
//   for (const mutation of mutationsList) {
//     if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
//       handleNewPosts(mutation.addedNodes);
//     }
//   }
// });

// const observerConfig = {
//   childList: true,
// };

// observer.observe(targetNode, observerConfig);

// function handleNewPosts(newNodes) {
//   for (const node of newNodes) {
//     if (node.nodeName === "TR") {
//       const username = getUsername();
//       const level = node.querySelector("th")?.textContent || "";
//       const creatureName =
//         node.querySelector("td:first-child")?.textContent || "";
//       showToast(username, level, creatureName);
//       console.log("New Post on Forum: " + node);
//     }
//   }
// }

// function getUsername() {
//   return localStorage.getItem("userName") || "Unknown";
// }

// function showToast(username, level, creatureName) {
//   const toast = new bootstrap.Toast(document.getElementById("liveToast"));
//   const popupUser = document.querySelector("#popupUser");
//   popupUser.textContent = username;

//   const popupLevel = document.querySelector("#popupLevel");
//   popupLevel.textContent = level;

//   const popupName = document.querySelector("#popupName");
//   popupName.textContent = creatureName;

//   toast.show();
// }

async function loadForum() {
  let forumCreatures = [];

  try {
    // Get the latest creature from the service
    const response = await fetch("/api/forum");
    const responseData = await response.json();
    console.log("Response data:", responseData); // Log the response data for debugging
    forumCreatures = responseData;

    // Save the currentUserCreatures in case we go offline in the future
    localStorage.setItem("forum", JSON.stringify(forumCreatures));
  } catch {
    // If there was an error then just use the last saved currentUserCreatures
    const forumText = localStorage.getItem("forum");
    if (forumText) {
      forumCreatures = JSON.parse(forumText);
    }
  }

  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  forumCreatures.forEach((creature, i) => {
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("class", "table-light");

    const level = document.createElement("th");
    level.setAttribute("scope", "row");
    level.textContent = creature.level;
    tableRow.appendChild(level);

    const name = document.createElement("td");
    name.textContent = creature.name;
    tableRow.appendChild(name);

    const owner = document.createElement("td");
    owner.textContent = creature.owner;
    tableRow.appendChild(owner);

    const date = document.createElement("td");
    date.textContent = creature.createdDate;
    tableRow.appendChild(date);

    const view = document.createElement("td");
    const viewButton = document.createElement("button");
    viewButton.setAttribute("type", "button");
    viewButton.setAttribute("name", "download");
    viewButton.classList.add("fa", "fa-eye");
    view.appendChild(viewButton);
    viewButton.addEventListener("click", () => {
      localStorage.setItem("loadCreature", creature.creatureId);
      window.location.href = "creature_creator.html";
    });

    tableRow.appendChild(view);
    tableBody.appendChild(tableRow);
  });
}

loadForum();
