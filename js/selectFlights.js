flatpickr("input[type=date]", {
    minDate: "today",
    dateFormat: "d/m/Y",
});

//GET FORM DATA
const params = new URLSearchParams(window.location.search);

//DATA
const origen = document.querySelector('#from');
const destino = document.querySelector('#to');
const fechaOrigen = document.querySelector('#fechaIda2');
const fechaRetorno = document.querySelector('#fechaRetorno2');
const passNum = document.querySelector('#passangerNumeros');
const categorySelected = document.querySelector('#categorySelection');
const formSearch = document.querySelector('#searchFlightForm');
const flightBtn = document.querySelector('#flightBtn');
let routesAvailable = [];
let origenFlightsAvailable = [];
let destinoFlightsAvailable = [];
let routeSelectedByUser = [];
let categories = ['economy class', 'premium economy class', 'business / first class'];

//Getting data
origen.value = params.get('origenVuelo');
destino.value = params.get('destinoVuelo');
fechaOrigen.value = params.get('fechaIda');
fechaRetorno.value = params.get('fechaRetorno');
passNum.value = params.get('numberPass');
categorySelected.value = params.get('classes');

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
    constructor(origenFlight, destinoFlight, takeoffDate, takeOffTime, landingTime, plane, priceLeg, selected) {
        this.id = uuidv4();
        this.origenFlight = origenFlight;
        this.destinoFlight = destinoFlight;
        this.takeoffDate = takeoffDate;
        this.takeOffTime = takeOffTime;
        this.landingTime = landingTime;
        this.plane = plane;
        this.priceLeg = priceLeg;
        this.selected = selected;
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
};

routesAvailable.push(new Routes('argentina', 'peru', '16/05/2022', '11:55', '14:25', fleet.boeing757200, 859.32, false));
routesAvailable.push(new Routes('argentina', 'peru', '16/05/2022', '10:55', '12:36', fleet.boeing757200, 623.96, false));
routesAvailable.push(new Routes('argentina', 'peru', '02/05/2022', '00:25', '04:36', fleet.boeing757200, 428.10, false));
routesAvailable.push(new Routes('argentina', 'peru', '16/05/2022', '01:00', '07:06', fleet.boeing757200, 652.23, false));
routesAvailable.push(new Routes('argentina', 'peru', '02/05/2022', '23:36', '06:15', fleet.boeing757200, 329.46, false));
routesAvailable.push(new Routes('argentina', 'peru', '03/05/2022', '02:45', '10:52', fleet.boeing757200, 1023.16, false));
routesAvailable.push(new Routes('argentina', 'bolivia', '02/05/2022', '22:59', '03:15', fleet.boeing767400, 325.36, false));
routesAvailable.push(new Routes('argentina', 'brasil', '03/05/2022', '03:03', '11:36', fleet.boeing767300, 452.32, false));
routesAvailable.push(new Routes('argentina', 'ecuador', '04/05/2022', '21:06', '01:18', fleet.boeing757200, 478.23, false));
routesAvailable.push(new Routes('argentina', 'paraguay', '05/05/2022', '04:09', '10:36', fleet.boeing767400, 856.32, false));
routesAvailable.push(new Routes('argentina', 'venezuela', '06/05/2022', '20:14', '00:55', fleet.boeing767300, 452.78, false));
routesAvailable.push(new Routes('argentina', 'chile', '07/05/2022', '05:18', '12:21', fleet.boeing757200, 753.21, false));
routesAvailable.push(new Routes('argentina', 'colombia', '08/05/2022', '19:15', '23:52', fleet.boeing767400, 423.45, false));
routesAvailable.push(new Routes('peru', 'colombia', '09/05/2022', '06:22', '12:36', fleet.boeing767300, 625.36, false));
routesAvailable.push(new Routes('peru', 'bolivia', '10/05/2022', '18:26', '01:36', fleet.boeing757200, 752.21, false));
routesAvailable.push(new Routes('peru', 'brasil', '11/05/2022', '07:29', '09:42', fleet.boeing767400, 754.26, false));
routesAvailable.push(new Routes('peru', 'ecuador', '12/05/2022', '08:55', '12:34', fleet.boeing767300, 862.48, false));
routesAvailable.push(new Routes('peru', 'paraguay', '13/05/2022', '18:55', '22:29', fleet.boeing757200, 754.25, false));
routesAvailable.push(new Routes('peru', 'venezuela', '13/05/2022', '17:23', '23:42', fleet.boeing767400, 853.75, false));
routesAvailable.push(new Routes('peru', 'chile', '14/05/2022', '13:33', '16:20', fleet.boeing767300, 453.12, false));
routesAvailable.push(new Routes('peru', 'argentina', '01/06/2022', '00:05', '10:26', fleet.boeing757200, 1853.21, false));
routesAvailable.push(new Routes('peru', 'argentina', '01/06/2022', '16:15', '22:58', fleet.boeing767300, 458.36, false));
routesAvailable.push(new Routes('peru', 'argentina', '01/06/2022', '09:45', '14:15', fleet.boeing767400, 956.41, false));
routesAvailable.push(new Routes('peru', 'argentina', '01/06/2022', '12:25', '17:09', fleet.boeing757200, 365, false));
routesAvailable.push(new Routes('peru', 'argentina', '01/06/2022', '14:35', '18:26', fleet.boeing767300, 999.99, false));
routesAvailable.push(new Routes('peru', 'argentina', '01/06/2022', '17:23', '20:36', fleet.boeing767400, 315.68, false));
routesAvailable.push(new Routes('peru', 'argentina', '05/06/2022', '00:05', '10:26', fleet.boeing757200, 1853.21, false));
routesAvailable.push(new Routes('peru', 'argentina', '05/06/2022', '16:15', '22:58', fleet.boeing767300, 458.36, false));
routesAvailable.push(new Routes('peru', 'argentina', '05/06/2022', '09:45', '14:15', fleet.boeing767400, 956.41, false));
routesAvailable.push(new Routes('peru', 'argentina', '05/06/2022', '12:25', '17:09', fleet.boeing757200, 365, false));
routesAvailable.push(new Routes('colombia', 'peru', '16/05/2022', '15:39', '17:42', fleet.boeing767400, 452.32, false));
routesAvailable.push(new Routes('colombia', 'bolivia', '17/05/2022', '08:41', '13:14', fleet.boeing767300, 741.36, false));
routesAvailable.push(new Routes('colombia', 'brasil', '18/05/2022', '18:46', '22:56', fleet.boeing767400, 369.25, false));
routesAvailable.push(new Routes('colombia', 'ecuador', '19/05/2022', '19:49', '21:34', fleet.boeing757200, 852.13, false));
routesAvailable.push(new Routes('colombia', 'paraguay', '20/05/2022', '03:50', '06:05', fleet.boeing767300, 741.97, false));
routesAvailable.push(new Routes('colombia', 'venezuela', '21/05/2022', '08:55', '12:16', fleet.boeing767400, 236.14, false));
routesAvailable.push(new Routes('colombia', 'chile', '22/05/2022', '10:59', '15:42', fleet.boeing767300, 563.21, false));
routesAvailable.push(new Routes('chile', 'argentina', '23/05/2022', '06:03', '11:26', fleet.boeing757200, 896.32, false));
routesAvailable.push(new Routes('chile', 'peru', '24/05/2022', '23:05', '03:12', fleet.boeing767400, 321.47, false));
routesAvailable.push(new Routes('chile', 'bolivia', '25/05/2022', '00:07', '06:32', fleet.boeing767300, 147.89, false));
routesAvailable.push(new Routes('chile', 'brasil', '26/05/2022', '00:11', '04:38', fleet.boeing757200, 856.14, false));
routesAvailable.push(new Routes('chile', 'ecuador', '27/05/2022', '14:45', '18:16', fleet.boeing767400, 752.35, false));
routesAvailable.push(new Routes('chile', 'paraguay', '28/05/2022', '12:35', '16:06', fleet.boeing767300, 745.36, false));
routesAvailable.push(new Routes('chile', 'venezuela', '29/05/2022', '11:25', '15:23', fleet.boeing757200, 154.32, false));
routesAvailable.push(new Routes('chile', 'colombia', '30/05/2022', '11:23', '15:43', fleet.boeing767400, 452.94, false));
routesAvailable.push(new Routes('brasil', 'argentina', '08/05/2022', '11:29', '15:33', fleet.boeing767300, 752.36, false));
routesAvailable.push(new Routes('brasil', 'venezuela', '01/05/2022', '14:45', '17:53', fleet.boeing757200, 756.21, false));
routesAvailable.push(new Routes('brasil', 'peru', '02/05/2022', '15:55', '19:04', fleet.boeing767400, 785.96, false));
routesAvailable.push(new Routes('brasil', 'bolivia', '03/05/2022', '18:55', '21:24', fleet.boeing767300, 452.36, false));
routesAvailable.push(new Routes('brasil', 'chile', '04/05/2022', '01:55', '06:14', fleet.boeing757200, 452.36, false));
routesAvailable.push(new Routes('brasil', 'ecuador', '05/05/2022', '05:55', '09:34', fleet.boeing767400, 753.15, false));
routesAvailable.push(new Routes('brasil', 'paraguay', '06/05/2022', '23:55', '03:44', fleet.boeing767300, 856.37, false));
routesAvailable.push(new Routes('brasil', 'colombia', '07/05/2022', '14:55', '20:54', fleet.boeing757200, 1024.01, false));
routesAvailable.push(new Routes('ecuador', 'argentina', '09/05/2022', '16:55', '21:05', fleet.boeing767400, 452, false));
routesAvailable.push(new Routes('ecuador', 'venezuela', '10/05/2022', '17:55', '22:15', fleet.boeing767300, 851, false));
routesAvailable.push(new Routes('ecuador', 'peru', '11/05/2022', '19:55', '00:25', fleet.boeing757200, 452, false));
routesAvailable.push(new Routes('ecuador', 'bolivia', '12/05/2022', '18:55', '23:35', fleet.boeing767400, 657, false));
routesAvailable.push(new Routes('ecuador', 'chile', '13/05/2022', '13:55', '17:45', fleet.boeing767300, 741, false));
routesAvailable.push(new Routes('ecuador', 'brasil', '14/05/2022', '12:55', '16:55', fleet.boeing757200, 256, false));
routesAvailable.push(new Routes('ecuador', 'paraguay', '15/05/2022', '09:55', '13:01', fleet.boeing767400, 167, false));
routesAvailable.push(new Routes('ecuador', 'colombia', '16/05/2022', '12:55', '14:21', fleet.boeing767300, 953, false));

//Get return flights
for(let i = 0; i < routesAvailable.length; i++) {
    if(origenFlightsAvailable.indexOf(routesAvailable[i].origenFlight) === -1) {
        origenFlightsAvailable.push(routesAvailable[i].origenFlight);
    };
};

for(let i = 0; i < routesAvailable.length; i++) {
    if(destinoFlightsAvailable.indexOf(routesAvailable[i].destinoFlight) === -1) {
        destinoFlightsAvailable.push(routesAvailable[i].destinoFlight);
    };
};

//Search for tickets first Leg
const idasPosibles = routesAvailable.filter(paisOrigen => paisOrigen.origenFlight == origen.value.toLowerCase().trim());
const posibleDestinations = idasPosibles.filter(posibleDestino => posibleDestino.destinoFlight == destino.value.toLowerCase().trim());
const finalsOneWay = posibleDestinations.filter(oneWayFinal => oneWayFinal.takeoffDate == fechaOrigen.value);

localStorage.removeItem('rutasSeleccionadas');

sessionStorage.setItem('numeroPass', passNum.value);
sessionStorage.setItem('skyCategory', categorySelected.value);

showFlights(finalsOneWay, 'Seleccione su viaje de ida');

function showFlights(arrayFlights, title) {
    const section = document.querySelector('#flightsFirstLeg');
    const cards = document.querySelector('#cardsFligts');
    const details = document.querySelector('#flightsDetails');
    const h1 = document.createElement('h1');
    h1.setAttribute('id', 'titlefirstLegFlight');
    h1.classList.add('sectionCard__title');
    h1.textContent = title;
    section.insertBefore(h1, cards);

    let tituloTipoVuelo;

    (JSON.parse(localStorage.getItem('rutasSeleccionadas')) == null) ? tituloTipoVuelo = 'ida' : tituloTipoVuelo = 'retorno';

    for(let i = 0; i < arrayFlights.length; i++) {
        const div = document.createElement('div');
        div.className = 'card mb-3 ms-5 cardsFirstLegAll';
        const flight = `
            <a type="button" id="${arrayFlights[i].id}" onclick='addFlight("${arrayFlights[i].id}", "${tituloTipoVuelo}")'>
                <div class="card-body">
                    <p class="fs-6 dateOfFlight m-0"><strong>Fecha: </strong>${arrayFlights[i].takeoffDate}</p>
                    <hr>
                    <div class="row d-flex align-items-center">
                        <div class="col-md-8">
                            <div class="flightDetail">
                                <div class="takeOffDetails">
                                    <p class="me-1 fs-4 timeFlight mb-0">${arrayFlights[i].takeOffTime}</p>
                                    <p class="fs-4 flightOrigen mb-0">${arrayFlights[i].origenFlight.toUpperCase().slice(0, 3)}</p>
                                </div>
                                <i class="fa-solid fa-plane"></i>
                                <div class="landingDetails">
                                    <p class="me-1 fs-4 mb-0 timeLanding">${arrayFlights[i].landingTime}</p>
                                    <p class="fs-4 mb-0 flightLanding">${arrayFlights[i].destinoFlight.toUpperCase().slice(0, 3)}</p>
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
    if(JSON.parse(localStorage.getItem('rutasSeleccionadas')) == null) {
        const purchaseDetail = document.querySelector('#purchaseDetails');
        const h2 = document.createElement('h2');
        h2.setAttribute('id', 'resumenFirstLegOrder');
        h2.className = "text-center display-5 mt-2";
        h2.textContent = 'Resumen de tu viaje';
        purchaseDetail.appendChild(h2);
    };
};

const addFlight = (id, titulo) => {
    if(JSON.parse(localStorage.getItem('rutasSeleccionadas')) == null || JSON.parse(localStorage.getItem('rutasSeleccionadas')).length < 2) {
        const idaElegida = routesAvailable.filter(route => route.id == id);

        const purchaseDetail = document.querySelector('#purchaseDetails');
        const divPurchase = document.createElement('div');
        divPurchase.setAttribute('id', `${titulo}Seleccionado`);
        divPurchase.classList.add('mt-2');

        //One way flight
        const order = `
            <div class="container d-flex align-items-center mt-3">
                <p class="fw-bold mb-0 timeFlight">Vuelo de ${titulo}</p>
                <i class="fa-solid fa-circle mx-2 fw-bold circleIcon"></i>
                <p class="mb-0">${idaElegida[0].takeoffDate}</p>
            </div>

            <div class="container mt-2">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-around">
                            <div class="d-flex flex-column">
                                <p class="mb-0 fs-4 orderTakeoffDetail">${idaElegida[0].takeOffTime}</p>
                                <p class="mb-0 fs-6 orderOrigenFlight">${idaElegida[0].origenFlight.toUpperCase().slice(0, 3)}</p>
                            </div>
                            <i class="fa-solid fa-plane timeFlight"></i>
                            <div class="d-flex flex-column">
                                <p class="mb-0 fs-4 orderLandingDetail">${idaElegida[0].landingTime}</p>
                                <p class="mb-0 fs-6 orderLandingFlight text-end">${idaElegida[0].destinoFlight.toUpperCase().slice(0, 3)}</p>
                            </div>
                            <p class="fs-1 m-0">|</p>
                            <div class="fligthSelectedContainer">
                                <button class="fligthSelected__btn" onclick='updateFlight("${id}")'>Cambiar</button>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        `;

        divPurchase.innerHTML = order;
        purchaseDetail.appendChild(divPurchase);

        if(JSON.parse(localStorage.getItem('rutasSeleccionadas')) != null) {
            routeSelectedByUser.push(idaElegida[0]);
            localStorage.setItem('rutasSeleccionadas', JSON.stringify(routeSelectedByUser));
        } else {
            //GUARDO EN LOCAL STORAGE
            routeSelectedByUser.push(idaElegida[0]);
            localStorage.setItem('rutasSeleccionadas', JSON.stringify(idaElegida));
        };

        //Getting info
        if(JSON.parse(localStorage.getItem('rutasSeleccionadas')).length < 2) {
            removeCode();
            showFlights(getFinalRoutes(), 'Seleccione su viaje de retorno');
        } else {
            removeCode();

            //Button
            const divBtn = document.createElement('div');
            divBtn.className = 'container d-grid mt-3';
            divBtn.setAttribute('id', 'generateTickets');
            const aBtn = document.createElement('a');
            aBtn.className = 'btn btn-primary btn-lg text-center'
            aBtn.setAttribute('href', './passangers.html');
            aBtn.innerText = 'Comprar Ticket';
            divBtn.append(aBtn);
            purchaseDetail.appendChild(divBtn);
        };
    };
};

//Remove html
function removeCode() {
    const titleIda = document.querySelector('#titlefirstLegFlight');
    const titleResumen = document.querySelector('#resumenFirstLegOrder');
    const cardFlights = document.querySelector('#flightsDetails').querySelectorAll('.cardsFirstLegAll');
    const myFlights = document.querySelector('#purchaseDetails').querySelectorAll('.mt-2');
    const buttonCreator = document.querySelector('#generateTickets');

    if(JSON.parse(localStorage.getItem('rutasSeleccionadas')) == null) {
        (myFlights.length > 0) && myFlights.forEach(flight => flight.remove());
        (titleResumen != null) && titleResumen.remove();
        (buttonCreator != null) && buttonCreator.remove();
    };

    (titleIda != null) && titleIda.remove();
    (cardFlights.length > 0) && cardFlights.forEach(cardDiv => cardDiv.remove());
};

const updateFlight = id => {
    if(JSON.parse(localStorage.getItem('rutasSeleccionadas'))[0].id == id) {
        routeSelectedByUser.splice(0, routeSelectedByUser.length);
        localStorage.removeItem('rutasSeleccionadas');

        removeCode();

        showFlights(finalsOneWay, 'Seleccione su viaje de ida');
    } else {
        document.querySelector('#retornoSeleccionado').remove();
        document.querySelector('#generateTickets').remove();
        routeSelectedByUser.pop();
        localStorage.setItem('rutasSeleccionadas', JSON.stringify(routeSelectedByUser));

        showFlights(getFinalRoutes(), 'Seleccione su viaje de retorno');
    };
};

//Get final routes
const getFinalRoutes = () => {
    const posibleOrigensReturns = routesAvailable.filter(origenCountryReturn => origenCountryReturn.origenFlight == destino.value.toLowerCase().trim());
    const posibleDestinationReturns = posibleOrigensReturns.filter(posibleDestinoReturn => posibleDestinoReturn.destinoFlight == origen.value.toLowerCase().trim());
    const finalsReturns = posibleDestinationReturns.filter(oneWayFinalReturn => oneWayFinalReturn.takeoffDate == fechaRetorno.value);

    return finalsReturns;
};

flightBtn.onclick = () => {
    formSearch.submit();
};