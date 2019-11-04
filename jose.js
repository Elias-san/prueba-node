const inquirer = require('inquirer');

// Preguntas
let preguntasDelivery = [
	{
		type: 'confirm',
		name: 'paraDelivery',
		message: '¿Querés la pizza para delivery?',
	},
	{
		type: 'input',
		name: 'direccionCliente',
		message: 'Escribí la dirección de entrega:',
		when: respuestas => respuestas.paraDelivery,
		validate: rta => rta.trim() == '' ? 'Campo obligatorio' : true,
	},
	{
		type: 'input',
		name: 'nombreCliente',
		message: 'Escribí tu nombre:',
		validate: rtaDeEstaPregunta => {
			if (rtaDeEstaPregunta.trim() == '') {
				return 'El nombre es obligatorio';
			}
			return true;
		}
	},
	{
		type: 'input',
		name: 'telefonoCliente',
		message: 'Escribí tu teléfono:',
		validate: rtaDeEstaPregunta => {
			if (rtaDeEstaPregunta.trim() == '') {
				return 'No puede estar vacío';
			} else if (rtaDeEstaPregunta.length < 8 || isNaN(rtaDeEstaPregunta)) {
				return 'Ingresá un número válido y mayor a 8 números';
			}
			return true;
		}
	},
	{
		type: 'list',
		name: 'gustoPizza',
		message: 'Elegí el gusto de la pizza:',
		choices: ['Muzza', 'Calabresa', 'Napo', 'Fugazzeta']
	},
	{
		type: 'list',
		name: 'tamanioPizza',
		message: 'Elegí el tamaño de la pizza:',
		choices: ['Personal', 'Mediana', 'Grande']
	},
	{
		type: 'confirm',
		name: 'conBebida',
		message: '¿Quéres bebida?'
	},
	{
		type: 'list',
		name: 'gustoBebida',
		message: 'Elegí el gusto de la bebida:',
		choices: ['Coca-cola', 'Pepsi', 'Manaos'],
		// when: rtas => rtas.conBebida,
		when: function (rtas) {
			return rtas.conBebida === true;
		}
	},
	{
		type: 'confirm',
		name: 'clienteHabitual',
		message: '¿Ya has pedido antes?',
		default: false,
	},
	{
		type: 'checkbox',
		name: 'empanadas',
		message: 'Elegí el gusto de las empanadas:',
		choices: ['Carne', 'Pollo', 'Jamón y queso', 'Roquefort'],
		when: function (rtas) {
			return rtas.clienteHabitual === true;
		},
		validate: rta => {
			if (rta.length != 3) {
				return 'Elegí 3 empanadas';
			}
			return true;
		}
	},
];

let laFnDelThen = rtas => {
	
	// for (let prop in rtas) {
	// 	if (typeof rtas[prop] != 'object') {
	// 		rtas[prop] = rtas[prop].trim();
	// 	}
	// }

	console.log('=== Resumen de tu pedido ===');
	console.log('Tus datos son - Nombre: ' + rtas.nombreCliente + ' / Teléfono: ' + rtas.telefonoCliente);
	
	if (rtas.paraDelivery === true) {
		console.log('Tu pedido será entregado en: ' + rtas.direccionCliente);
	} else {
		console.log('Nos indicaste que pasarás a retirar tu pedido');
	}
};

inquirer
	.prompt(preguntasDelivery)
	.then(laFnDelThen);
