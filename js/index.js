const backdrop = document.querySelector(".backdrop");
const openModalBtn = document.querySelector(".button");
const closeModalBtn = document.querySelector(".modal__close--btn");

function toggleModal() {
  backdrop.classList.toggle("is-hidden");
}

openModalBtn.addEventListener("click", () => {
  displayAddBtn();
  toggleModal();
});

closeModalBtn.addEventListener("click", () => toggleModal());

backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) {
    toggleModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && !backdrop.classList.contains("is-hidden")) {
    toggleModal();
  }
});

const dataUsers = [
  {
    id: 1,
    name: "Joe Biden",
    email: "joe.biden@gmail.com",
    age: 80,
  },
  {
    id: 2,
    name: "Donald Trump",
    email: "donald.trump@gmail.com",
    age: 76,
  },
  {
    id: 3,
    name: "Boris Johnson",
    email: "boris.johnsonuk@gmail.com",
    age: 58,
  },
];

const tableBody = document.querySelector(".table__body");

const addButton = document.querySelector("#addButton");

const idInput = document.querySelector("#id");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const ageInput = document.querySelector("#age");

const markup = dataUsers
  .map(
    ({ id, name, email, age }) =>
      ` <tr class="table__road"> <td class="table__data">${id}</td>
    <td class="table__data">${name}</td>
    <td class="table__data ">${email}</td>
    <td class="table__data">${age}</td>
    <td class="table__data">
      <button class="table__button table__button--edit" data-id="${id}">Edit</button>
      <button class="table__button table__button--delete" data-id="${id}">Delete</button>
    </td> </tr>`
  )
  .join("");

tableBody.insertAdjacentHTML("beforeend", markup);

function addUser() {
  if (
    !idInput.value ||
    !nameInput.value ||
    !emailInput.value ||
    !ageInput.value
  ) {
    return alert("Please fill in all fields");
  }

  const existingUser = dataUsers.find(
    (user) => user.id === Number(idInput.value)
  );

  const existingEmail = dataUsers.find(
    (user) => user.email === emailInput.value
  );

  if (existingUser) {
    return alert(`User with id ${idInput.value} already exists`);
  }

  if (existingEmail) {
    return alert(`User with id ${emailInput.value} already exists`);
  }

  const formData = {
    id: Number(idInput.value),
    name: nameInput.value,
    email: emailInput.value,
    age: Number(ageInput.value),
  };

  dataUsers.push(formData);

  const updatedMarkup = dataUsers
    .map(
      ({ id, name, email, age }) =>
        ` <tr class="table__road"> <td class="table__data">${id}</td>
            <td class="table__data">${name}</td>
            <td class="table__data">${email}</td>
            <td class="table__data">${age}</td>
            <td class="table__data">
              <button class="table__button table__button--edit" data-id="${id}">Edit</button>
              <button class="table__button table__button--delete" data-id="${id}">Delete</button>
            </td> </tr>`
    )
    .join("");

  tableBody.innerHTML = updatedMarkup;

  clearForm();
  toggleModal();
}

function clearForm() {
  idInput.value = "";
  nameInput.value = "";
  emailInput.value = "";
  ageInput.value = "";
}

addButton.addEventListener("click", addUser);

function removeUser(id) {
  const userIndex = dataUsers.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return;
  }
  dataUsers.splice(userIndex, 1);

  const updatedMarkup = dataUsers
    .map(
      ({ id, name, email, age }) =>
        ` <tr class="table__road"> <td class="table__data">${id}</td>
                <td class="table__data">${name}</td>
                <td class="table__data">${email}</td>
                <td class="table__data">${age}</td>
                <td class="table__data">
                  <button class="table__button table__button--edit" data-id="${id}">Edit</button>
                  <button class="table__button table__button--delete" data-id="${id}">Delete</button>
                </td> </tr>`
    )
    .join("");

  tableBody.innerHTML = updatedMarkup;
}

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("table__button--delete")) {
    const userId = Number(e.target.dataset.id);
    removeUser(userId);
  }
});

const editButton = document.querySelector("#editButton");
let userToEditId = null;

function editUser() {
  const userToEdit = dataUsers.find((user) => user.id === userToEditId);
  if (!userToEdit) {
    return;
  }

  const updatedUser = {
    id: userToEdit.id,
    name: nameInput.value,
    email: emailInput.value,
    age: Number(ageInput.value),
  };

  const userIndex = dataUsers.findIndex((user) => user.id === userToEditId);

  dataUsers[userIndex] = updatedUser;

  const updatedMarkup = dataUsers
    .map(
      ({ id, name, email, age }) =>
        ` <tr class="table__road"> <td class="table__data">${id}</td>
          <td class="table__data">${name}</td>
          <td class="table__data">${email}</td>
          <td class="table__data">${age}</td>
          <td class="table__data">
            <button class="table__button table__button--edit" data-id="${id}">Edit</button>
            <button class="table__button table__button--delete" data-id="${id}">Delete</button>
          </td> </tr>`
    )
    .join("");

  tableBody.innerHTML = updatedMarkup;

  clearForm();
  toggleModal();
}

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("table__button--edit")) {
    userToEditId = Number(e.target.dataset.id);
    const userToEdit = dataUsers.find((user) => user.id === userToEditId);
    displayEditBtn();
    if (userToEdit) {
      idInput.value = userToEdit.id;
      nameInput.value = userToEdit.name;
      emailInput.value = userToEdit.email;
      ageInput.value = userToEdit.age;
      toggleModal();
    }
  }
});

editButton.addEventListener("click", editUser);

function displayAddBtn() {
  editButton.classList.add("is-hidden-btn");
  addButton.classList.remove("is-hidden-btn");
}

function displayEditBtn() {
  editButton.classList.remove("is-hidden-btn");
  addButton.classList.add("is-hidden-btn");
}

const list = document.querySelector(".list");

list.addEventListener("click", (e) => {
  if (!e.target.classList.contains("list-btn")) return;

  if (e.target.dataset.age === "asc") {
    const inAscendingAge = [...dataUsers].sort(
      (firstAge, secondAge) => firstAge.age - secondAge.age
    );

    const updatedMarkup = inAscendingAge
      .map(
        ({ id, name, email, age }) =>
          ` <tr class="table__road"> <td class="table__data">${id}</td>
            <td class="table__data">${name}</td>
            <td class="table__data">${email}</td>
            <td class="table__data">${age}</td>
            <td class="table__data">
              <button class="table__button table__button--edit" data-id="${id}">Edit</button>
              <button class="table__button table__button--delete" data-id="${id}">Delete</button>
            </td> </tr>`
      )
      .join("");

    tableBody.innerHTML = updatedMarkup;
  }

  if (e.target.dataset.age === "desc") {
    const inAscendingAge = [...dataUsers].sort(
      (firstAge, secondAge) => secondAge.age - firstAge.age
    );

    const updatedMarkup = inAscendingAge
      .map(
        ({ id, name, email, age }) =>
          ` <tr class="table__road"> <td class="table__data">${id}</td>
              <td class="table__data">${name}</td>
              <td class="table__data">${email}</td>
              <td class="table__data">${age}</td>
              <td class="table__data">
                <button class="table__button table__button--edit" data-id="${id}">Edit</button>
                <button class="table__button table__button--delete" data-id="${id}">Delete</button>
              </td> </tr>`
      )
      .join("");

    tableBody.innerHTML = updatedMarkup;
  }

  if (e.target.dataset.name === "asc") {
    const inAscendingAge = [...dataUsers].sort((firstName, secondName) =>
      firstName.name.localeCompare(secondName.name)
    );
    console.log(inAscendingAge);
    const updatedMarkup = inAscendingAge
      .map(
        ({ id, name, email, age }) =>
          ` <tr class="table__road"> <td class="table__data">${id}</td>
                <td class="table__data">${name}</td>
                <td class="table__data">${email}</td>
                <td class="table__data">${age}</td>
                <td class="table__data">
                  <button class="table__button table__button--edit" data-id="${id}">Edit</button>
                  <button class="table__button table__button--delete" data-id="${id}">Delete</button>
                </td> </tr>`
      )
      .join("");

    tableBody.innerHTML = updatedMarkup;
  }

  if (e.target.dataset.name === "desc") {
    const inAscendingAge = [...dataUsers].sort((firstName, secondName) =>
      secondName.name.localeCompare(firstName.name)
    );
    console.log(inAscendingAge);
    const updatedMarkup = inAscendingAge
      .map(
        ({ id, name, email, age }) =>
          ` <tr class="table__road"> <td class="table__data">${id}</td>
                <td class="table__data">${name}</td>
                <td class="table__data">${email}</td>
                <td class="table__data">${age}</td>
                <td class="table__data">
                  <button class="table__button table__button--edit" data-id="${id}">Edit</button>
                  <button class="table__button table__button--delete" data-id="${id}">Delete</button>
                </td> </tr>`
      )
      .join("");

    tableBody.innerHTML = updatedMarkup;
  }
});
