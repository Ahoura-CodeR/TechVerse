const form = document.querySelector('.auth-form')


form.addEventListener('submit', e=>{

e.preventDefault()


const inputs = form.querySelectorAll('input')


const empty = [...inputs]
.some(input=>input.value.trim()==='')


if(empty){

alert("Please fill all fields 😐")

return

}


alert(
"Authentication system is not connected yet 🚧\nBackend is still sleeping 😴"
)


})