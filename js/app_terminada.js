// 3 modelos de coche cada uno con clases distintas
// cada año que el coche sea mas viejo el seguro baja un 3%
// seguro completo es mas caro que el seguro basico
// realizado con prototyoes y migrado a clases


// clases
// ----------------------------------------------------
//cotizador constructor para seguro
// recolectar los datos





function Seguro (marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
    
    
}

Seguro.prototype.cotizarSeguro = function(informacion){
    /*
    1 = americano 1.15
    2 = asiatico 1.05
    3 = europeo 1.35
    */
    
    let cantidad;
    const base = 2000;
    
    switch (this.marca) {
        case "1":
            cantidad = base * 1.15;
            break;

        case "2":
            cantidad = base * 1.05;
            break;

        case "3":
            cantidad = base * 1.35;
            break;
        
            
    }

    //leer año
    const diferencia = new Date().getFullYear() - this.anio;

    // cada año de diferencia hay que reducir 3% el valor del seguro
    cantidad = cantidad - ((((diferencia * 3) *cantidad) / 100));


    // si el seguro es basico se multiplica por 30% mas
    // si el seguro es completo por 50% mas

    if (this.tipo === 'basico') {
        cantidad = cantidad * 1.30;
        
    } else {
        cantidad = cantidad * 1.50;

    }

    return cantidad;
    
    
}

// todo lo que se muestra
function Interfaz () {
    
    
    
}

// mensaje que se imprime en el html con prototype
Interfaz.prototype.mostrarMensaje = function (mensaje, tipo) {
    const div = document.createElement('div');
    
    if (tipo == 'error') {
        div.classLisst.add('mensaje', 'error');
        
    } else {
        div.classList.add('mensaje', 'correcto');
        
    }
    div.innerHTML = `${mensaje}`
    formulario.insertBefore(div, document.querySelector('.form-group'));
    
    setTimeout(() => {
        
    }, 1500);
    
    
    
    
    
    
}

// imprime el resultado de la cotizacion
Interfaz.prototype.mostrarResultado = function (seguro, total) {
    const resultado = document.getElementById('resultado');

    let marca;
    console.log(seguro);;

    switch (seguro.marca) {
        case '1':
            marca = 'americano';
            break;
        
        case '2':
            marca = 'asiatico';
            break;

        case '3':
            marca = 'europeo';
            break;
            
    }

    
    //crea un div
    const div = document.createElement('div')

    // introduces informacion en el div
    div.innerHTML = `

       <p class= 'header' > tu resumen: <p>
       <p>marca: ${marca} <p>
       <p>año: ${seguro.anio} <p>
       <p>Tipo: ${seguro.tipo} <p>

       <p>total: ${total} <p>
    `;


    //lo insertas
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block'
    setTimeout(() => {

        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 500);
    





    
}



// eventlisteners
// ----------------------------------------------------


const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', capturarDatos )

function capturarDatos (e) {
    
    e.preventDefault();
    // console.log('presionado')
    
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    
    // console.log(marcaSeleccionada);
    
    //selecciona el id del select que quieres sacar
    const anio = document.getElementById('anio');
    
    // sacas el valor del option concreto
    const anioselect = anio.options[anio.selectedIndex].value
    
    // muestras por consola
    // console.log(anioselect);
    
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    // console.log(tipo);
    
    
    
    
    //crear instancia de interfaz
    const interfaz = new Interfaz();
    
    // revisamos que los campos no esten vacios
    if (marcaSeleccionada == '' || anioselect == '' || tipo == '') {
        //interfaz imprimiendo un error
        interfaz.mostrarMensaje('cotizando ....', 'existo');
        
    } else {
        // limpiar resultado anteriores
        const resultados = document.querySelector('#resultado div')
        if (resultados != null) {
            resultados.remove();

            
        }



        //instanca seguro y mostar interfaz
        const seguro = new Seguro(marcaSeleccionada, anioselect, tipo)
        
        // cotizar seguro
        const cantidad = seguro.cotizarSeguro(seguro);

        // mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        
        
        
    }
    
    
    
    
    
    
    
}






// generar los años a seleccionar el seguro del coche para no escribirlos todos a mano
const max = new Date().getFullYear(),
min = max - 20;

// console.log(max);
// console.log(min);

const selecAnios = document.getElementById('anio');

for (let i = max; i > min; i--) {
    
    let option = document.createElement('option')
    option.value = i;
    option.innerHTML = i;
    
    selecAnios.appendChild(option);
    
}
