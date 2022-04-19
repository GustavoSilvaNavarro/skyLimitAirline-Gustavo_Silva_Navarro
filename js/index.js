flatpickr("input[type=date]", {
    minDate: "today",
    dateFormat: "d/m/Y",
});

const fleet = {
    boeing767300: {
        planeFeatures: {
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
        numberOfPlanes: 5
    },
    boeing767400: {
        planeFeatures: {
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
        numberOfPlanes: 3
    },
    boeing757200: {
        planeFeatures: {
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
        },
        numberOfPlanes: 7
    }
};

class Routes {
    constructor(origenFlight, destinoFlight, takeoffDate, takeOffTime, landingTime, plane, priceLeg) {
        this.origenFlight = origenFlight;
        this.destinoFlight = destinoFlight;
        this.takeoffDate = takeoffDate;
        this.takeOffTime = takeOffTime;
        this.landingTime = landingTime;
        this.plane = plane;
        this.priceLeg = priceLeg;
    };
};

class myTicket {
    constructor(passNum, passanger, reservationNum, rutaIda, Rutavuelta, total, tarifa) {
        this.id = uuidv4();
        this.passNum = passNum;
        this.passanger = passanger;
        this.reservationNum = reservationNum;
        this.rutaIda = rutaIda;
        this.Rutavuelta = Rutavuelta;
        this.total = total;
        this.tarifa = tarifa;
    };
}

const fields = {
    origenVuelo: false,
    destinoVuelo: false,
    fechaIda: false
};

let routesAvailable = [];
let origenFlightsAvailable = [];
let destinoFlightsAvailable = [];
let categories = ['economy class', 'premium economy class', 'business / first class'];

routesAvailable.push(new Routes('argentina', 'peru', '01/05/2022', '11:55', '14:25', fleet.boeing757200.planeFeatures, 859.32));
routesAvailable.push(new Routes('argentina', 'peru', '01/05/2022', '10:55', '12:36', fleet.boeing757200.planeFeatures, 623.96));
routesAvailable.push(new Routes('argentina', 'peru', '02/05/2022', '00:25', '04:36', fleet.boeing757200.planeFeatures, 428.10));
routesAvailable.push(new Routes('argentina', 'peru', '01/05/2022', '01:00', '07:06', fleet.boeing757200.planeFeatures, 652.23));
routesAvailable.push(new Routes('argentina', 'peru', '02/05/2022', '23:36', '06:15', fleet.boeing757200.planeFeatures, 329.46));
routesAvailable.push(new Routes('argentina', 'peru', '03/05/2022', '02:45', '10:52', fleet.boeing757200.planeFeatures, 1023.16));
routesAvailable.push(new Routes('argentina', 'bolivia', '02/05/2022', '22:59', '03:15', fleet.boeing767400.planeFeatures, 325.36));
routesAvailable.push(new Routes('argentina', 'brasil', '03/05/2022', '03:03', '11:36', fleet.boeing767300.planeFeatures, 452.32));
routesAvailable.push(new Routes('argentina', 'ecuador', '04/05/2022', '21:06', '01:18', fleet.boeing757200.planeFeatures, 478.23));
routesAvailable.push(new Routes('argentina', 'paraguay', '05/05/2022', '04:09', '10:36', fleet.boeing767400.planeFeatures, 856.32));
routesAvailable.push(new Routes('argentina', 'venezuela', '06/05/2022', '20:14', '00:55', fleet.boeing767300.planeFeatures, 452.78));
routesAvailable.push(new Routes('argentina', 'chile', '07/05/2022', '05:18', '12:21', fleet.boeing757200.planeFeatures, 753.21));
routesAvailable.push(new Routes('argentina', 'colombia', '08/05/2022', '19:15', '23:52', fleet.boeing767400.planeFeatures, 423.45));
routesAvailable.push(new Routes('peru', 'colombia', '09/05/2022', '06:22', '12:36', fleet.boeing767300.planeFeatures, 625.36));
routesAvailable.push(new Routes('peru', 'bolivia', '10/05/2022', '18:26', '01:36', fleet.boeing757200.planeFeatures, 752.21));
routesAvailable.push(new Routes('peru', 'brasil', '11/05/2022', '07:29', '09:42', fleet.boeing767400.planeFeatures, 754.26));
routesAvailable.push(new Routes('peru', 'ecuador', '12/05/2022', '08:55', '12:34', fleet.boeing767300.planeFeatures, 862.48));
routesAvailable.push(new Routes('peru', 'paraguay', '13/05/2022', '18:55', '22:29', fleet.boeing757200.planeFeatures, 754.25));
routesAvailable.push(new Routes('peru', 'venezuela', '13/05/2022', '17:23', '23:42', fleet.boeing767400.planeFeatures, 853.75));
routesAvailable.push(new Routes('peru', 'chile', '14/05/2022', '13:33', '16:20', fleet.boeing767300.planeFeatures, 453.12));
routesAvailable.push(new Routes('peru', 'argentina', '15/05/2022', '14:35', '18:26', fleet.boeing757200.planeFeatures, 1853.21));
routesAvailable.push(new Routes('colombia', 'peru', '16/05/2022', '15:39', '17:42', fleet.boeing767400.planeFeatures, 452.32));
routesAvailable.push(new Routes('colombia', 'bolivia', '17/05/2022', '08:41', '13:14', fleet.boeing767300.planeFeatures, 741.36));
routesAvailable.push(new Routes('colombia', 'brasil', '18/05/2022', '18:46', '22:56', fleet.boeing767400.planeFeatures, 369.25));
routesAvailable.push(new Routes('colombia', 'ecuador', '19/05/2022', '19:49', '21:34', fleet.boeing757200.planeFeatures, 852.13));
routesAvailable.push(new Routes('colombia', 'paraguay', '20/05/2022', '03:50', '06:05', fleet.boeing767300.planeFeatures, 741.97));
routesAvailable.push(new Routes('colombia', 'venezuela', '21/05/2022', '08:55', '12:16', fleet.boeing767400.planeFeatures, 236.14));
routesAvailable.push(new Routes('colombia', 'chile', '22/05/2022', '10:59', '15:42', fleet.boeing767300.planeFeatures, 563.21));
routesAvailable.push(new Routes('chile', 'argentina', '23/05/2022', '06:03', '11:26', fleet.boeing757200.planeFeatures, 896.32));
routesAvailable.push(new Routes('chile', 'peru', '24/05/2022', '23:05', '03:12', fleet.boeing767400.planeFeatures, 321.47));
routesAvailable.push(new Routes('chile', 'bolivia', '25/05/2022', '00:07', '06:32', fleet.boeing767300.planeFeatures, 147.89));
routesAvailable.push(new Routes('chile', 'brasil', '26/05/2022', '00:11', '04:38', fleet.boeing757200.planeFeatures, 856.14));
routesAvailable.push(new Routes('chile', 'ecuador', '27/05/2022', '14:45', '18:16', fleet.boeing767400.planeFeatures, 752.35));
routesAvailable.push(new Routes('chile', 'paraguay', '28/05/2022', '12:35', '16:06', fleet.boeing767300.planeFeatures, 745.36));
routesAvailable.push(new Routes('chile', 'venezuela', '29/05/2022', '11:25', '15:23', fleet.boeing757200.planeFeatures, 154.32));
routesAvailable.push(new Routes('chile', 'colombia', '30/05/2022', '11:23', '15:43', fleet.boeing767400.planeFeatures, 452.94));
routesAvailable.push(new Routes('brasil', 'argentina', '08/05/2022', '11:29', '15:33', fleet.boeing767300.planeFeatures, 752.36));
routesAvailable.push(new Routes('brasil', 'venezuela', '01/05/2022', '14:45', '17:53', fleet.boeing757200.planeFeatures, 756.21));
routesAvailable.push(new Routes('brasil', 'peru', '02/05/2022', '15:55', '19:04', fleet.boeing767400.planeFeatures, 785.96));
routesAvailable.push(new Routes('brasil', 'bolivia', '03/05/2022', '18:55', '21:24', fleet.boeing767300.planeFeatures, 452.36));
routesAvailable.push(new Routes('brasil', 'chile', '04/05/2022', '01:55', '06:14', fleet.boeing757200.planeFeatures, 452.36));
routesAvailable.push(new Routes('brasil', 'ecuador', '05/05/2022', '05:55', '09:34', fleet.boeing767400.planeFeatures, 753.15));
routesAvailable.push(new Routes('brasil', 'paraguay', '06/05/2022', '23:55', '03:44', fleet.boeing767300.planeFeatures, 856.37));
routesAvailable.push(new Routes('brasil', 'colombia', '07/05/2022', '14:55', '20:54', fleet.boeing757200.planeFeatures, 1024.01));
routesAvailable.push(new Routes('ecuador', 'argentina', '09/05/2022', '16:55', '21:05', fleet.boeing767400.planeFeatures, 452));
routesAvailable.push(new Routes('ecuador', 'venezuela', '10/05/2022', '17:55', '22:15', fleet.boeing767300.planeFeatures, 851));
routesAvailable.push(new Routes('ecuador', 'peru', '11/05/2022', '19:55', '00:25', fleet.boeing757200.planeFeatures, 452));
routesAvailable.push(new Routes('ecuador', 'bolivia', '12/05/2022', '18:55', '23:35', fleet.boeing767400.planeFeatures, 657));
routesAvailable.push(new Routes('ecuador', 'chile', '13/05/2022', '13:55', '17:45', fleet.boeing767300.planeFeatures, 741));
routesAvailable.push(new Routes('ecuador', 'brasil', '14/05/2022', '12:55', '16:55', fleet.boeing757200.planeFeatures, 256));
routesAvailable.push(new Routes('ecuador', 'paraguay', '15/05/2022', '09:55', '13:01', fleet.boeing767400.planeFeatures, 167));
routesAvailable.push(new Routes('ecuador', 'colombia', '16/05/2022', '12:55', '14:21', fleet.boeing767300.planeFeatures, 953));

//console.log(destinoFlightsAvailable);

//Get return flights
for(let i = 0; i < routesAvailable.length; i++) {
    if(origenFlightsAvailable.indexOf(routesAvailable[i].origenFlight) === -1) {
        origenFlightsAvailable.push(routesAvailable[i].origenFlight);
    }
};

for(let i = 0; i < routesAvailable.length; i++) {
    if(destinoFlightsAvailable.indexOf(routesAvailable[i].destinoFlight) === -1) {
        destinoFlightsAvailable.push(routesAvailable[i].destinoFlight);
    }
};

const formFlightSearch = document.querySelector('#formFlightSearch');
const origen = document.getElementById('origenVuelo');
const destino = document.getElementById('destinoVuelo');
const fechaOrigen = document.getElementById('fechaIda');
const fechaRetorno = document.getElementById('fechaRetorno');
const categoryFlight = document.querySelector('#classes');
const inputRadio = document.querySelector('#flexRadioDefault1');

const formValidation = e => {
    from = {lineId: 'lineError', labelId: 'labelError', availableFlights: origenFlightsAvailable, pErrorId: '#fromError', pEmpty: 'El campo From* no debe estar vacio', pMore3: 'Debe tener más de 3 letras', pPlaces: 'Escoger destino en Sudamerica', pSame: 'Origen no debe coincidir con destino', opositeField: destino, fieldValid: 'origenVuelo'};
    to = {lineId: 'lineErrorTo', labelId: 'labelErrorTo', availableFlights: destinoFlightsAvailable, pErrorId: '#toError', pEmpty: 'El campo To* no debe estar vacio', pMore3: 'Debe tener más de 3 letras', pPlaces: 'Escoger destino en Sudamerica', pSame: 'Destino no debe coincidir con origen', opositeField: origen, fieldValid: 'destinoVuelo'};

    console.log(e.target.value);
    switch(e.target.name) {
        case "origenVuelo" :
            //From input
            validationField(from, e, to);
        break;
        case 'destinoVuelo':
            //From input
            validationField(to, e, from);
        break;
    }
};

const isValidDate = date => {
    const reg = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(20[0-9][0-9]|21[0-9][0-9])$/;
    return reg.test(date);
};

const validationField = (field, e, oposite) => {
    const validatePlaces = /^[a-zA-Z\s]{3,10}$/;

    if(e.target.value.toLowerCase().trim() == '') {
        document.getElementById(field.lineId).classList.add('errorColor');
        document.getElementById(field.labelId).classList.add('errorColorLabel');
        const p = document.querySelector(field.pErrorId);
        p.classList.add('errorMessages--active');
        p.textContent = field.pEmpty;

        fields[field.fieldValid] = false;
    } else if(!validatePlaces.test(e.target.value.toLowerCase().trim())) {
        document.getElementById(field.lineId).classList.add('errorColor');
        document.getElementById(field.labelId).classList.add('errorColorLabel');
        const p = document.querySelector(field.pErrorId);
        p.classList.add('errorMessages--active');
        p.textContent = field.pMore3;

        fields[field.fieldValid] = false;
    } else if(field.availableFlights.indexOf(e.target.value.toLowerCase().trim()) === -1) {
        document.getElementById(field.lineId).classList.add('errorColor');
        document.getElementById(field.labelId).classList.add('errorColorLabel');
        const p = document.querySelector(field.pErrorId);
        p.classList.add('errorMessages--active');
        p.textContent = field.pPlaces;

        fields[field.fieldValid] = false;
    } else if(field.opositeField.value.length > 0 && e.target.value == field.opositeField.value) {
        document.getElementById(field.lineId).classList.add('errorColor');
        document.getElementById(field.labelId).classList.add('errorColorLabel');
        const p = document.querySelector(field.pErrorId);
        p.classList.add('errorMessages--active');
        p.textContent = field.pSame;
    } else {
        if(document.getElementById(oposite.lineId).getAttribute('class').split(" ")[1] == 'errorColor' && e.target.value != field.opositeField.value && field.opositeField.value.length > 0 && !(oposite.availableFlights.indexOf(field.opositeField.value.toLowerCase().trim()) == -1)) {
            document.getElementById(oposite.lineId).classList.remove('errorColor');
            document.getElementById(oposite.labelId).classList.remove('errorColorLabel');
            document.querySelector(oposite.pErrorId).classList.remove('errorMessages--active');
            fields[oposite.fieldValid] = true;
        };

        document.getElementById(field.lineId).classList.remove('errorColor');
        document.getElementById(field.labelId).classList.remove('errorColorLabel');
        const p = document.querySelector(field.pErrorId);
        p.classList.remove('errorMessages--active');
        fields[field.fieldValid] = true;
    };
};

origen.addEventListener('keyup', formValidation);
origen.addEventListener('blur', formValidation);
destino.addEventListener('keyup', formValidation);
destino.addEventListener('blur', formValidation);
fechaOrigen.addEventListener('blur', formValidation);

formFlightSearch.addEventListener('submit', e => {
    e.preventDefault();

    if(fechaOrigen.value == '') {
        document.getElementById('lineErrorDate').classList.add('errorColor');
        document.getElementById('labelErrorDate').classList.add('errorColorLabel');
        const p = document.querySelector('#dateError');
        p.classList.add('errorMessages--active');
        p.textContent = 'Campo no puede estar vacio';
        fields.fechaIda = false;
    } else if(!isValidDate(fechaOrigen.value)) {
        document.getElementById('lineErrorDate').classList.add('errorColor');
        document.getElementById('labelErrorDate').classList.add('errorColorLabel');
        const p = document.querySelector('#dateError');
        p.classList.add('errorMessages--active');
        p.textContent = 'Favor ingresar fecha valida';  
        fields.fechaIda = false;
    } else {
        document.getElementById('lineErrorDate').classList.remove('errorColor');
        document.getElementById('labelErrorDate').classList.remove('errorColorLabel');
        const p = document.querySelector('#dateError');
        p.classList.remove('errorMessages--active');
        fields.fechaIda = true;
    };

    if(fields.destinoVuelo && fields.fechaIda && fields.origenVuelo) {
        //Search for tickets one way
        const posibleOrigens = routesAvailable.filter(origenCountry => origenCountry.origenFlight == origen.value.toLowerCase().trim());
        const posibleDestinations = posibleOrigens.filter(posibleDestino => posibleDestino.destinoFlight == destino.value.toLowerCase().trim());
        const finalsOneWay = posibleDestinations.filter(oneWayFinal => oneWayFinal.takeoffDate == fechaOrigen.value);

        showFlights(finalsOneWay);

        formFlightSearch.reset();
    };
});

const showFlights = (arrayFlights) => {
    const section = document.querySelector('#flightsFirstLeg');
    const cards = document.querySelector('#cardsFligts');
    const details = document.querySelector('#flightsDetails');
    const h1 = document.createElement('h1');
    h1.classList.add('sectionCard__title');
    h1.textContent = 'Seleccione su viaje de ida';
    section.insertBefore(h1, cards);

    console.log(arrayFlights);
    for(let i = 0; i < arrayFlights.length; i++) {
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('mb-3');
        div.classList.add('ms-5');
        const flight = `
            <a type="button" id="${[i]}firstLegFlightBtn" onclick='addFlight("${[i]}firstLegFlightBtn")'>
                <div class="card-body">
                    <p class="fs-6 dateOfFlight m-0"><strong>Fecha: </strong>${arrayFlights[i].takeoffDate}</p>
                    <hr>
                    <div class="row d-flex align-items-center">
                        <div class="col-md-8">
                            <div class="flightDetail">
                                <div class="takeOffDetails">
                                    <p class="me-1 fs-4 timeFlight mb-0">${arrayFlights[i].takeOffTime}</p>
                                    <p class="fs-4 flightOrigen mb-0">${arrayFlights[i].origenFlight.toUpperCase()}</p>
                                </div>
                                <i class="fa-solid fa-plane"></i>
                                <div class="landingDetails">
                                    <p class="me-1 fs-4 mb-0 timeLanding">${arrayFlights[i].landingTime}</p>
                                    <p class="fs-4 mb-0 flightLanding">${arrayFlights[i].destinoFlight.toUpperCase()}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 d-flex justify-content-center">
                            <div class="priceDetail">
                            <p class="fs-6 passangerDetail">Adulto desde</p>
                            <p class="fs-4 passangerPrice">${arrayFlights[i].priceLeg} USD</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `;
        div.innerHTML = flight;
        details.appendChild(div);
    };

    //Detalle de Compra
    const purchaseDetail = document.querySelector('#purchaseDetails');
    const h2 = document.createElement('h2');
    h2.className = "text-center display-5 mt-2";
    h2.textContent = 'Resumen de tu viaje';
    purchaseDetail.appendChild(h2);
};

const addFlight = id => {
    const fechaDeIda = document.getElementById(id).children[0].children[0].textContent;
    const horaDespegue = document.getElementById(id).children[0].children[2].children[0].children[0].children[0].children[0].innerHTML;
    const origenVuelo = document.getElementById(id).children[0].children[2].children[0].children[0].children[0].children[1].innerHTML;
    const horaLLegada = document.getElementById(id).children[0].children[2].children[0].children[0].children[2].children[0].innerHTML;
    const llegadaVuelo = document.getElementById(id).children[0].children[2].children[0].children[0].children[2].children[1].innerHTML;
    const precioId = document.getElementById(id).children[0].children[2].children[1].children[0].children[1].innerHTML;
    console.log(fechaDeIda);

    const purchaseDetail = document.querySelector('#purchaseDetails');
    const divPurchase = document.createElement('div');
    divPurchase.classList.add('mt-2');

    //One way flight
    const order = `
        <div class="d-flex align-items-center">
            <p class="fw-bold mb-0 timeFlight">Vuelo de ida</p>
            <i class="fa-solid fa-circle mx-2 fw-bold circleIcon"></i>
            <p class="mb-0">${fechaDeIda.split(" ")[1]}</p>
        </div>

        <div class="container mt-2">
            <div class="card">
                <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex flex-column">
                        <p class="mb-0 fs-4 orderTakeoffDetail">${horaDespegue}</p>
                        <p class="mb-0 fs-6 orderOrigenFlight">${origenVuelo.slice(0, 3)}</p>
                    </div>
                    <i class="fa-solid fa-plane timeFlight"></i>
                    <div class="d-flex flex-column">
                        <p class="mb-0 fs-4 orderLandingDetail">${horaLLegada}</p>
                        <p class="mb-0 fs-6 orderLandingFlight text-end">${llegadaVuelo.slice(0, 3)}</p>
                    </div>
                    </div>
                </div>  
            </div>
        </div>
    `;

    divPurchase.innerHTML = order;
    purchaseDetail.appendChild(divPurchase);
};

/*
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
*/