let price = document.getElementById("price");
let title = document.getElementById("title");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
console.log(price, title, taxes, ads, total, count, category, submit, discount);
let tmp;
let mood = "create";

//?* get Total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +ads.value + +taxes.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040 ";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02 ";
  }
}

//?& create product

let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count < 100
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    }  else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
};

//?& Clear inputs
 
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//?* Read
function showData() {
  getTotal();

  let tbody = "";
  for (let i = 0; i < dataPro.length; i++) {
    tbody += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td>
        <button onclick="updateData(${i})" class="btn btn-warning" id="update">Update</button>
    </td>
    <td>
        <button onclick=" deleteData(${i})" class="btn btn-warning" id="delate">Delate</button>
    </td>
</tr>
    
    `;
  }
  document.getElementById("tbody").innerHTML = tbody;

  let deleteData = document.getElementById("delete-all");
  if (dataPro.length > 0) {
    deleteData.innerHTML = `
    <button onclick = "deleteAll()" class="btn btn-danger col-4 my-4 rounded-pill" type="button">Delete All   (${dataPro.length})</button>
    
    `;
  } else {
    deleteData.innerHTML = "";
  }
}
showData();
// ===========================

//?& Delete

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

// ==================================

//? Delete All
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

//? cont
// ...

//? update

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  ads.value = dataPro[i].ads;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({ top: 0, behavior: "smooth" });
}

//? search

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}
// =====================

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td>
        <button onclick="updateData(${i})" class="btn btn-warning" id="update">Update</button>
    </td>
    <td>
        <button onclick="deleteData(${i})" class="btn btn-warning" id="delate">Delate</button>
    </td>
</tr>
    
    `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
    <tr>
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td>
        <button onclick="updateData(${i})" class="btn btn-warning" id="update">Update</button>
    </td>
    <td>
        <button onclick="deleteData(${i})" class="btn btn-warning" id="delate">Delate</button>
    </td>
</tr>
    
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
