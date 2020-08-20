/*
- creas los años con un bucle de javascript

- capturar datos del formulario

- revisar que los campos no estan vacios, cuando capturas los datos-

- si el campo esta vacio sacas un carte arriba que diga que esta vacio y lo borras en 3 segundo

darme el precio del seguro
precio base
segun modelo
segun año 3% menos

vamos a cotizar el seguro
*/


// vamos a escribir los 20 años de seguro sin hacerlo a mano
// ----------------------------------------------------
const max = new Date().getFullYear();
const min = max - 20;

// miras donde lo vas a insertar
// en este caso en el elementop select 
// como no es muy eficiente definir la variable cada vez que haces el bucle la defines fuera
const selecAnios = document.getElementById('anio');

for (let i = max; i >= min; i--) {
    //crea un option
    let option = document.createElement('option');
    
    // introduces informacion en el option
    option.value = i;
    option.innerHTML = i;
    
    //lo insertas
    selecAnios.appendChild(option);

}


// clases
// ----------------------------------------------------
// esto va recolectar los datos introducidos en el formulario
function Seguro (marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}


Seguro.prototype.cotizarSeguro = function(){
        /*
        calculo del precio
        precioBase = 300;

        americano = 1.15;
        asiatico = 1.05;
        europeo = 1.35; 
        */ 
       let cantidad;

       const base = 2000;

       switch(this.marca) {
           case '1':
               cantidad = base * 1.15
               break;
            
            case '2':
                cantidad = base * 1.05
                break;

            case '3':
                cantidad = base * 1.35
                break;
       
       }
    //console.log(cantidad);

    //do the function for 3% less every year
    const diferencia = new Date().getFullYear() - this.anio
    // 2020-2019=1
    // console.log(diferencia);

    //every year diference reduce 3% value of insurance
    const threePorcentLess = cantidad-((diferencia * 3) * cantidad / 100);
    
    // console.log(threePorcentLess);

    // si el seguro es basico es un 30% es un 30% mas
    // si el seguro es completo 50 % mas
    // let amountFinal;
    let amountFinal;
    if (this.tipo == 'basico') {
        amountFinal = threePorcentLess + (threePorcentLess * 30 / 100)
        
    } else {
        amountFinal = threePorcentLess + (threePorcentLess * 50 / 100)

      
    }
    // console.log(amountFinal);
    return amountFinal;

    

    



};




function Interfaz(){
    
};

Interfaz.prototype.mostrarMensaje = function (mensaje, tipo) {
    // todavia no se para que ha metido esta funcion en un protipo de interfaz???
    // se supone que es para que cuando quieras invocarla sepas a que parte pertenece

    
    //crea un div
    const div = document.createElement('div');

    // añadimos la clase error para darle formato con css
    if (tipo === 'error') {
        div.classList = "error";
    } else {
        div.classList = "correcto";
    }
    

    
    // introduces informacion en el div
    div.innerHTML = `${mensaje}`;

    //otra forma de insertarlo
    //el div creado lo insertas antes de
    // el form-group
    form.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(() => {
        div.remove();

        
    }, 1500);


    
}

// mostrar datos del seguro
// y el resultado final
    // el rsultado final viene de las operaciones del prototype de  cotizarSeguro
Interfaz.prototype.showResult = function (seguro, total) {

    let marca;
    // console.log(resultadodelmetodocotizarseguro);
    switch (seguro.marca) {
        case '1':
            marca = 'americano'
            break;
        case '2':
            marca = 'asiatico'
            break;

        case '3':
            marca = 'Europeo'
            break;
    }


    //seleccionas donde vas a insertar los elementos
    let insertResult = document.getElementById('resultado');

    //pones el elemento que vas a crear
    let div = document.createElement("div");

     //poner la clase a ese elemento
    div.classList = 'removeClass';
    

    // 1 si quieres modificar el elemento creado
    div.innerHTML = `
    <p>Tu Resumen:</p>
    <p>---------------------------------------------------- </p>
    <p>Tu coche es ${marca}</p>
    <p>año: ${seguro.anio}</p>
    <p>tipo: ${seguro.tipo}</p>
    <p>Total <span class="totalColor">${total}</span> €</p>
    `;


    

    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        insertResult.append(div);


        
    }, 1500);

    


}





//capturar datos del formulario


// eventlisteners
// ----------------------------------------------------
//usas un selector para escuchar al form no al boton
const form = document.getElementById('cotizar-seguro');

//escuchas el evento submit y ejecutas la funcion cuando pase
form.addEventListener('submit', leerDatos);

//defines la funcion que se ejecuta
function leerDatos (e) {
    e.preventDefault();
    
    // dato marca
    //seleccionas el id del select
    const marca = document.getElementById('marca');
    // asignas variable para el valor option de esta forma
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    // ya puedes sacarlo
    // console.log(marcaSeleccionada);
    
    // dato año
    //seleccionas el id del select
    const anio = document.getElementById('anio');
    // asignas variable para el valor option de esta forma
    const anioselect = anio.options[anio.selectedIndex].value;
    // ya puedes sacarlo
    // console.log(anioselect);
    
    
    //seleccionas name en comun de los radio buttom
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    // ya puedes sacarlo
    // console.log(tipo);
    
    const interfaz = new Interfaz();
    
    //revismos que los campos no esten vacios
    if (marcaSeleccionada == '') {
        interfaz.mostrarMensaje('faltan datos, revisar el formulario')
        
        
    } else{
        // cotizar el seguro y mostrar los resultado en pantalla
        const seguro = new Seguro(marcaSeleccionada, anioselect, tipo);
        //cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro);

        // clean results
        const divsResults = document.querySelector('#resultado div');
        if (divsResults != null) {
            divsResults.remove();
        }
        interfaz.mostrarMensaje('Cotizando.....', 'Exito' )
        interfaz.showResult(seguro, cantidad);
        
        
        
        
        
        





    }
    
}





