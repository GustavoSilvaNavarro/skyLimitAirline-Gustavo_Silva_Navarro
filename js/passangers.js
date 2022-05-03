const passangerNumber = parseInt(sessionStorage.getItem('numeroPass'));
const category = sessionStorage.getItem('skyCategory');
const passangerInfo = document.querySelector('#passangerForm');
let allCountries = [];

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
        passTitle.className = 'display-6';
        passTitle.textContent = 'Pasajeros';
        passangerInfo.append(passTitle);

        const accordion = document.createElement('div');
        accordion.className = 'accordion';
        accordion.setAttribute('id', 'accordionExample');

        if(passangerNumber > 1) {
            for(let i = 1; i < passangerNumber+1; i++) {
                let accordionItem = document.createElement('div');
                accordionItem.className = 'accordion-item';

                let passangerFormulario = `
                    <h2 class="accordion-header" id="heading${i}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                            Pasajero ${i}
                        </button>
                    </h2>
                    <div id="collapse${i}" class="accordion-collapse collapse show" aria-labelledby="heading${i}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="inputGroupContainer">
                                <input type="text" class="groupContainer__input" placeholder="Nombre">
                                <input type="text" class="groupContainer__input" placeholder="Apellido">
                            </div>
                            <div class="inputGroupContainer">
                                <input type="date" class="groupContainer__input" placeholder="Fecha Nacimiento">
                                <select class="groupContainer__input">
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
                                <select class="groupContainer__input">
                                    <option value="passport">Pasaporte</option>
                                    <option value="dni">Cedula de identidad</option>
                                </select>
                                <input type="number" class="groupContainer__input" placeholder="Numero de documento">
                            </div>
                            <h6>Información de contacto</h6>
                            <div class="inputGroupContainer">
                                <input type="email" class="groupContainer__input" placeholder="Email">
                                <input type="text" class="groupContainer__input" placeholder="Codigo">
                                <input type="number" class="groupContainer__input" placeholder="Celular">
                            </div>
                            <div class="d-grid w-50">
                                <button class="btn btn-outline-danger btn-lg">Guardar</button>
                            </div>
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
                    option.setAttribute('data-country-name', allCountries[i].nombrePais);
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
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Pasajero
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="inputGroupContainer">
                                <input type="text" class="groupContainer__input" placeholder="Nombre">
                                <input type="text" class="groupContainer__input" placeholder="Apellido">
                            </div>
                            <div class="inputGroupContainer">
                                <input type="date" class="groupContainer__input" placeholder="Fecha Nacimiento">
                                <select class="groupContainer__input">
                                    <option value="male">Masculino</option>
                                    <option value="female">Femenino</option>
                                </select>
                            </div>
                            <div class="nationalityContainer">
                                <div class="flags">
                                    <img src="https://countryflagsapi.com/png/af" alt='Afghanistan'>
                                    <select id='selectCountries' class="groupContainer__input--flags">
                                    </select>
                                </div>
                            </div>
                            <div class="inputGroupContainer">
                                <select class="groupContainer__input">
                                    <option value="passport">Pasaporte</option>
                                    <option value="dni">Cedula de identidad</option>
                                </select>
                                <input type="number" class="groupContainer__input" placeholder="Numero de documento">
                            </div>
                            <h6>Información de contacto</h6>
                            <div class="inputGroupContainer">
                                <input type="email" class="groupContainer__input" placeholder="Email">
                                <select id='selectCodeCountries' class="groupContainer__input">
                                    <option value="codigo">Codigo</option>
                                </select>
                                <input type="number" class="groupContainer__input" placeholder="Celular">
                            </div>
                            <div class="d-grid w-50">
                                <button class="btn btn-outline-danger btn-lg">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            accordion.innerHTML = passangerFormulario;
            passangerInfo.append(accordion);

            const selectCountry = document.querySelector('#selectCountries');

            for(let i = 0; i < allCountries.length; i++) {
                let option = document.createElement('option');
                option.value = allCountries[i].isoCode;
                option.setAttribute('data-country-name', allCountries[i].nombrePais);
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

        flatpickr("input[type=date]", {
            dateFormat: "d/m/Y",
        });
    };
};

getCountries();