

document.addEventListener("DOMContentLoaded", function(){
	iniciarApp();
})

const email={
	name:"",
	telefono:"",
	email:"",
	msg:""
}

const formulario=document.querySelector("#formulario");
const botonFormulario=document.querySelector('#formulario .flex-center button[type="submit"]');
const spinner=document.querySelector(".spinner");
const contenidoFlecha=document.querySelector(".contenido-flecha");
const portafolio=document.querySelector("#Portafolio");
const contorno= document.querySelector(".contorno");
const barra=document.querySelector('.mobile-menu');
const configuracion=document.querySelector(".ajuste");
const habilidades=document.querySelector("#habilidades");
const enlaces=document.querySelectorAll(".enlace");
const secciones=document.querySelectorAll(".seccion");
const navegador=document.querySelector(".navegacion");
const cerrarMenu=document.querySelector(".cerrar__menu");
const retirarMenu=document.querySelector(".centrar__menu--mobile");
const sobreMi=document.querySelector("#Sobre-mi");
const toggleMoon=document.querySelector(".ico");

function iniciarApp(){

	addEventListeners();

	//modo oscuro
	darckMode();
	//ajuste al desplazar los colores
	ajuste();


	mostrarCambios();
	//typing
	typeText();

	interceptarPortafolio();
	//validar el formulario
	validarFormulario();

	interceptarSkills();

	interceptarDatos();
}

function addEventListeners(){
		//scroll al no mostrar el header o para la configuracion
		window.addEventListener("scroll", animacionScroll);
		//mostrar la barra de navegacion responsive
		barra.addEventListener("click", navegacionResponsive);
		
		contenidoFlecha.addEventListener("click", scrollUp);
		cerrarMenu.addEventListener("click",removerMenu);
}
//======llamando a la funcion del boton subir======
function animacionScroll(){
	const barra=document.querySelector('.barra');
		const header=document.querySelector('.header');
		
		barra.classList.toggle("abajo", window.scrollY>595)
		header.classList.toggle("abajo", window.scrollY>595)
		contenidoFlecha.classList.toggle("abajo", window.scrollY>300); 

		if(retirarMenu.classList.contains("active")){
			retirarMenu.classList.remove("active");
		}

		if(contorno.classList.contains("mostrando")){
			contorno.classList.remove("mostrando");
			configuracion.classList.remove("mostrar");
		}
}

function scrollUp(){
	const scrollCurrent=document.documentElement.scrollTop;
			if (scrollCurrent>0) {
				window.scrollTo(0,0);
			}
}


/*==================================== Configurar el Dark Mode ====================================*/

function darckMode(){

	// este codigo de aqui sirve para que deje el oscuro en todas las pestañas cuando cambie la pagina
	const prefieredarckMode=window.matchMedia('(prefers-color-scheme:dark)');
	
	if(prefieredarckMode){
		document.body.classList.add('oscuro');
	}else if(prefieredarckMode){
		document.body.classList.remove('oscuro');
	}

	const darck=document.getElementById("dark");

	darck.addEventListener("click", ()=>{
		document.body.classList.toggle("oscuro");

		if(document.body.classList.contains('oscuro')){
			localStorage.setItem("darck-mode","true");
			darck.setAttribute("class","fa-solid fa-sun");
		}else{
			localStorage.setItem("darck-mode","false");
			darck.setAttribute("class","fa-solid fa-moon");
		}
	});

	if(localStorage.getItem("darck-mode")==="true"){
		document.body.classList.add("oscuro");
		darck.setAttribute("class","fa-solid fa-sun");
	}else{
		document.body.classList.remove("oscuro");
		darck.setAttribute("class","fa-solid fa-moon");
	}
}

function ajuste(){
	const configuracion=document.getElementById("ajustes");
	configuracion.addEventListener("click", colores);
}


function navegacionResponsive(e){
		e.stopPropagation();
		retirarMenu.classList.add("active");	
}
function removerMenu(){
	const retirarMenu=document.querySelector(".centrar__menu--mobile");
	retirarMenu.classList.remove("active");
}

//========================mostrar el contenido de configuracion con los colores========================//

function colores(){
	const configuracion=document.querySelector(".ajuste");
	if (contorno.classList.contains("mostrando")) {
		contorno.classList.remove("mostrando");
		configuracion.classList.remove("mostrar");
	}else{
		contorno.classList.add("mostrando");
		configuracion.classList.add("mostrar");
	}
}


//=================funcion para mostrar los cambios de color en la configuracion=================//

function mostrarCambios(){

	const colores=document.querySelectorAll('#color');
	colores.forEach(color=>{//se itera los colores y se coloca como alias 
		color.addEventListener("click", e=>{//evento al dar click a cada uno de los colores
			const colorSeleccionado=e.target.dataset.colorMostrado;//se obtiene el atributo data y su color
			// console.log(colorSeleccionado);
			 localStorage.setItem("color", colorSeleccionado);//en localStorage se guarda su llave "color" y el colorSeleccionado
			cambiarClase(colorSeleccionado);//se manda llamar la funcion
		});
	});

	const colorGuardado = localStorage.getItem("color");
	if (colorGuardado) {
	  cambiarClase(colorGuardado);
	}
}

function cambiarClase(color) {
		// console.log(color)
	if (color === "rojo") {
	document.body.classList.add("rojo");
	document.body.classList.remove("azul");
	document.body.classList.remove("verde");
	} else if (color === "azul") {
	document.body.classList.add("azul");
	document.body.classList.remove("rojo");
	document.body.classList.remove("verde");
	} else if (color === "verde") {
	document.body.classList.add("verde");
	document.body.classList.remove("rojo");
	document.body.classList.remove("azul");
	}
}


//========funcion para mostrar el texto en forma de tipyng=========//

function typeText(){
		const type=document.querySelector("#typed");

		if (type) {
		let typed = new Typed(type,{
		strings: ["","HTML", "CSS", "SASS", "JAVASCRIPT", "PHP"],
		typeSpeed:100,
		backSpeed:60,
		loop:true,
		shufle:true
		});
		}
}

//=================================validar el formulario================================//

function validarFormulario(){
	const nombre=document.querySelector("#nombre");
	const telefono=document.querySelector("#telefono");
	const email=document.querySelector("#email");
	const mensaje=document.querySelector("#msg");

	if(nombre || telefono || email || mensaje){

	nombre.addEventListener("blur", validarCampos);
	telefono.addEventListener("blur", validarCampos);
	email.addEventListener("blur", validarCampos);
	mensaje.addEventListener("input", validarCampos);
	formulario.addEventListener('submit', enviarEmail); //se toma todo el formulario
	}


}

function enviarEmail(e){
	// console.log("validando");
	e.preventDefault();


	botonFormulario.textContent = 'Enviando...';
	spinner.classList.add("flex");
	spinner.classList.remove("hidden");

	//se manda antes para que no se reinicie el formulario o se limpie y ya manda los datos por correo
	const serviceID = 'default_service';
   	const templateID = 'template_blx4f0i';

	emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      // botonFormulario.textContent = 'Enviame un mensaje';
    }, (err) => {
       botonFormulario.textContent = 'Enviame un mensaje';
      alert(JSON.stringify(err));
    });
	setTimeout(()=>{
		spinner.classList.add('hidden');
		spinner.classList.remove("flex");

		email.name="";
		email.telefono="";
		email.email="";
		email.msg="";

		formulario.reset();

		comprobarEmail();
		const divExito=document.createElement("DIV");
		divExito.classList.add("divExito");
		const mensajeExito=document.createElement("P");
		mensajeExito.classList.add("exito");
		mensajeExito.textContent="Enviado con exito";
		botonFormulario.textContent = 'Enviame un mensaje';
		divExito.appendChild(mensajeExito);
		formulario.appendChild(divExito);

		setTimeout(()=>{
			divExito.remove();
		},3000)
	},3000);
}

//footer 

const year=new Date().getFullYear();

const derechosAuthor=document.querySelector(".derechos-autor");
derechosAuthor.innerHTML=`<span>Todos Los Derechos Reservados &#9426</span> ${year}. Luis Alberto Lozano Rodiguez`;


//validar los campos que estan vacios
function validarCampos(e){
	if(e.target.value.trim()===""){
		mostrarMensaje(`el campo ${e.target.id} esta vacio`, e.target.parentElement);
		email[e.target.name]="";//antes de comprobar email para que se limpie ese campo y ya despues compruebe prque se queda el dato guardado
		comprobarEmail();//en caso de que el usario lo borre
		return;
	}

	const resultado=validarEmail(e.target.value);
	if(e.target.id==="email" && !resultado){
		mostrarMensaje(`el ${e.target.id} no es valido`, e.target.parentElement );
		email[e.target.name]="";//antes de comprobar email para que se limpie ese campo y ya despues compruebe
		comprobarEmail(); //en caso de que el usuario borre el correo o lo ponga mal
		return;
	}
	const resultadoTelefono=validarTelefono(e.target.value);
	if(e.target.id==='telefono' && !resultadoTelefono){
		mostrarMensaje(`el ${e.target.id} debe de tener 10 digitos`, e.target.parentElement);
		email[e.target.name]="";
		comprobarEmail();
		return;
	}

	limpiarAlerta(e.target.parentElement);

	email[e.target.name]=e.target.value.trim().toLowerCase();
	// console.log(email);
	comprobarEmail();
}

function mostrarMensaje(mensaje, referencia){

	limpiarAlerta(referencia);
	const mensajeError=document.createElement("P");
	mensajeError.classList.add("error");
	mensajeError.textContent=mensaje;
	referencia.appendChild(mensajeError);
}

//limpiar la alerta si ya existe
function limpiarAlerta(referencia){
	const alerta=referencia.querySelector(".error");
	if (alerta) {
		alerta.remove();
	}
}

//validar el email
function validarEmail(email){
		const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ //expresion regular en internet para email

		const resultado=regex.test(email);
		// console.log(resultado);
		return resultado;//para que puedas usarlo en el if
}

//validar el telefono
function validarTelefono(telefono){
	const regex = /^[0-9]{10}$/;
	const resultado=regex.test(telefono);
	return resultado;
}

//comprobar si el objeto esta vacio
function comprobarEmail(e){//no lleva nada por que el email esta como global
	// console.log(email);
	// console.log(Object.values(email).includes(""))
	if(Object.values(email).includes("")){//ya esta y dice que no estan vacios
		// console.log("los campos estan vacios");
		botonFormulario.disabled=true;
		botonFormulario.classList.add("opacity-50");
		return;
	}
	botonFormulario.disabled=false;
	botonFormulario.classList.remove("opacity-50");
}


/*=================== Interception Observer para hacer animaciones al llegar el scroll ========================*/



function interceptarPortafolio(){
	const observador=new IntersectionObserver(llamandoObservador,{
		root:null,
		rootMargin:"0px",
		threshold:0.1
	})

	observador.observe(portafolio);
}

function llamandoObservador(entries, observer){
	entries.forEach(entrie=>{
		if (entrie.isIntersecting) {
			entrie.target.classList.add("visible");
		}
		
	})
}


//animacion de scroll a la seccion sobre mi
function interceptarDatos(){
	const observador=new IntersectionObserver(llamandoSobreMi,{
		root:null,
		rootMargin:"0px",
		threshold:0.3 //hasta el tamaño que queremos que entre la intercepcion
	})

	observador.observe(sobreMi);
}



function llamandoSobreMi(entries, observer){
	entries.forEach(entrie=>{
		if (entrie.isIntersecting) {
			entrie.target.classList.add("animation");		
		}
	})
}

//animacion a los skills

function interceptarSkills(){
	const observador=new IntersectionObserver(llamandoObservadorHabilidades,{
		root:null,
		rootMargin:"0px",
		threshold:0.5 //hasta el tamaño que queremos que entre la intercepcion
	})

	observador.observe(habilidades)
}

function llamandoObservadorHabilidades(entries, observer){
	// const progressBar=document.querySelectorAll(".progres-bar");
	// console.log(progressBar)
	entries.forEach(entrie=>{
		if (entrie.isIntersecting) {
			const progressBars=entrie.target.querySelectorAll(".progress-bar");
			progressBars.forEach(progress=>{
				// console.log(progress);
				// console.log(progress.dataset.width);
				const width=progress.dataset.width;
				progress.style.width=width+"%";
				progress.style.opacity=1;
			})
			// console.log(entrie.target.querySelectorAll(".progress-bar"));

		}
	})
}


/* Colocar el subrayado al menu al dar click en una seccion */
enlaces.forEach(enlace=>{
	// enlaces.forEach(enlace=>{
	// 	enlace.classList.remove("active");
	// })
	enlace.addEventListener("click",()=>{
		enlaces.forEach(enlace=>{
			enlace.classList.remove("active");
		})

		enlace.classList.add("active")
	})
})

//================== observardor de las secciones ===================
const observador=new IntersectionObserver(interceptarSecciones,{
	root:null,
	rootMargin:"-80px 0px 0px 0px ",
	threshold:0.2
})


function interceptarSecciones(entries, observer){
	entries.forEach(entrie=>{
		if (entrie.isIntersecting) {
			const seccionId=entrie.target.getAttribute("id");
			console.log(seccionId);
			resaltarSeccion(seccionId);
		}
	})
}

secciones.forEach(seccion=>observador.observe(seccion))
//secciones.forEach(seccion=>observador.observe(seccion))

function resaltarSeccion(enlaceId){
	enlaces.forEach(enlace=>{
		enlace.classList.remove("active")
	})

	const enlaceActivo=document.querySelector(`.navegacion a[href="#${enlaceId}"]`);
	enlaceActivo.classList.add("active");
}

// emailjs.send("service_r6b99jl","template_u85h2s4",{
// name: "Luis",
// telefono: "5534797749",
// email: "luis@gmail",
// msg: "hola",
// });
// 
