document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    validateField(
      "name",
      "Имя должно содержать только буквы и пробелы, от 2 до 20 символов"
    );
    validateField("email", "Введите корректный email");
    validateField("age", "Введите корректный возраст");
    validateField("profession", "Выберите профессию");
    validateField(
      "password",
      "Пароль должен содержать не менее 8 символов, заглавную букву и цифру"
    );
    validateField("confirmPassword", "Пароли не совпадают");
    validateCheckbox("gender", "Выберите пол");
    validateCheckbox("agreement", "Вы должны согласиться с обработкой данных");

    if (isFormValid(this)) {
      console.log("Имя:", this.elements.name.value);
      console.log("Email:", this.elements.email.value);
      console.log("Возраст:", this.elements.age.value);
      console.log("Пол:", this.elements.gender.value);
      console.log("Профессия:", this.elements.profession.value);
      console.log("Пароль:", this.elements.password.value);

      this.reset();
    }
  });

function validateField(fieldName, errorMessage) {
  const field = document.getElementById(fieldName);
  const errorSpan = document.getElementById(`${fieldName}-error`);

  if (!field.checkValidity()) {
    field.classList.add("error");

    if (errorSpan) {
      errorSpan.textContent = errorMessage;
    }
  }
}

function validateCheckbox(fieldName, errorMessage) {
  const checkboxes = document.querySelectorAll(
    `input[name="${fieldName}"]:checked`
  );
  const errorSpan = document.getElementById(`${fieldName}-error`);

  if (!checkboxes || checkboxes.length < 1) {
    const checkbox = document.querySelector(`input[name="${fieldName}"]`);

    if (checkbox) {
      const checkboxLabel = checkbox.closest("label");
      if (checkboxLabel) {
        checkboxLabel.classList.add("error");
      }
    }

    if (errorSpan) {
      errorSpan.textContent = errorMessage;
    }
  }
}

const form = document.getElementById("registrationForm");
const inputs = form.querySelectorAll("input, select, textarea");

// inputs.forEach((input) => {
//   input.addEventListener("invalid", (event) => {
//     event.preventDefault();
//     const errorSpan = document.getElementById(`${input.id}-error`);
//     if (errorSpan) {
//       errorSpan.textContent = input.validationMessage;
//     }
//   });
// });

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    const errorSpan = document.getElementById(`${input.id}-error`);
    if (errorSpan) {
      errorSpan.textContent = input.validationMessage;
    }
  });
});

function clearErrors() {
  const fields = document.querySelectorAll(
    "#registrationForm input, #registrationForm select, #registrationForm textarea"
  );
  const errorSpans = document.querySelectorAll(".error-message");

  fields.forEach((field) => {
    field.classList.remove("error");
  });

  errorSpans.forEach((span) => {
    span.textContent = "";
  });
}

function isFormValid(form) {
  const errorFields = form.querySelectorAll(".error");
  return errorFields.length === 0;
}
