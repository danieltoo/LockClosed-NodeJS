function revisa() {
	var password_confirmation=document.getElementById("password_confirmation");
	var password=document.getElementById("password");
	var revisado=document.getElementById("revisado");
	if (password_confirmation.value != password.value){
			revisado.innerHTML= "No son iguales";
	}else{
		revisado.innerHTML= "";
	}
}

function changeinR() {
	document.getElementById("R").style.backgroundColor="red"	
}
function changeoutR() {
	document.getElementById("R").style.backgroundColor="grey"
}
function changeinT() {
	document.getElementById("T").style.backgroundColor="red"	
}
function changeoutT() {
	document.getElementById("T").style.backgroundColor="purple"
}

/***************************************************/
function function_user() {
	var nombre =  document.getElementById("usuario");
	var temp = nombre.value;
	var us = prompt("Nombre de usuario:", temp);
	if (us==null){
		nombre.value=temp;
	}else{
		nombre.value=us;
	}
	return false;
	
}
function user() {
	alert("ok");
}
function emmmm() {
	var em =  document.getElementById("email");
	var temp = em.value;
	var us = prompt("Email:", temp);
	if (us==null){
		em.value=temp;
	}else{
		em.value=us;
	}
	return false;
}
function tel() {
	var tel =  document.getElementById("telefono");
	var temp = tel.value;
	var us = prompt("Telefono:", temp);
	if (us==null){
		tel.value=temp;
	}else{
		tel.value=us;
	}
	return false;
}
function face() {
	var face =  document.getElementById("facebook");
	var temp = face.value;
	var us = prompt("Facebook:", temp);
	if (us==null){
		face.value=temp;
	}else{
		face.value=us;
	}
	return false;
}
// function oculside() {
// 	alert("Menú");
// 	var sec =  document.getElementById("galeria");
// 	sec.style.display= "none";
// }
