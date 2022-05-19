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
let finalsOneWayg = [];

//GET DATA FROM LOCAL DB
const getData = async () => {
    //Getting data
    origen.value = params.get('origenVuelo');
    destino.value = params.get('destinoVuelo');
    fechaOrigen.value = params.get('fechaIda');
    fechaRetorno.value = params.get('fechaRetorno');
    passNum.value = params.get('numberPass');
    categorySelected.value = params.get('classes');

    try {
        const dataVuelos = await fetch('http://127.0.0.1:5500/js/db/db.json');
        const data = await dataVuelos.json();
        data.map(ruta => {
            routesAvailable.push(ruta);
        });
    } catch(err) {
        console.log('Informacion no encontrada', err);
    };

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
    finalsOneWayg = finalsOneWay;

    localStorage.removeItem('rutasSeleccionadas');

    sessionStorage.setItem('numeroPass', passNum.value);
    sessionStorage.setItem('skyCategory', categorySelected.value);

    showFlights(finalsOneWay, 'Seleccione su viaje de ida');
};

getData();

function showFlights(arrayFlights, title) {
    if(arrayFlights.length > 0) {
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
    } else {
        const titleArr = title.split(' ');
        const lasTword = titleArr[titleArr.length - 1];
        const sectionTit = document.getElementById('flightsFirstLeg');
        const cardRows = document.querySelector('#cardsFligts');

        if(lasTword == 'ida') {
            const h2TitleIda = document.createElement('h2');
            h2TitleIda.className = 'display-4 text-center p-3 noFlightsTitle';
            h2TitleIda.textContent = 'Lo sentimos, SkyLimit Airline no cuenta con un vuelo programado para ese día y destinos!! 😢';

            sectionTit.insertBefore(h2TitleIda, cardRows);
        };

        if(lasTword == 'retorno') {
            const h2TitleRetorno = document.createElement('h2');
            h2TitleRetorno.className = 'display-4 text-center p-3 noFlightsTitle';
            h2TitleRetorno.textContent = 'Lo sentimos, SkyLimit Airline no cuenta con un vuelo de retorno programado para ese día y destinos!! 😢';

            sectionTit.insertBefore(h2TitleRetorno, cardRows);
        };
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

        showFlights(finalsOneWayg, 'Seleccione su viaje de ida');
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