let registeredData = JSON.parse(localStorage.getItem("registeredData")) || [];

document.getElementById("recordForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();

  if (!firstName || !lastName) return;

  const entry = {
    firstName,
    lastName,
    timestamp: new Date().toLocaleString()
  };

  registeredData.push(entry);
  localStorage.setItem("registeredData", JSON.stringify(registeredData));
  document.getElementById("recordForm").reset();
  alert("User Registered!");

  if (document.getElementById("registeredListTab").classList.contains("active")) {
    updateRegisteredList();
  }
});

function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`).classList.add("active");

  if (tabId === "registeredListTab") {
    updateRegisteredList();
  }
}

function updateRegisteredList() {
    const tableBody = document.querySelector("#registeredTable tbody");
    const data = JSON.parse(localStorage.getItem("registeredData")) || [];
  
    tableBody.innerHTML = "";
  
    if (data.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No records found.</td></tr>';
      return;
    }
  
    data.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.firstName}</td>
        <td>${entry.lastName}</td>
        <td style="text-align: center;">${entry.timestamp}</td>
        <td style="text-align: center;">
          <button onclick="deleteEntry(${index})" style="
            background-color: red;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          ">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  
