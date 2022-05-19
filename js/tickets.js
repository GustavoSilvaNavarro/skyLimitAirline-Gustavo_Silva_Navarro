//GET DATA
const flightsElegidos = JSON.parse(localStorage.getItem('rutasSeleccionadas'));
const pasajeros = JSON.parse(localStorage.getItem('pasajerosVuelo'));
const categoriaSky = sessionStorage.getItem('skyCategory');
const numPasajeros = sessionStorage.getItem('numeroPass');

//GLOBAL VARIABLES
let reservation = '';
let order = '';
const itineraryDiv = document.querySelector('#ticketsSection__itinerary');
const col4 = document.querySelector('#ticketsSection__details');

//GENERADOR DE RESERVAS
for(let i = 0; i < 6; i++) {
    const index = (Math.random() * 26) + 65;
    let letra = String.fromCharCode(index);
    reservation += letra;
};

for(let i = 0; i < 13; i++) {
    const orderItem = (Math.floor(Math.random()*36)+1).toString(36);
    order += orderItem.toUpperCase();
};

//CREATING TICKET
class myTicket {
    constructor(passNum, passanger, reservationNum, orderNumber, flights, tarifa) {
        this.id = uuidv4();
        this.passNum = passNum;
        this.passanger = passanger;
        this.reservationNum = reservationNum;
        this.orderNumber = orderNumber;
        this.flights = flights;
        this.totalVuelos = 0;
        this.iva = 0;
        this.total = 0;
        this.tarifa = tarifa;
    };

    getTotal() {
        return this.totalVuelos = Math.round(((this.flights.reduce((acc, item) => acc.priceLeg + item.priceLeg)*this.passNum) + Number.EPSILON)*100)/100;
    };

    getIva() {
        return this.iva = Math.round(((this.totalVuelos*0.21)+Number.EPSILON)*100)/100;
    };

    getTotalPrice() {
        return this.total = Math.round(((this.totalVuelos + this.iva)+Number.EPSILON)*100)/100;
    };
};

const ticketsPurchased = new myTicket(numPasajeros, pasajeros, reservation, order, flightsElegidos, categoriaSky);
ticketsPurchased.getTotal();
ticketsPurchased.getIva();
ticketsPurchased.getTotalPrice();

//CATEGORY
const categorySky = ticketsPurchased.tarifa.split('_').join(' ');

//CREATING HTML TITLES
const itineraryTitle = document.createElement('h2');
itineraryTitle.className = 'display-6 paymentTitle';
itineraryTitle.textContent = `Tu viaje a ${flightsElegidos[0].destinoFlight.toUpperCase()}`;
const infoTitle = document.createElement('p');
infoTitle.className = 'fs-5 pb-2 paymentTitle border-bottom border-dark';
infoTitle.innerHTML = `N° Orden: <span class="fw-bold">${ticketsPurchased.orderNumber}</span> | Cod. Reserva: <span class="fw-bold">${ticketsPurchased.reservationNum}</span> | ${ticketsPurchased.passNum} Pasajeros`;

const tarifaPara = document.createElement('p');
tarifaPara.className = 'my-4';
tarifaPara.innerHTML = `<span class="tarifaContainer">${categorySky}</span>`;

const cardTitle = document.createElement('p');
cardTitle.className = 'mt-3 fs-3 paymentTitle';
cardTitle.textContent = 'Revisa tu itinerario';

itineraryDiv.appendChild(itineraryTitle);
itineraryDiv.appendChild(infoTitle);
itineraryDiv.appendChild(tarifaPara);
itineraryDiv.appendChild(cardTitle);

const cardConatiner = document.createElement('div');
cardConatiner.className = 'w-100';

//CREATING THE CARDS
for(let i = 0; i < flightsElegidos.length; i++) {
    let flightDetails = document.createElement('div');
    flightDetails.className = 'mb-5'

    let vueloDetalle = `
        <p class="fs-5 mb-2 fw-bold">${ticketsPurchased.flights[i].origenFlight.toUpperCase()} a ${ticketsPurchased.flights[i].destinoFlight.toUpperCase()}</p>
        <div class="d-flex align-items-center">
            <i class="fa-solid fa-plane-departure me-4 fs-5 paymentTitle"></i>
            <p class="mb-1 paymentTitle fs-5">${ticketsPurchased.flights[i].takeoffDate}</p>
        </div>
        <div class="container p-4">
            <div class="card mx-4">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between px-3">
                        <div class="d-flex flex-column">
                            <p class="mb-0 fs-4 orderTakeoffDetail">${ticketsPurchased.flights[i].takeOffTime}</p>
                            <p class="mb-0 fs-6 paymentTitle fw-bold">${ticketsPurchased.flights[i].origenFlight.toUpperCase()}</p>
                            <p class="mb-0 fs-6 orderOrigenFlight">${ticketsPurchased.flights[i].origenFlight.toUpperCase().slice(0, 3)}</p>
                        </div>
                        <i class="fa-solid fa-plane timeFlight fs-3"></i>
                        <div class="d-flex flex-column">
                            <p class="mb-0 fs-4 orderLandingDetail">${ticketsPurchased.flights[i].landingTime}</p>
                            <p class="mb-0 fs-6 fw-bold paymentTitle text-end">${ticketsPurchased.flights[i].destinoFlight.toUpperCase()}</p>
                            <p class="mb-0 fs-6 orderLandingFlight text-end">${ticketsPurchased.flights[i].destinoFlight.toUpperCase().slice(0, 3)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    flightDetails.innerHTML = vueloDetalle;
    cardConatiner.append(flightDetails);
    itineraryDiv.appendChild(cardConatiner);
};

//CREATING HTML TO FLIGHT DETAILS
const cardContainerDetail = document.createElement('div');
cardContainerDetail.className = 'container w-100';
const cardDetails = document.createElement('div');
cardDetails.className = 'card p-2';
cardDetails.setAttribute('id', 'inforDetails__cardIn');
const manageTitle = document.createElement('h2');
manageTitle.className = 'display-6 paymentTitle mb-3';
manageTitle.textContent = 'Administrar viaje';

const divManager = document.createElement('div');
divManager.className = 'd-flex align-items-center px-4 py-2 adminContainer';
const administrador = `
    <i class="fa-solid fa-id-badge fs-1 paymentTitle me-4"></i>
    <div>
        <p class="mb-0">Administrador del viaje</p>
        <p class="mb-0">${ticketsPurchased.passanger[0].email}</p>
    </div>
`;

divManager.innerHTML = administrador;

col4.appendChild(cardContainerDetail);

cardDetails.appendChild(manageTitle)
cardDetails.appendChild(divManager);
cardContainerDetail.appendChild(cardDetails);

const detallePasajeroTitle = document.createElement('h2');
detallePasajeroTitle.className = 'display-6 paymentTitle mt-3';
detallePasajeroTitle.textContent = 'Detalles Pasajeros';

cardDetails.appendChild(detallePasajeroTitle);

//GET PASSANGER DETAILS
for(let i = 0; i < numPasajeros; i++) {
    let pasajerosContainer = document.createElement('div');
    pasajerosContainer.className = 'mt-3'

    const pasajeros = `
        <p class="fw-bold mb-0 timeFlight">Pasajero ${i+1}</p>

        <div class="card mt-3">
            <div class="card-body">
                <h6 class="m-0">${ticketsPurchased.passanger[i].name} ${ticketsPurchased.passanger[i].lastName}</h6>
                <p class="m-0">${ticketsPurchased.passanger[i].email}</p>
            </div>
        </di>
    `;

    pasajerosContainer.innerHTML = pasajeros;
    cardDetails.appendChild(pasajerosContainer);
};

//PAYMENT DETAILS
const detallePagoTitle = document.createElement('h2');
detallePagoTitle.className = 'display-6 paymentTitle mt-3';
detallePagoTitle.textContent = 'Detalles Pago';

cardDetails.appendChild(detallePagoTitle);

const contenedorPago = document.createElement('div');
contenedorPago.className = 'card';

const compra = `
    <div class="card-body">
        <div class="finalPriceDetails">
            <i class="fa-solid fa-cart-arrow-down"></i>
            <div class="priceDetails__container">
                <p class="priceContainer__final">Precio Final</p>
                <p class="priceContainer__total">USD ${ticketsPurchased.total}</p>
                <p class="priceContainer__taxes">Incluye Tasas e Inpuestos</p>
            </div>
        </div>
        <p class="mt-3 passangersNumber__paragraph">Pasajeros ${ticketsPurchased.passNum}</p>
        <div class="flightsPriceContainer">
            <div class="subtotalContainer">
                <p class="subtotalContainer__flights">Valor viaje</p>
                <p class="subtotalContainer__subt">USD ${ticketsPurchased.totalVuelos}</p>
            </div>
            <div class="taxesContainer">
                <p class="taxesContainer__taxDetail">Tasas e Impuestos</p>
                <p class="taxesContainer__taxMoney">USD ${ticketsPurchased.iva}</p>
            </div>
        </div>
    </div>
`;

contenedorPago.innerHTML = compra;
cardDetails.append(contenedorPago);