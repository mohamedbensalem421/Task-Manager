//GET
window.addEventListener('pageshow', function() {
  if (!localStorage.getItem('token')) {
    window.location.href = 'index.html';
}
});

document.querySelector('.logout').addEventListener('click', async ()=> {
  window.location.href = 'index.html';
  localStorage.removeItem('token');
});

let container = document.querySelector(".tasks");
let userName = document.querySelector(".user")
let token = localStorage.getItem("token")
let fetchData = async () => {
  try {
    let data = await fetch("/api/v1/tasks",{
      headers:{Authorization: `Bearer ${token}`}
    });
    let result = await data.json();
    console.log(result.user.name);
    userName.innerHTML = `Hello, ${result.user.name}`
    if (result.task.length < 1) {
      return container.innerHTML = `<div>No tasks in your list</div>`;
    }
    let tasks = result.task
      .map((e) => {
        return `<div id="${e._id}">
            <i class="fa-solid completed fa-circle-check"></i>
            <p>${e.name}</p>
            <a href="./task.html?id=${e._id}"><i class="fa-solid edit fa-pen-to-square"></i></a>
            <i class="fa-solid delete fa-trash"></i>
          </div>`;
      })
      .join(" ");
    container.innerHTML = tasks;
    for (i = 0; i < result.task.length; i++) {
      let completedcheck = document.querySelectorAll(".completed");
      if (!result.task[i].completed) {
        completedcheck[i].style.opacity = "0";
      } else {
        completedcheck[i].nextElementSibling.style.cssText = "text-decoration: line-through;opacity: 0.2;"
      }
    }
  } catch (error) {
    console.log(error);
    container.innerHTML = `<p class="fetchError">Can't fetch data</p>`;
  }
};
fetchData();

//POST
let input = document.querySelector("input");
let submit = document.querySelector(".submit");
let taskMsg = document.querySelector(".taskMsg");
submit.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    let formData = new FormData(document.querySelector("form"));
    let data = Object.fromEntries(formData);
    let response = await fetch("/api/v1/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw console.log(new Error(`HTTP error! Status: ${response.status}`));
    }
    fetchData();
    taskMsg.style.color = "green";
    taskMsg.textContent = "success, task added";
  } catch (error) {
    console.log(error);
    taskMsg.style.color = "red";
    taskMsg.textContent = "error, please try again";
  } finally{
    setTimeout(() => {
      taskMsg.textContent = "";
    }, 3000);
  }
});

//DELETE
container.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete")) {
    let taskId = e.target.parentElement.id;
    try {
      await fetch(`/api/v1/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }
});
document.querySelector(".logout").onclick = async () =>{
  console.log("ggg");
  // location.href = "./index.html"
}

