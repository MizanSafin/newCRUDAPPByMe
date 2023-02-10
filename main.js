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
let splicedItem;
let indexV;
function handleFormSubmit() {
  if (splicedItem == undefined) {
    const formData = fetchDataFromForm();
    sendDataToLS(formData);
    showDataToTable();
  } else {
    updateData();
  }
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
               <td class="action--btns">
                    <i onclick=deleteItem(${index})  class="fas fa-trash"></i>
                    <i onclick=editItem(${index})  class="fas fa-edit"></i>
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

function editItem(index) {
  indexV = index;
  splicedItem = dataArr.splice(index, 1);
  nameEl.value = splicedItem[0].name;
  jobEl.value = splicedItem[0].job;
  expEl.value = splicedItem[0].exp;
  localStorage.setItem("dataArr", JSON.stringify(dataArr));
  console.log(dataArr);
}

function updateData() {
  splicedItem[0].name = nameEl.value;
  splicedItem[0].job = jobEl.value;
  splicedItem[0].exp = expEl.value;
  dataArr.splice(indexV, 0, splicedItem[0]);
  localStorage.setItem("dataArr", JSON.stringify(dataArr));
  showDataToTable();
}

function resetForm() {
  nameEl.value = "";
  jobEl.value = "";
  expEl.value = "";
}

//Praccticing or problem solving
// let personsArr = [
//   {
//     name: "Mizan",
//     age: 28,
//   },
//   {
//     name: "Sadman",
//     age: 1,
//   },
//   {
//     name: "Sahanaj",
//     age: 2,
//   },
// ];
// let index = 1;
// const spliceItem = personsArr.splice(1, 1);
// spliceItem[0].age = 2;

// personsArr.splice(index, 0, spliceItem[0]);

// console.log(personsArr);
// const newArr = personsArr.map((item,index) => {
//   if (item.age === 1) {
//     return { name: "Sadman", age: 2 };
//   } else {
//     return item;
//   }
// });

// personsArr = newArr;
// console.log(personsArr);
// console.log(newArr);
