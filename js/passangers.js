const passangerNumber = parseInt(sessionStorage.getItem('numeroPass'));
const category = sessionStorage.getItem('skyCategory');
const vuelos = JSON.parse(localStorage.getItem('rutasSeleccionadas'));
const passangerInfo = document.querySelector('#passangerForm');
const resumenViaje = document.querySelector('#resumenCompraViaje');
let allCountries = [];
let pasajeros = [];

//Passangers
class Passangers {
    constructor(name, lastName, dateOfBirth, gender, nationality, document, documentNumber, email, cellphone) {
        this.id = uuidv4();
        this.name = name;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.nationality = nationality;
        this.document = document;
        this.documentNumber = documentNumber;
        this.email = email;
        this.cellphone = cellphone;
    };
}

//Get contries
const getCountries = async () => {
    const data = await fetch('https://restcountries.com/v3.1/all');
    try {
        const countries = await data.json();
        countries.map(pais => {
            let country = {
                nombrePais: pais.name.common,
                isoCode: (pais?.tld) ? pais?.tld[0].slice(1) : 'xk',
                codigoCel: (pais?.idd?.suffixes) ? pais?.idd?.root+pais?.idd?.suffixes[0] : null
            };

            allCountries.push(country);
        });
    } catch(e) {
        console.log(e);
    };

    allCountries.sort((a, b) => a.nombrePais.localeCompare(b.nombrePais));

    if(localStorage.getItem('rutasSeleccionadas')) {
        const passTitle = document.createElement('h2');
        passTitle.className = 'display-6 mb-3';
        passTitle.textContent = 'Pasajeros';
        passangerInfo.append(passTitle);

        const accordion = document.createElement('div');
        accordion.className = 'accordion';
        accordion.setAttribute('id', 'accordionExample');

        if(passangerNumber > 1) {
            for(let i = 1; i < passangerNumber+1; i++) {
                let accordionItem = document.createElement('div');
                accordionItem.className = 'accordion-item';
                accordionItem.setAttribute('id', `accordionItem${i}`);

                let passangerFormulario = `
                    <h2 class="accordion-header" id="heading${i}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                            Pasajero ${i}
                        </button>
                    </h2>
                    <div id="collapse${i}" class="accordion-collapse collapse show" aria-labelledby="heading${i}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <form id="formularioPasajero${i}">
                                <div class="inputGroupContainer">
                                    <input type="text" class="groupContainer__input" id="namePassanger${i}" placeholder="Nombre">
                                    <input type="text" class="groupContainer__input" id="apellidoPasajero${i}" placeholder="Apellido">
                                </div>
                                <div class="inputGroupContainer">
                                    <input type="date" class="groupContainer__input" id="fechaNacimiento${i}" placeholder="Fecha Nacimiento">
                                    <select class="groupContainer__input" id="generoPass${i}">
                                        <option value="male">Masculino</option>
                                        <option value="female">Femenino</option>
                                    </select>
                                </div>
                                <div class="nationalityContainer">
                                    <div class="flags">
                                        <img src="https://countryflagsapi.com/png/af" alt='Afghanistan'>
                                        <select id='selectCountries${i}' class="groupContainer__input--flags">
                                        </select>
                                    </div>
                                </div>
                                <div class="inputGroupContainer">
                                    <select class="groupContainer__input" id="documentoPasajero${i}">
                                        <option value="passport">Pasaporte</option>
                                        <option value="dni">Cedula de identidad</option>
                                    </select>
                                    <input type="number" class="groupContainer__input" id="numeroDocumento${i}" placeholder="Numero de documento">
                                </div>
                                <h6>Información de contacto</h6>
                                <div class="inputGroupContainer">
                                    <input type="email" class="groupContainer__input" id="emailPasajero${i}" placeholder="Email">
                                    <input type="tel" id="phone${i}" class="groupContainer__input">
                                </div>
                                <div class="d-grid w-50">
                                    <button type="submit" class="btn btn-outline-danger btn-lg">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                `;

                accordionItem.innerHTML = passangerFormulario;
                accordion.append(accordionItem);
                passangerInfo.append(accordion);

                const selectCountry = document.getElementById(`selectCountries${i}`);

                for(let i = 0; i < allCountries.length; i++) {
                    let option = document.createElement('option');
                    option.value = allCountries[i].isoCode;
                    option.setAttribute('data-country', allCountries[i].nombrePais);
                    option.textContent = allCountries[i].nombrePais;
                    selectCountry.append(option);
                };

                selectCountry.addEventListener('change', e => {
                    for(let pais of allCountries) {
                        if(pais.isoCode == e.target.value) {
                            let imgTag = e.target.parentElement.querySelector('img');
                            imgTag.src = `https://countryflagsapi.com/png/${e.target.value}`;
                            imgTag.setAttribute('alt', pais.nombrePais);
                        };
                    };
                });
            };
        } else {
            let passangerFormulario = `
                <div class="accordion-item" id="accordionItem${1}">
                    <h2 class="accordion-header" id="heading${1}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${1}" aria-expanded="false" aria-controls="collapse${1}">
                            Pasajero ${1}
                        </button>
                    </h2>
                    <div id="collapse${1}" class="accordion-collapse collapse show" aria-labelledby="heading${1}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <form id="formularioPasajero${1}">
                                <div class="inputGroupContainer">
                                    <input type="text" class="groupContainer__input" id="namePassanger${1}" placeholder="Nombre">
                                    <input type="text" class="groupContainer__input" id="apellidoPasajero${1}" placeholder="Apellido">
                                </div>
                                <div class="inputGroupContainer">
                                    <input type="date" class="groupContainer__input" id="fechaNacimiento${1}" placeholder="Fecha Nacimiento">
                                    <select class="groupContainer__input" id="generoPass${1}">
                                        <option value="male">Masculino</option>
                                        <option value="female">Femenino</option>
                                    </select>
                                </div>
                                <div class="nationalityContainer">
                                    <div class="flags">
                                        <img src="https://countryflagsapi.com/png/af" alt='Afghanistan'>
                                        <select id='selectCountries${1}' class="groupContainer__input--flags">
                                        </select>
                                    </div>
                                </div>
                                <div class="inputGroupContainer">
                                    <select class="groupContainer__input" id="documentoPasajero${1}">
                                        <option value="passport">Pasaporte</option>
                                        <option value="dni">Cedula de identidad</option>
                                    </select>
                                    <input type="number" class="groupContainer__input" id="numeroDocumento${1}" placeholder="Numero de documento">
                                </div>
                                <h6>Información de contacto</h6>
                                <div class="inputGroupContainer">
                                    <input type="email" class="groupContainer__input" id="emailPasajero${1}" placeholder="Email">
                                    <input type="tel" id="phone${1}" class="groupContainer__input">
                                </div>
                                <div class="d-grid w-50">
                                    <button type="submit" class="btn btn-outline-danger btn-lg">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;

            accordion.innerHTML = passangerFormulario;
            passangerInfo.append(accordion);

            const selectCountry = document.querySelector('#selectCountries1');

            for(let i = 0; i < allCountries.length; i++) {
                let option = document.createElement('option');
                option.value = allCountries[i].isoCode;
                option.setAttribute('data-country', allCountries[i].nombrePais);
                option.textContent = allCountries[i].nombrePais;
                selectCountry.append(option);
            };

            selectCountry.addEventListener('change', e => {
                for(let pais of allCountries) {
                    if(pais.isoCode == e.target.value) {
                        let imgTag = e.target.parentElement.querySelector('img');
                        imgTag.src = `https://countryflagsapi.com/png/${e.target.value}`;
                        imgTag.setAttribute('alt', pais.nombrePais);
                    };
                };
            });
        };
    };

    flatpickr("input[type=date]", {
        dateFormat: "d/m/Y",
    });

    for(let i = 1; i < passangerNumber+1; i++) {
        let input = document.querySelector(`#phone${i}`);
        window.intlTelInput(input, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/js/utils.min.js",
            formSearch: true
        });
    };


    const vuelosHtml = `
        <div class="container" id="detailsFlight-Passangers">
            <h2 class="display-6">Resumen Viaje</h2>
            <div class="d-flex align-items-center mt-3">
                <p class="fw-bold mb-0 timeFlight">Vuelo de ida</p>
                <i class="fa-solid fa-circle mx-2 fw-bold circleIcon"></i>
                <p class="mb-0">${vuelos[0].takeoffDate}</p>
            </div>

            <div class="card mt-3">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-around">
                        <div class="d-flex flex-column">
                            <p class="mb-0 fs-4 orderTakeoffDetail">${vuelos[0].takeOffTime}</p>
                            <p class="mb-0 fs-6 orderOrigenFlight">${vuelos[0].origenFlight.toUpperCase().slice(0, 3)}</p>
                        </div>
                        <i class="fa-solid fa-plane timeFlight"></i>
                        <div class="d-flex flex-column">
                            <p class="mb-0 fs-4 orderLandingDetail">${vuelos[0].landingTime}</p>
                            <p class="mb-0 fs-6 orderLandingFlight text-end">${vuelos[0].destinoFlight.toUpperCase().slice(0, 3)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex align-items-center mt-3">
                <p class="fw-bold mb-0 timeFlight">Vuelo de retorno</p>
                <i class="fa-solid fa-circle mx-2 fw-bold circleIcon"></i>
                <p class="mb-0">${vuelos[1].takeoffDate}</p>
            </div>

            <div class="card mt-3">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-around">
                        <div class="d-flex flex-column">
                            <p class="mb-0 fs-4 orderTakeoffDetail">${vuelos[1].takeOffTime}</p>
                            <p class="mb-0 fs-6 orderOrigenFlight">${vuelos[1].origenFlight.toUpperCase().slice(0, 3)}</p>
                        </div>
                        <i class="fa-solid fa-plane timeFlight"></i>
                        <div class="d-flex flex-column">
                            <p class="mb-0 fs-4 orderLandingDetail">${vuelos[1].landingTime}</p>
                            <p class="mb-0 fs-6 orderLandingFlight text-end">${vuelos[1].destinoFlight.toUpperCase().slice(0, 3)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h2 class="display-6 mt-5 mb-3">Detalles Pasajeros</h2>
        </div>
    `;

    resumenViaje.innerHTML = vuelosHtml;

    for(let i = 1; i < passangerNumber+1; i++) {
        document.querySelector(`#formularioPasajero${i}`).addEventListener('submit', e => getPasajeros(i, e));
    };
};

getCountries();

const getPasajeros = (id, e) => {
    e.preventDefault();

    const details = document.querySelector('#detailsFlight-Passangers');
    const cardPass = document.createElement('div');

    (pasajeros.length > 0) && cardPass.classList.add('mt-3');

    //Get values
    const name = document.querySelector(`#namePassanger${id}`).value;
    const apellido = document.querySelector(`#apellidoPasajero${id}`).value;
    const nacimiento = document.querySelector(`#fechaNacimiento${id}`).value;
    const genero = document.querySelector(`#generoPass${id}`).value;
    const nacionalidad = document.querySelector(`#selectCountries${id}`).options[document.querySelector(`#selectCountries${id}`).selectedIndex].text;
    const tipoDocumento = document.querySelector(`#documentoPasajero${id}`).value;
    const numeroDocumento = document.querySelector(`#numeroDocumento${id}`).value;
    const emailPassanger = document.querySelector(`#emailPasajero${id}`).value;
    const cellPass = document.querySelector(`#phone${id}`).value;

    const passangerDetails = `
        <p class="fw-bold mb-0 timeFlight">Pasajero ${id}</p>

        <div class="card mt-3">
            <div class="card-body">
                <h6 class="m-0">${name} ${apellido}</h6>
                <p class="m-0">${emailPassanger}</p>
            </div>
        </di>
    `;

    cardPass.innerHTML = passangerDetails;
    details.appendChild(cardPass);

    pasajeros.push(new Passangers(name, apellido, nacimiento, genero, nacionalidad, tipoDocumento, numeroDocumento, emailPassanger, cellPass));
    localStorage.setItem('pasajerosVuelo', JSON.stringify(pasajeros));

    if(pasajeros.length == passangerNumber) {
        //Calculo precio
        const subTot = vuelos.reduce((acc, item) => acc.priceLeg + item.priceLeg);
        const total = subTot*1.21*passangerNumber;
        const tax = subTot*0.21*passangerNumber
        const subTotRound = Math.round((subTot + Number.EPSILON)*100)/100;
        const totalRound = Math.round((total + Number.EPSILON)*100)/100;
        const taxRound = Math.round((tax + Number.EPSILON)*100)/100;

        //title and details
        const purchaseTitle = document.createElement('h2');
        purchaseTitle.className = 'display-6 mt-5 mb-3';
        purchaseTitle.textContent = 'Detalles Compra';
        details.append(purchaseTitle);

        const cardPurchase = document.createElement('div');
        cardPurchase.className = 'card';

        const purchase = `
            <div class="card-body">
                <div class="finalPriceDetails">
                    <i class="fa-solid fa-cart-arrow-down"></i>
                    <div class="priceDetails__container">
                        <p class="priceContainer__final">Precio Final</p>
                        <p class="priceContainer__total">USD ${totalRound}</p>
                        <p class="priceContainer__taxes">Incluye Tasas e Inpuestos</p>
                    </div>
                </div>
                <p class="mt-3 passangersNumber__paragraph">Pasajeros ${passangerNumber}</p>
                <div class="flightsPriceContainer">
                    <div class="subtotalContainer">
                        <p class="subtotalContainer__flights">Valor viaje</p>
                        <p class="subtotalContainer__subt">USD ${subTotRound*passangerNumber}</p>
                    </div>
                    <div class="taxesContainer">
                        <p class="taxesContainer__taxDetail">Tasas e Impuestos</p>
                        <p class="taxesContainer__taxMoney">USD ${taxRound}</p>
                    </div>
                </div>
            </div>
        `;

        cardPurchase.innerHTML = purchase;
        details.append(cardPurchase);

        //Insert button
        const divBtn = document.createElement('div');
        divBtn.className = 'd-grid mt-3';
        const btnTicket = document.createElement('button');
        btnTicket.className = 'btn btn-primary btn-lg text-center';
        btnTicket.textContent = 'Buy Ticket';
        divBtn.append(btnTicket);
        details.appendChild(divBtn);

        document.querySelector('#accordionExample').remove();
    } else {
        document.querySelector(`#accordionItem${id}`).remove();
    };
};