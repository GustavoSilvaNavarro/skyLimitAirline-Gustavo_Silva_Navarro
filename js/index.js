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
const inputRadio = document.querySelector('#flexRadioDefault1');
const searchFlights = document.querySelector('#searchBtn');
let routesAvailable = [];
let origenFlightsAvailable = [];
let destinoFlightsAvailable = [];

const fields = {
    origenVuelo: false,
    destinoVuelo: false,
    fechaIda: false,
    fechaVuelta: false
};

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

// class myTicket {
//     constructor(passNum, passanger, reservationNum, rutaIda, Rutavuelta, total, tarifa) {
//         this.id = uuidv4();
//         this.passNum = passNum;
//         this.passanger = passanger;
//         this.reservationNum = reservationNum;
//         this.rutaIda = rutaIda;
//         this.Rutavuelta = Rutavuelta;
//         this.total = total;
//         this.tarifa = tarifa;
//     };
// }

routesAvailable.push(new Routes('argentina', 'peru', '16/07/2022', '11:55', '14:25', fleet.boeing757200, 859.32, false));
routesAvailable.push(new Routes('argentina', 'peru', '16/07/2022', '10:55', '12:36', fleet.boeing757200, 623.96, false));
routesAvailable.push(new Routes('argentina', 'peru', '02/05/2022', '00:25', '04:36', fleet.boeing757200, 428.10, false));
routesAvailable.push(new Routes('argentina', 'peru', '16/07/2022', '01:00', '07:06', fleet.boeing757200, 652.23, false));
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
routesAvailable.push(new Routes('peru', 'argentina', '01/08/2022', '00:05', '10:26', fleet.boeing757200, 1853.21, false));
routesAvailable.push(new Routes('peru', 'argentina', '01/08/2022', '16:15', '22:58', fleet.boeing767300, 458.36, false));
routesAvailable.push(new Routes('peru', 'argentina', '01/08/2022', '09:45', '14:15', fleet.boeing767400, 956.41, false));
routesAvailable.push(new Routes('peru', 'argentina', '01/08/2022', '12:25', '17:09', fleet.boeing757200, 365, false));
routesAvailable.push(new Routes('peru', 'argentina', '01/08/2022', '14:35', '18:26', fleet.boeing767300, 999.99, false));
routesAvailable.push(new Routes('peru', 'argentina', '01/08/2022', '17:23', '20:36', fleet.boeing767400, 315.68, false));
routesAvailable.push(new Routes('peru', 'argentina', '05/08/2022', '00:05', '10:26', fleet.boeing757200, 1853.21, false));
routesAvailable.push(new Routes('peru', 'argentina', '05/08/2022', '16:15', '22:58', fleet.boeing767300, 458.36, false));
routesAvailable.push(new Routes('peru', 'argentina', '05/08/2022', '09:45', '14:15', fleet.boeing767400, 956.41, false));
routesAvailable.push(new Routes('peru', 'argentina', '05/08/2022', '12:25', '17:09', fleet.boeing757200, 365, false));
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

/*
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
*/