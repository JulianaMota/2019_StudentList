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
let currentFilter;
let filter;

window.addEventListener("DOMContentLoaded", init);

function init() {
  document.querySelectorAll(".filter").forEach(filter => {
    filter.addEventListener("click", setFilter);
  });

  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
  getJSON();
}

function getJSON() {
  //console.log("getJSON");
  fetch(baseLink)
    .then(pro => pro.json())
    .then(makeObject);
  // NOTE: Maybe also call sortByFirst the first time ... Investigate!
  //filterList();
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
    //console.log(arrayOfStudents);
  });
  //displayList(arrayOfStudents);
  filterList(arrayOfStudents);
}

// function filterGryfindor() {
//   console.log("working");
//   //console.log(arrayOfStudents);
//   arrayOfStudents.filter(student => student.house == "Gryfindor");
// }

function filterList() {
  const filteredList = arrayOfStudents.filter(oneFilter);
  //console.log(student);
  //let filteredList = arrayOfStudents;

  displayList(filteredList);

  sortList(filteredList);
}

function setFilter(event) {
  console.log(event);
  filter = event.target.innerText;
  console.log(filter);
  filterList();
}

function oneFilter(item) {
  //
  if (!filter) {
    return true;
  }
  if (item.house === filter) {
    return true;
  } else {
    return false;
  }
}

function sortList(arrayOfStudents) {
  //displayList(arrayOfStudents);
}

function displayList(filteredList) {
  //console.log(arrayOfStudents);
  arrayOfStudents.forEach(student => {
    //console.log(student.firstname);
    const template = document.querySelector("#studentFirstNTemplate").content;
    const clone = template.cloneNode(true);

    clone
      .querySelector(".details-button")
      .addEventListener("click", () => showOneStudent(student));

    clone.querySelector(".firstN span").textContent = student.firstname;
    clone.querySelector(".lastN span").textContent = student.lastname;

    document.querySelector("#fnList").appendChild(clone);
  });
}

function showOneStudent(student) {
  console.log(student);
  console.log("working");
  const modal = document.querySelector(".modal");

  //modal.querySelector(".modal-content").id = student.fullname;
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

function clickSortByFirst() {}

function sortListByFirst() {}
