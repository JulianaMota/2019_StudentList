"use strict";
//links
const baseLink = "https://petlatkea.dk/2019/hogwarts/students.json";
const familyLink = "https://petlatkea.dk/2019/hogwarts/families.json";

//prototype object
const studentObject = {
  fullname: "-student name-",
  firstname: "-student first name-",
  lastname: "-student last name-",
  image: "-student image-",
  house: "-student house-",
  bloodstatus: "-student blood status-",
  inquisitorialSquad: "-inquistor-"
};

//the object with my info
const house = ["Hufflepuff", "Gryffindor", "Ravenclaw", "Slytherin"];
const randomH = Math.floor(Math.random() * house.length);
const myObject = {
  fullname: "Juliana Maria Barreto Mota",
  firstname: "Juliana",
  lastname: "Mota",
  image: "images/juliana-portrait_350x503.png",
  house: house[randomH],
  bloodstatus: "Muggle",
  inquisitorialSquad: false
};

//diferent arrays
let arrayOfStudents = [];
let filteredList = [];
let families = [];
let inquistSquade = [];
let expelledList = [];

//global variabls
let currentFilter;
let filter;
let currentSort;

window.addEventListener("DOMContentLoaded", init);

//init function
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
  getFamilies();
}

//Fetch json files

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
  console.log(families);
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
    const blood = ["Half", "Muggle"];
    const random = Math.floor(Math.random() * blood.length);
    function checkblood(lastN) {
      //console.log(lastN);
      if (families.half.includes(lastN)) {
        newStuObject.bloodstatus = "Pure";
      } else if (families.pure.includes(lastN)) {
        newStuObject.bloodstatus = blood[random];
      } else {
        newStuObject.bloodstatus = "Pure";
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
  arrayOfStudents.push(myObject);
  displayList(arrayOfStudents);
  updateNumberS();
}

//count house
function updateNumberS() {
  document.querySelector("#countG span").innerHTML = count("Gryffindor");
  document.querySelector("#countH span").innerHTML = count("Hufflepuff");
  document.querySelector("#countR span").innerHTML = count("Ravenclaw");
  document.querySelector("#countS span").innerHTML = count("Slytherin");
  document.querySelector("#countA span").innerHTML = count("all");

  document.querySelector("#countE span").innerHTML = expelledList.length;
}

function count(house) {
  let studentsNumber;
  console.log(studentsNumber);
  if (house === "all") {
    studentsNumber = arrayOfStudents;
  } else {
    studentsNumber = arrayOfStudents.filter(student => student.house === house);
  }
  return studentsNumber.length;
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

//inquisitorial squad function

function addinquisitorialSquad(student) {
  //console.log(event);
  //console.log(student);
  let id = student.firstname;
  //console.log(student.inquisitorialSquad);
  //checkbox is checked
  if (event.target.checked === true) {
    if (student.bloodstatus == "Pure" || student.house == "Slytherin") {
      inquistSquade.push(student);
      //console.log(inquistSquade);
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
    //console.log(inquistSquade);
    student.inquisitorialSquad = false;
  }
  autoRemoveFromISquade(event);

  function autoRemoveFromISquade(event) {
    const time = Math.floor(Math.random() * 4000);
    let isevent = event;
    setTimeout(function() {
      isevent.target.checked = false;
      console.log(event);
      inquistSquade.pop();
      document
        .querySelector("#" + id + " div .sqadeImg ")
        .classList.add("hide");
      console.log(inquistSquade);
    }, time);
  }
}

// MODAL
function showOneStudent(student) {
  //console.log(student);
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

//click on expel
function clickList(event) {
  console.log(event.target.id);
  // TODO: Figure out if a button was clicked
  if (event.target.dataset.action === "remove") {
    // TODO: If so, call clickRemove
    const eventId = event.target.id;
    //console.log(eventId);
    clickRemove(eventId);
  }
}

// expel student
function clickRemove(eventId) {
  // TODO: Find the element index in the array
  function findById(id) {
    return arrayOfStudents.findIndex(obj => obj.id === id);
  }
  // TODO: Splice that element from the array
  let removeObject = findById(eventId);
  //console.log(obj);
  console.log(event.path[1].id);

  if (event.path[1].id === "Juliana") {
    alert("You can't remove me");
  } else {
    let obj = arrayOfStudents.splice(removeObject, 1);
    console.log(obj);
    //!== not equal
    filteredList = filteredList.filter(student => student.id !== eventId);

    obj.forEach(student => {
      //console.log(student);
      expelledList.push(student);
    });
    displayExpel(expelledList);
  }

  console.log(expelledList);

  // Re-display the list
  updateNumberS();
  displayList(filteredList);
}

//uniq id math
//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Display expel students
function displayExpel(expelledList) {
  document.querySelector("#expeld").innerHTML = "";
  expelledList.forEach(student => {
    const template = document.querySelector("#studentFirstNTemplate").content;
    const clone = template.cloneNode(true);
    //console.log(student.firstname);
    console.log(student);
    if (student.firstname) {
      clone
        .querySelector(".details-button")
        .addEventListener("click", () => showOneStudent(student));

      clone.querySelector(".firstN").textContent = student.firstname;
      clone.querySelector(".lastN").textContent = student.lastname;
      clone.querySelector(".house").textContent = student.house;
      clone.querySelector(".blood").textContent = student.bloodstatus;

      clone.querySelector("li").id = student.firstname;
      clone.querySelector("[data-action=remove]").classList.add("hide");
      clone.querySelector("input[name=checkbox]").classList.add("hide");

      clone.querySelector(".sqadeImg").src = "images/wizengamot_seal.png";
      document.querySelector("#expeld").appendChild(clone);
    }
  });
}
