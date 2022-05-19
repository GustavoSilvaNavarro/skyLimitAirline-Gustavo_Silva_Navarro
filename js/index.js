flatpickr("input[type=date]", {
    minDate: "today",
    dateFormat: "d/m/Y",
});

const formFlightSearch = document.querySelector('#formFlightSearch');
const origen = document.getElementById('origenVuelo');
const destino = document.getElementById('destinoVuelo');
const fechaOrigen = document.getElementById('fechaIda');
const fechaRetorno = document.getElementById('fechaRetorno');
const categoryFlight = document.querySelector('#classes');
const roundTripBtn = document.querySelector('#flexRadioDefault1');
const oneWayBtn = document.querySelector('#flexRadioDefault2');
const searchFlights = document.querySelector('#searchBtn');

//GET DATA FROM DB
const getFlights = async () => {
    let routesAvailable = [];
    let origenFlightsAvailable = [];
    let destinoFlightsAvailable = [];

    const fields = {
        origenVuelo: false,
        destinoVuelo: false,
        fechaIda: false,
        fechaVuelta: false
    };

    try {
        const infoData = await fetch('http://127.0.0.1:5500/js/db/db.json');
        const flightData = await infoData.json();
        flightData.map(flight => {
            routesAvailable.push(flight);
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

    const formValidation = e => {
        from = {lineId: 'lineError', labelId: 'labelError', availableFlights: origenFlightsAvailable, pErrorId: '#fromError', pEmpty: 'El campo From* no debe estar vacio', pMore3: 'Debe tener más de 3 letras', pPlaces: 'Escoger destino en Sudamerica', pSame: 'Origen no debe coincidir con destino', opositeField: destino, fieldValid: 'origenVuelo'};
        to = {lineId: 'lineErrorTo', labelId: 'labelErrorTo', availableFlights: destinoFlightsAvailable, pErrorId: '#toError', pEmpty: 'El campo To* no debe estar vacio', pMore3: 'Debe tener más de 3 letras', pPlaces: 'Escoger destino en Sudamerica', pSame: 'Destino no debe coincidir con origen', opositeField: origen, fieldValid: 'destinoVuelo'};
    
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

    searchFlights.onclick = e => {
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
    
        if(fechaRetorno.value == '') {
            document.getElementById('lineErrorDateReturn').classList.add('errorColor');
            document.getElementById('labelErrorDateReturn').classList.add('errorColorLabel');
            const p = document.querySelector('#dateErrorReturn');
            p.classList.add('errorMessages--active');
            p.textContent = 'Campo no puede estar vacio';
            fields.fechaVuelta = false;
        } else if(!isValidDate(fechaRetorno.value)) {
            document.getElementById('lineErrorDateReturn').classList.add('errorColor');
            document.getElementById('labelErrorDateReturn').classList.add('errorColorLabel');
            const p = document.querySelector('#dateErrorReturn');
            p.classList.add('errorMessages--active');
            p.textContent = 'Favor ingresar fecha valida';  
            fields.fechaVuelta = false;
        } else {
            document.getElementById('lineErrorDateReturn').classList.remove('errorColor');
            document.getElementById('labelErrorDateReturn').classList.remove('errorColorLabel');
            const p = document.querySelector('#dateErrorReturn');
            p.classList.remove('errorMessages--active');
            fields.fechaVuelta = true;
        };
    
        if(fields.destinoVuelo && fields.fechaIda && fields.origenVuelo && fields.fechaVuelta) {
            formFlightSearch.submit();
    
            formFlightSearch.reset();
        };
    };
};

getFlights();

const isValidDate = date => {
    const reg = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(20[0-9][0-9]|21[0-9][0-9])$/;
    return reg.test(date);
};