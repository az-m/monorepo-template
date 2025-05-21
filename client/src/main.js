const apiRoot = import.meta.env.VITE_API_ROOT;
const form = document.getElementById("form");

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  const API = apiRoot + "addPlayer";

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });

  form.reset();
}

form.addEventListener("submit", handleSubmit);
