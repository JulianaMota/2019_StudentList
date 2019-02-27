"use strict";
const baseLink = "https://petlatkea.dk/2019/hogwarts/students.json";
const studentObject = {
  fullname: "-student name-",
  firstname: "-student first name-",
  lastname: "-student last name-",
  image: "-student image-",
  house: "-student house-"
};
let arrayOfStudents = [];
let filteredList = [];
let currentFilter;
let filter;
let currentSort;

window.addEventListener("DOMContentLoaded", init);

function init() {
  document.querySelector("#Gryffindor").addEventListener("click", filterList);
  document.querySelector("#Hufflepuff").addEventListener("click", filterList);
  document.querySelector("#Ravenclaw").addEventListener("click", filterList);
  document.querySelector("#Slytherin").addEventListener("click", filterList);
  document.querySelector("#btnAll").addEventListener("click", filterList);
  document.querySelector("#firstname").addEventListener("click", sortByFName);
  document.querySelector("#lastname").addEventListener("click", sortByLName);
  document.querySelector("#house").addEventListener("click", sortByHouse);
  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
  getJSON();
}

function getJSON() {
  //console.log("getJSON");
  fetch(baseLink)
    .then(pro => pro.json())
    .then(makeObject);
  // NOTE: Maybe also call sortByFirst the first time ... Investigate!
}
function makeObject(studentList) {
  //console.log(studentList);
  studentList.forEach(stuData => {
    const newStuObject = Object.create(studentObject);
    const firstSpace = stuData.fullname.indexOf(" ");
    const lastSpace = stuData.fullname.lastIndexOf(" ");
    //console.log(studentObject);

    newStuObject.fullname = stuData.fullname;
    newStuObject.firstname = stuData.fullname.slice(0, firstSpace);
    newStuObject.lastname = stuData.fullname.slice(lastSpace + 1);
    newStuObject.house = stuData.house;
    newStuObject.image =
      "images/" +
      newStuObject.lastname.toLowerCase() +
      "_" +
      stuData.fullname.substring(0, 1).toLowerCase() +
      ".png";

    //console.log(newStuObject.image);
    arrayOfStudents.push(newStuObject);
    filteredList = arrayOfStudents;
    //console.log(arrayOfStudents);
  });
  displayList(arrayOfStudents);
}
function filterList() {
  //console.log(this.getAttribute("id"));
  //filteredList = arrayOfStudents;

  currentFilter = this.getAttribute("id");
  if (currentFilter === "btnAll") {
    displayList(arrayOfStudents);
    filteredList = arrayOfStudents;
  } else {
    function filterByHouse(student) {
      return student.house === currentFilter;
    }

    filteredList = arrayOfStudents.filter(filterByHouse);
    displayList(filteredList);
    console.log(filteredList);
  }
}

// // function sortList() {
// //   currentSort = this.getAttribute("id");
// //   console.log(currentSort);
// //   let sortedList = arrayOfStudents;

//   if (currentSort === currentSort) {
//     function sortEach(a, b) {
//       if (a.currentSort < b.currentSort) {
//         return -1;
//       } else {
//         return 1;
//       }
//     }
// //     sortedList = arrayOfStudents.sort(sortEach);
// //     //displayList(sortedList);
// //     console.log(sortedList);
// //   }
// // }

function sortByFName() {
  function sort(a, b) {
    //console.log(arrayOfStudents);
    if (a.firstname < b.firstname) {
      return -1;
    } else {
      return 1;
    }
  }
  filteredList.sort(sort);
  document.querySelector("#fnList").innerHTML = "";
  displayList(filteredList);
  console.log(filteredList);
}

function sortByLName() {
  function sort(a, b) {
    //console.log(arrayOfStudents);
    if (a.lastname < b.lastname) {
      return -1;
    } else {
      return 1;
    }
  }

  document.querySelector("#fnList").innerHTML = "";
  filteredList.sort(sort);
  displayList(filteredList);
  console.log(filteredList);
}

function sortByHouse() {
  //document.querySelector("#fnList").innerHTML = "";
  function sort(a, b) {
    //console.log(arrayOfStudents);
    if (a.house < b.house) {
      return -1;
    } else {
      return 1;
    }
  }
  document.querySelector("#fnList").innerHTML = "";
  filteredList.sort(sort);
  displayList(filteredList);
  console.log(filteredList);
}

function displayList(arrayOfStudents) {
  //console.log(arrayOfStudents);
  document.querySelector("#fnList").innerHTML = "";
  arrayOfStudents.forEach(student => {
    //console.log(student.firstname);
    const template = document.querySelector("#studentFirstNTemplate").content;
    const clone = template.cloneNode(true);

    clone
      .querySelector(".details-button")
      .addEventListener("click", () => showOneStudent(student));

    clone.querySelector(".firstN span").textContent = student.firstname;
    clone.querySelector(".lastN span").textContent = student.lastname;
    clone.querySelector(".house span").textContent = student.house;

    clone.querySelector("li").id = student.firstname;
    clone
      .querySelector(".expled-button")
      .addEventListener("click", () => expel(student));

    document.querySelector("#fnList").appendChild(clone);
  });
}

function showOneStudent(student) {
  console.log(student);
  console.log("working");
  const modal = document.querySelector(".modal");

  modal.querySelector(".modal-content").id = student.fullname;
  modal.querySelector(".studentImg").src = student.image;
  modal.querySelector(".name span").textContent = student.fullname;
  modal.querySelector(".house").textContent = student.house;
  if (student.house == "Gryffindor") {
    modal.querySelector(".modal-content").classList.add("gryffindor");
  } else {
    modal.querySelector(".modal-content").classList.remove("gryffindor");
  }

  if (student.house == "Hufflepuff") {
    modal.querySelector(".modal-content").classList.add("hufflepuf");
  } else {
    modal.querySelector(".modal-content").classList.remove("hufflepuf");
  }

  if (student.house == "Ravenclaw") {
    modal.querySelector(".modal-content").classList.add("ravenclaw");
  } else {
    modal.querySelector(".modal-content").classList.remove("ravenclaw");
  }

  if (student.house == "Slytherin") {
    modal.querySelector(".modal-content").classList.add("slytherin");
  } else {
    modal.querySelector(".modal-content").classList.remove("slytherin");
  }

  modal.classList.remove("hide");
  modal.addEventListener("click", () => modal.classList.add("hide"));
}

// TODO: Create scaffolding functions for the rest!

function expel(student) {
  console.log(student.firstname);
  let id = student.firstname;

  let onestudent = document.querySelector("#" + id);
  //onestudent.style.display = "none";

  onestudent.querySelector(".firstN span").textContent = student.firstname;
  onestudent.querySelector(".lastN span").textContent = student.lastname;
  onestudent.querySelector(".house span").textContent = student.house;

  document.querySelector("#expeld").appendChild(onestudent);
}
