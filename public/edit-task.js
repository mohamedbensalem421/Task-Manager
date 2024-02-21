
window.addEventListener('pageshow', function() {
  if (!localStorage.getItem('token')) {
    window.location.href = 'index.html';
}
});

let completedCheck = document.querySelector(".checkbox")
let token = localStorage.getItem("token")
//fetch single task
let id = new URLSearchParams(window.location.search).get("id")
let textInput = document.querySelector(".textInput")
let showSingleTask = async () =>{
  let TaskID = document.querySelector(".TaskID")
  try {
    let data = await fetch(`/api/v1/tasks/${id}`,{headers: {Authorization: `Bearer ${token}`}});
    let result = await data.json();
    TaskID.textContent = result._id
    textInput.value = result.name
    if(result.completed){
      completedCheck.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}
showSingleTask()
//edit task

let edit = document.querySelector("button")
let editMsg = document.querySelector(".editMsg")
    edit.addEventListener("click", async (e) =>{
      e.preventDefault()
      try {
        let data = {
          name: textInput.value,
          completed: completedCheck.checked
        };
        let response = await fetch(`/api/v1/tasks/${id}`,{method: "PATCH",headers: {"Content-Type": "application/json",Authorization: `Bearer ${token}`},body: JSON.stringify(data)});
        if (!response.ok) {
          throw console.log(new Error(`HTTP error! Status: ${response.status}`));;
        }
        editMsg.style.color = "green"
        editMsg.textContent = "Edit Successful"
      } catch (error) {
        console.log(error);
        editMsg.style.color = "red"
        editMsg.textContent = "error, please try again"
      } finally{
        setTimeout(() =>{
          editMsg.textContent = ""
        },3000)
      }
    })
