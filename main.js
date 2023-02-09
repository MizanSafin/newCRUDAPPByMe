const nameEl = document.querySelector("input[name='Name']");
const jobEl = document.querySelector("input[name='job']");
const expEl = document.querySelector("input[name='exp']");
const tbodyEl = document.querySelector(".tbody");

const lsDataArr = JSON.parse(localStorage.getItem("dataArr"));

let dataArr;
if (lsDataArr) {
  dataArr = lsDataArr;
} else {
  dataArr = [];
}

function handleFormSubmit() {
  const formData = fetchDataFromForm();
  sendDataToLS(formData);
  showDataToTable();
  resetForm();
}

console.log(dataArr);
function fetchDataFromForm() {
  const formData = {};
  formData["name"] = nameEl.value;
  formData["job"] = jobEl.value;
  formData["exp"] = expEl.value;
  return formData;
}

function sendDataToLS(formData) {
  dataArr.push(formData);
  localStorage.setItem("dataArr", JSON.stringify(dataArr));
}

function showDataToTable() {
  tbodyEl.innerHTML = dataArr
    .map((item, index) => {
      return `
            <tr>
               <td>${item.name}</td>
               <td>${item.job}</td>
               <td>${item.exp}</td>
               <td>
                    <i onclick=deleteItem(${index})  class="fas fa-trash"></i>
               </td>
            </tr>
        `;
    })
    .join("");
}
showDataToTable();

function deleteItem(index) {
  dataArr.splice(index, index + 1);
  localStorage.setItem("dataArr", JSON.stringify(dataArr));
  showDataToTable();
}

function resetForm() {
  nameEl.value = "";
  jobEl.value = "";
  expEl.value = "";
}
