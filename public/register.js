let register = document.querySelector("button")
let form = document.querySelector(".registerForm")
let registerMsg = document.querySelector(".registerMsg")
register.addEventListener("click", async (e) =>{
  e.preventDefault()
  try {
    let formData = new FormData(form)
    let data = Object.fromEntries(formData)
    let response = await fetch("/api/v1/auth/register",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    let result = await response.json()
    if(response.ok){
      location.href = "./index.html"
    }else{
      document.querySelector(".msg").innerHTML = `${result.msg}`
    }
    console.log(result);
  } catch (error) {
  console.log(error);
  registerMsg.textContent = "Please provide name, email and password";
} finally{
setTimeout(() => {
  registerMsg.textContent = "";
}, 3000);
}
})