"use strict";
const baseLink = "https://petlatkea.dk/2019/hogwarts/students.json";
const familyLink = "https://petlatkea.dk/2019/hogwarts/families.json";
const studentObject = {
  fullname: "-student name-",
  firstname: "-student first name-",
  lastname: "-student last name-",
  image: "-student image-",
  house: "-student house-",
  bloodstatus: "-student blood status-",
  inquisitorialSquad: "-inquistor-"
};
const myObject = {};
let arrayOfStudents = [];
let filteredList = [];
let currentFilter;
let filter;
let currentSort;
let families = [];
let inquistSquade = [];

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

  document.querySelector("section").addEventListener("click", clickList);
  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
  getFamilies();
}

//Fetch jason file

function getJSON() {
  //console.log("getJSON");
  fetch(baseLink)
    .then(pro => pro.json())
    .then(makeObject);
}
function getFamilies() {
  fetch(familyLink)
    .then(pro => pro.json())
    .then(nameChecking);
}

function nameChecking(bloodList) {
  families = bloodList;
  //console.log(families);
  getJSON();
}

//create new object

function makeObject(studentList) {
  //console.log(families);
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
    newStuObject.bloodstatus = "blood";
    newStuObject.inquisitorialSquad = false;

    const lastN = newStuObject.lastname;

    function checkblood(lastN) {
      //console.log(lastN);
      if (families.half.includes(lastN)) {
        newStuObject.bloodstatus = "Half";
      } else if (families.pure.includes(lastN)) {
        newStuObject.bloodstatus = "Pure";
      } else {
        newStuObject.bloodstatus = "Muggle";
      }
    }
    checkblood(lastN);
    //console.log(newStuObject.image);
    arrayOfStudents.push(newStuObject);
    filteredList = arrayOfStudents;
    //console.log(arrayOfStudents);
  });
  arrayOfStudents.forEach(student => {
    //onsole.log(student);
    const uniqueID = uuidv4();
    student.id = uniqueID;
  });
  //console.log(arrayOfStudents);
  displayList(arrayOfStudents);
}

//filter list

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

//sort by first Name

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
  document.querySelector("#sList").innerHTML = "";
  displayList(filteredList);
  console.log(filteredList);
}

//sort by last Name

function sortByLName() {
  function sort(a, b) {
    //console.log(arrayOfStudents);
    if (a.lastname < b.lastname) {
      return -1;
    } else {
      return 1;
    }
  }

  document.querySelector("#sList").innerHTML = "";
  filteredList.sort(sort);
  displayList(filteredList);
  console.log(filteredList);
}

//sort by house

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
  document.querySelector("#sList").innerHTML = "";
  filteredList.sort(sort);
  displayList(filteredList);
  console.log(filteredList);
}

//Display List

function displayList(arrayOfStudents) {
  //console.log(arrayOfStudents);
  document.querySelector("#sList").innerHTML = "";
  arrayOfStudents.forEach(student => {
    //console.log(student.firstname);
    const template = document.querySelector("#studentFirstNTemplate").content;
    const clone = template.cloneNode(true);

    clone
      .querySelector(".details-button")
      .addEventListener("click", () => showOneStudent(student));

    clone.querySelector(".firstN").textContent = student.firstname;
    clone.querySelector(".lastN").textContent = student.lastname;
    clone.querySelector(".house").textContent = student.house;
    clone.querySelector(".blood").textContent = student.bloodstatus;

    clone.querySelector("li").id = student.firstname;
    clone.querySelector("[data-action=remove]").id = student.id;
    clone
      .querySelector("input[name=checkbox]")
      .addEventListener("click", () => addinquisitorialSquad(student));

    clone.querySelector(".sqadeImg").src = "images/wizengamot_seal.png";

    document.querySelector("#sList").appendChild(clone);
  });
}

function addinquisitorialSquad(student) {
  console.log(event);
  console.log(student);
  let id = student.firstname;
  //console.log(student.inquisitorialSquad);
  if (event.target.checked === true) {
    if (student.bloodstatus == "Pure" || student.house == "Slytherin") {
      inquistSquade.push(student);
      console.log(inquistSquade);
      student.inquisitorialSquad = true;
      document
        .querySelector("#" + id + " div .sqadeImg ")
        .classList.remove("hide");
    } else {
      student.inquisitorialSquad = false;
      alert(
        "This student is not allowed to be part of the Inquisitorial Squad."
      );
      event.target.checked = false;
    }

    //Checkbox is not checked..
  } else if (event.target.checked === false) {
    document.querySelector("#" + id + " div .sqadeImg ").classList.add("hide");
    let obj = inquistSquade.find(obj => obj === student);
    let po = inquistSquade.indexOf(obj);
    inquistSquade.splice(po, 1);
    console.log(inquistSquade);
    student.inquisitorialSquad = false;
  }
}

// MODAL
function showOneStudent(student) {
  console.log(student);
  console.log("working");
  const modal = document.querySelector(".modal");

  //modal.querySelector(".modal-content").id = student.fullname;
  console.log(student.image.src === "404(Not Found)");

  if (student.image) {
    modal.querySelector(".studentImg").src = student.image;
  } else {
    modal.querySelector(".studentImg").src = "images/unknown-person.png";
  }

  modal.querySelector(".name span").textContent = student.fullname;
  modal.querySelector(".house").textContent = student.house;
  modal.querySelector("[data-field=fistName] span").textContent =
    student.firstname;
  modal.querySelector("[data-field=lastName] span").textContent =
    student.lastname;
  modal.querySelector("[data-field=blood] span").textContent =
    student.bloodstatus;

  if (student.house == "Gryffindor") {
    modal.querySelector("[data-field=hoseLogo]").src =
      "images/gryfindor-logo_184x229.png";
    modal.querySelector(".modal-content").classList.add("gryffindor");
  } else {
    modal.querySelector(".modal-content").classList.remove("gryffindor");
  }

  if (student.house == "Hufflepuff") {
    modal.querySelector("[data-field=hoseLogo]").src =
      "images/hunfflepuff-logo_191x226.png";
    modal.querySelector(".modal-content").classList.add("hufflepuf");
  } else {
    modal.querySelector(".modal-content").classList.remove("hufflepuf");
  }

  if (student.house == "Ravenclaw") {
    modal.querySelector("[data-field=hoseLogo]").src =
      "images/ravenclaw-logo_184x232.png";
    modal.querySelector(".modal-content").classList.add("ravenclaw");
  } else {
    modal.querySelector(".modal-content").classList.remove("ravenclaw");
  }

  if (student.house == "Slytherin") {
    modal.querySelector("[data-field=hoseLogo]").src =
      "images/slytherin-logo_184x224.png";
    modal.querySelector(".modal-content").classList.add("slytherin");
  } else {
    modal.querySelector(".modal-content").classList.remove("slytherin");
  }

  if (inquistSquade.includes(student)) {
    modal.querySelector(".sqadeImg").classList.remove("hide");
    modal.querySelector(".squadText").classList.remove("hide");
    modal.querySelector(".sqadeImg").src = "images/wizengamot_seal.png";
  }

  modal.classList.remove("hide");
  modal.addEventListener("click", () => modal.classList.add("hide"));
}

function clickList(event) {
  //console.log(event.target.dataset.action === "remove");
  // TODO: Figure out if a button was clicked
  if (event.target.dataset.action === "remove") {
    // TODO: If so, call clickRemove
    const eventId = event.target.id;
    console.log(eventId);
    clickRemove(eventId);
  }
}

function clickRemove(eventId) {
  console.log(arrayOfStudents);
  // TODO: Find the element index in the array
  function findById(id) {
    return arrayOfStudents.findIndex(obj => obj.id === id);
  }
  // TODO: Splice that element from the array
  let removeObject = findById(eventId);
  console.log(removeObject);

  arrayOfStudents.splice(removeObject, 1);
  //console.log(allAnimals);

  // Re-display the list
  displayList(arrayOfStudents);

  // let expelledList = [];
  // expelledList.slice(removeObject, 1);
  // console.log(expelledList);
  //document.querySelector("#expeld").appendChild();
}

//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
