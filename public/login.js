let Login = document.querySelector("button")
let loginMsg = document.querySelector(".loginMsg")
Login.addEventListener("click", async (e)=>{
e.preventDefault()

try {
let formData = new FormData(document.querySelector(".loginForm"))
let data = Object.fromEntries(formData);
let response = await fetch("/api/v1/auth/login",{
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(data)
})
let result = await response.json()
if(response.ok){
  localStorage.setItem("token",result.token)
  location.href = "./tasks.html"
}else{
  throw console.log(new Error(`HTTP error! Status: ${response.status}`));
}
} catch (error) {
  console.log("error");
  loginMsg.textContent = "Please provide email and password";
} finally{
setTimeout(() => {
  loginMsg.textContent = "";
}, 3000);
}
})