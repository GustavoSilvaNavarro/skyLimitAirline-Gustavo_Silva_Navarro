const fleet = {
    boeing767300: {
        economyClass: {
            seatNumbers: 138,
            seatConfiguration: '2-3-2'
        },
        PremiumEconomyClass: {
            seatNumbers: 46,
            seatConfiguration: '2-3-2'
        },
        BusinessFirstClass: {
            seatNumbers: 30,
            seatConfiguration: '1-1-1'
        }
    },
    boeing767400: {
        economyClass: {
            seatNumbers: 131,
            seatConfiguration: '2-3-2'
        },
        PremiumEconomyClass: {
            seatNumbers: 70,
            seatConfiguration: '2-3-2'
        },
        BusinessFirstClass: {
            seatNumbers: 39,
            seatConfiguration: '2-1-2'
        }
    },
    boeing757200: {
        economyClass: {
            seatNumbers: 108,
            seatConfiguration: '3-3'
        },
        PremiumEconomyClass: {
            seatNumbers: 45,
            seatConfiguration: '3-3'
        },
        BusinessFirstClass: {
            seatNumbers: 16,
            seatConfiguration: '2-2'
        }
    }
};

class Routes {
    constructor(id, returnFlight, firstDate, destinationPrice, destination, returnDate, returnPrice, plane) {
        this.id = id;
        this.return = {
            returnFlight: returnFlight,
            returnDate: returnDate,
            returnPrice: returnPrice,
        };
        this.destination = {
            destination: destination,
            firstdate: firstDate,
            destinationPrice: destinationPrice,
        };
        this.plane = plane;
        this.totalPrice = 0;
        this.iva = 0;
    };

    sumaTicket() {
        const price = this.return.returnPrice + this.destination.destinationPrice;
        this.totalPrice = price;
        return price;
    };

    taxes() {
        const tax = this.totalPrice * 0.1;
        this.iva = tax;
        return tax;
    };
};

class myTicket {
    constructor(passNum, passanger, reservation, ida, fechaIda, vuelta, fechaVuelta, total, tarifa) {
        this.passNum = passNum;
        this.passanger = passanger;
        this.reservation = reservation;
        this.ida = ida;
        this.fechaIda = fechaIda;
        this.vuelta = vuelta;
        this.fechaVuelta = fechaVuelta;
        this.total = total;
        this.tarifa = tarifa;
    };

    generateTicket() {
        return `FELICIDADES\n\nEstimado, pasajero ${this.passNum} ${this.passanger}, esta es la información de su viaje:\n\nNumero de reserva: ${this.reservation}:\nTarifa: ${this.tarifa}\nVuelo ida: ${this.ida} - Fecha: ${this.fechaIda}\nVuelo retorno: ${this.vuelta} - Fecha: ${this.fechaVuelta}\nTotal a Pagar: ${this.total} USD`;
    };
}

let routesAvailable = [];
let returnPlaces = [];
let destinationPlaces = [];
let categories = ['economy class', 'premium economy class', 'business / first class'];

routesAvailable.push(new Routes(1, 'argentina', '10/05/2022', 549.85, 'peru', '24/05/2022', 349.57, fleet.boeing757200));
routesAvailable.push(new Routes(2, 'argentina', '14/06/2022', 449.85, 'colombia', '02/06/2022', 349.57, fleet.boeing767300));
routesAvailable.push(new Routes(3, 'argentina', '10/07/2022', 349.85, 'bolivia', '08/07/2022', 349.57, fleet.boeing767400));
routesAvailable.push(new Routes(4, 'argentina', '10/08/2022', 559.85, 'paraguay', '14/08/2022', 349.57, fleet.boeing757200));
routesAvailable.push(new Routes(5, 'ecuador', '10/09/2022', 239.85, 'bolivia', '23/09/2022', 349.57, fleet.boeing767300));
routesAvailable.push(new Routes(6, 'argentina', '10/10/2022', 899.85, 'brasil', '31/10/2022', 349.57, fleet.boeing767400));
routesAvailable.push(new Routes(7, 'chile', '10/11/2022', 589.85, 'colombia', '30/11/2022', 349.57, fleet.boeing757200));
routesAvailable.push(new Routes(8, 'bolivia', '10/08/2022', 559.85, 'paraguay', '14/08/2022', 349.57, fleet.boeing767300));
routesAvailable.push(new Routes(9, 'ecuador', '10/09/2022', 239.85, 'bolivia', '23/09/2022', 349.57, fleet.boeing767400));
routesAvailable.push(new Routes(10, 'paraguay', '10/10/2022', 899.85, 'brasil', '31/10/2022', 349.57, fleet.boeing757200));
routesAvailable.push(new Routes(11, 'chile', '10/11/2022', 589.85, 'colombia', '30/11/2022', 349.57, fleet.boeing767300));
routesAvailable.push(new Routes(12, 'brasil', '25/05/2022', 649.85, 'ecuador', '17/12/2022', 349.57, fleet.boeing767400));
routesAvailable.push(new Routes(13, 'peru', '25/05/2022', 649.85, 'ecuador', '17/12/2022', 349.57, fleet.boeing757200));
routesAvailable.push(new Routes(14, 'brasil', '10/05/2022', 549.85, 'peru', '24/05/2022', 349.57, fleet.boeing767300));
routesAvailable.push(new Routes(15, 'brasil', '14/06/2022', 449.85, 'colombia', '02/06/2022', 349.57, fleet.boeing767400));
routesAvailable.push(new Routes(16, 'brasil', '10/07/2022', 349.85, 'bolivia', '08/07/2022', 349.57, fleet.boeing757200));
routesAvailable.push(new Routes(17, 'brasil', '10/08/2022', 559.85, 'paraguay', '14/08/2022', 349.57, fleet.boeing767300));
routesAvailable.push(new Routes(18, 'ecuador', '10/05/2022', 549.85, 'peru', '24/05/2022', 349.57, fleet.boeing767400));
routesAvailable.push(new Routes(19, 'ecuador', '14/06/2022', 449.85, 'colombia', '02/06/2022', 349.57, fleet.boeing757200));
routesAvailable.push(new Routes(20, 'ecuador', '10/07/2022', 349.85, 'bolivia', '08/07/2022', 349.57, fleet.boeing767300));
routesAvailable.push(new Routes(21, 'ecuador', '10/08/2022', 559.85, 'paraguay', '14/08/2022', 349.57, fleet.boeing767400));
routesAvailable.push(new Routes(22, 'peru', '10/05/2022', 549.85, 'argentina', '24/05/2022', 349.57, fleet.boeing757200));
routesAvailable.push(new Routes(23, 'peru', '14/06/2022', 449.85, 'colombia', '02/06/2022', 349.57, fleet.boeing767300));
routesAvailable.push(new Routes(24, 'peru', '10/07/2022', 349.85, 'bolivia', '08/07/2022', 349.57, fleet.boeing767400));
routesAvailable.push(new Routes(25, 'peru', '10/08/2022', 559.85, 'paraguay', '14/08/2022', 349.57, fleet.boeing757200));
routesAvailable.push(new Routes(26, 'colombia', '10/05/2022', 549.85, 'argentina', '24/05/2022', 349.57, fleet.boeing767300));
routesAvailable.push(new Routes(27, 'colombia', '14/06/2022', 449.85, 'chile', '02/06/2022', 349.57, fleet.boeing767400));
routesAvailable.push(new Routes(28, 'colombia', '10/07/2022', 349.85, 'bolivia', '08/07/2022', 349.57, fleet.boeing757200));
routesAvailable.push(new Routes(29, 'colombia', '10/08/2022', 559.85, 'paraguay', '14/08/2022', 349.57, fleet.boeing767300));
routesAvailable.push(new Routes(30, 'bolivia', '10/05/2022', 549.85, 'argentina', '24/05/2022', 349.57, fleet.boeing767400));
routesAvailable.push(new Routes(31, 'bolivia', '14/06/2022', 449.85, 'chile', '02/06/2022', 349.57, fleet.boeing757200));
routesAvailable.push(new Routes(32, 'bolivia', '10/07/2022', 349.85, 'peru', '08/07/2022', 349.57, fleet.boeing767300));
routesAvailable.push(new Routes(33, 'bolivia', '10/08/2022', 559.85, 'paraguay', '14/08/2022', 349.57, fleet.boeing767400));
routesAvailable.push(new Routes(34, 'argentina', '31/07/2022', 749.85, 'peru', '12/08/2022', 239.57, fleet.boeing757200));

//Get return flights
for(let i = 0; i < routesAvailable.length; i++) {
    if(returnPlaces.indexOf(routesAvailable[i].return.returnFlight) === -1) {
        returnPlaces.push(routesAvailable[i].return.returnFlight);
    }
};

for(let i = 0; i < routesAvailable.length; i++) {
    if(destinationPlaces.indexOf(routesAvailable[i].destination.destination) === -1) {
        destinationPlaces.push(routesAvailable[i].destination.destination);
    }
};

const vuelosIdaDispo = destinationPlaces.join('\n');
const vuelosReturDispo = returnPlaces.join('\n');
const category = categories.join('\n');

//FIND YOUR FLIGHT
const findFlight = (ida, vuelta, categoriesAvailable) => {
    let user = prompt('Cual es tu nombre?');

    while(user.trim() == '') {
        user = prompt('Cual es tu nombre?');
    };
    
    alert(`Bienvenido ${user}`);
    
    alert(`Vuelos Disponibles para retorno:\n\n${vuelta}\n\nEn la siguiente pestaña elegir un destino de los mencionados!`);
    let partida = prompt('Cual es tu partida?').toLowerCase().trim();

    while((returnPlaces.indexOf(partida) === -1) || (partida == '')) {
        alert(`Vuelos Disponibles para retorno:\n\n${vuelta}\n\nEn la siguiente pestaña elegir un destino de los mencionados!`);
        partida = prompt('No se cuentan con vuelos hacia ese destino, favor escoga otro pais para tu retorno!').toLowerCase().trim();
    };

    alert(`Vuelos Disponibles a tu destino:\n\n${ida}\n\nEn la siguiente pestaña elegir un destino de los mencionados!`);
    let destinoFinal = prompt('Cual es tu detino?').toLowerCase().trim();

    while((destinationPlaces.indexOf(destinoFinal) === -1) || (destinoFinal == '')) {
        alert(`Vuelos Disponibles a tu destino:\n\n${ida}\n\nEn la siguiente pestaña elegir un destino de los mencionados!`);
        destinoFinal = prompt('No se cuentan con vuelos hacia ese destino, favor escoga otro destino!').toLowerCase().trim();
    };

    while(destinoFinal == partida) {
        alert('Favor vuelva a escoger los destinos y partidas, estos deben ser diferente!!');
        alert(`Vuelos Disponibles para retorno:\n\n${vuelta}\n\nEn la siguiente pestaña elegir un destino de los mencionados!`);
        partida = prompt('No se cuentan con vuelos hacia ese destino, favor escoga otro pais para tu retorno!').toLowerCase().trim();
        alert(`Vuelos Disponibles a tu destino:\n\n${ida}\n\nEn la siguiente pestaña elegir un destino de los mencionados!`);
        destinoFinal = prompt('No se cuentan con vuelos hacia ese destino, favor escoga otro destino!').toLowerCase().trim();
    };

    const posibleFlights = routesAvailable.filter(route => route.return.returnFlight == partida);
    const finalFlight = posibleFlights.filter(rutaDestino => rutaDestino.destination.destination == destinoFinal);

    selectFlight(finalFlight, user, categoriesAvailable);
};

const selectFlight = (finalOptions, passanger, categoriesAvailable) => {
    let pasajeros = parseInt(prompt('Indique el numero de pasajeros!'));

    while(isNaN(pasajeros) || pasajeros == '' || pasajeros < 1) {
        pasajeros = parseInt(prompt('Indique el numero de pasajeros!'));
    };

    alert(`Favor escoga alguna de las siguientes categorias:\n\n${categoriesAvailable}\n\nFavor escoga su categoria`);
    let categoria = prompt('Escriba que tipo de categoria le gustaria?').toLocaleLowerCase().trim();

    while((categories.indexOf(categoria) === -1) || (categoria == '')) {
        alert(`Selección invalida. Favor vuelva a insertar su categoria:\n\n${categoriesAvailable}\n\nEn la siguiente pestaña elegir una categoria!`);
        categoria = prompt('Escriba que tipo de categoria le gustaria?').toLocaleLowerCase().trim();
    };

    if(finalOptions.length != 0) {
        let differentOptions = [];
        let unicasOpciones = [];
        for(let i = 0; i < finalOptions.length; i++) {
            const destinoPais = finalOptions[i].destination.destination;
            const fechaIda = finalOptions[i].destination.firstdate;
            const retornoPais = finalOptions[i].return.returnFlight;
            const fechaVuelta = finalOptions[i].return.returnDate;
            const costoTicket = finalOptions[i].sumaTicket();
            const impuesto = finalOptions[i].taxes();
            const TotalTicket = costoTicket + impuesto;
            const options = finalOptions[i].id;
            unicasOpciones.push(options);
            differentOptions.push(`Opcion: ${options} | Ida: ${destinoPais} - Fecha ida: ${fechaIda} / Vuelta: ${retornoPais} - Fecha Vuelta: ${fechaVuelta} | Precio a Pagar: ${TotalTicket}`);
        }

        const opciones = differentOptions.join('\n\n');
        alert(`Estas son tus opciones de vuelo:\n\n${opciones}\n\nFavor en la siguiente pantalla indica el numero de opcion!`);

        let choice = parseInt(prompt('Favor indicar su opción?'));

        while((unicasOpciones.indexOf(choice) === -1) || (isNaN(choice))) {
            alert(`Estas son tus opciones de vuelo:\n\n${opciones}\n\nFavor en la siguiente pantalla indica el numero de opcion!`);
            choice = parseInt(prompt('Favor indicar una de las opciones indicadas!'));
        };

        const optionSelected = finalOptions.filter(flight => flight.id == choice);

        if(pasajeros == 1) {
            const res = reservationGenerator(6);

            const yourTicket = (new myTicket(pasajeros, passanger, res, optionSelected[0].destination.destination, optionSelected[0].destination.firstdate, optionSelected[0].return.returnFlight, optionSelected[0].return.returnDate, optionSelected[0].iva + optionSelected[0].totalPrice, categoria));
            const miReserva = yourTicket.generateTicket();    
            alert(miReserva);
        } else {
            let myReservas = [];
            const totalPass = numberPassager(pasajeros);

            for(let i = 0; i < totalPass.length; i++) {
                const res = reservationGenerator(6);

                const tickets = (new myTicket(i+1, totalPass[i], res, optionSelected[0].destination.destination, optionSelected[0].destination.firstdate, optionSelected[0].return.returnFlight, optionSelected[0].return.returnDate, optionSelected[0].iva + optionSelected[0].totalPrice, categoria));
                const reserva = tickets.generateTicket();
                myReservas.push(reserva);
            };

            const allReservas = myReservas.join('\n\n');
            alert(`Estimado ${passanger}, estas son tus reseras:\n\n${allReservas}`);
        };
    } else {
        alert('Lo sentimos!\n\nVuelo no disponible por el momento, vuela a realizar su busqueda, recargando la pagina nuevamente!');
    };
};

const numberPassager = (numPass) => {
    let pasajeros = [];
    for(let i = 0; i < numPass; i++) {
        let passangers = prompt('Indique el nombre del pasajero?').toLocaleLowerCase().trim();
        while(passangers == '') {
            passangers = prompt('Indique el nombre del pasajero?').toLocaleLowerCase().trim();
        };
        pasajeros.push(passangers);
    };

    return pasajeros;
};

//GENERADOR DE RESERVAS
const reservationGenerator = len => {
    let reservation = '';
    for(let i = 0; i < len; i++) {
        const index = (Math.random() * 26) + 65;
        let letra = String.fromCharCode(index);
        reservation += letra;
    }

    return reservation;
};

findFlight(vuelosIdaDispo, vuelosReturDispo, category);