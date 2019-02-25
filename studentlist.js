"use strict";
const baseLink = "https://petlatkea.dk/2019/hogwarts/students.json";
const studentObject = {
  fullname: "-student name-",
  firstname: "-student first name-",
  lastname: "-student last name-",
  image: "-student image-",
  house: "-student house-"
};
const arrayOfStudents = [];

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");

  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
  getJSON();
}

function getJSON() {
  console.log("getJSON");
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
  displayFirstName(arrayOfStudents);
  displayLasttName(arrayOfStudents);
}

console.log(arrayOfStudents);

function filterList() {
  console.log("filterList");
}

function displayFirstName(arrayOfStudents) {
  //console.log(arrayOfStudents);
  arrayOfStudents.forEach(student => {
    console.log(student.firstname);
    const template = document.querySelector("#studentFirstNTemplate").content;
    const clone = template.cloneNode(true);

    clone
      .querySelector(".details-button")
      .addEventListener("click", () => showOneStudent(student));

    clone.querySelector("h1 span").textContent = student.firstname;

    document.querySelector("#fnList").appendChild(clone);
  });
}

function displayLasttName(arrayOfStudents) {
  //console.log(arrayOfStudents);
  arrayOfStudents.forEach(student => {
    console.log(student.firstname);
    const template = document.querySelector("#studentLastNTemplate").content;
    const clone = template.cloneNode(true);

    clone.querySelector("h1 span").textContent = student.lastname;

    document.querySelector("#lnList").appendChild(clone);
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
