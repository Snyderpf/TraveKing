document.addEventListener('DOMContentLoaded', () => {
    let COUNTRY_DATA = [];

    const loadJSON = (path, success, error) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    };

    loadJSON('static/countries.json', function (data) { data.map(country => COUNTRY_DATA.push(country)); }, function (xhr) { console.error(xhr); });

    const hotelForm = document.getElementById('hotel-form');

    const fromPlace = document.getElementById('from-place');
    const toPlace = document.getElementById('to-place');
    const dateStart = document.getElementById('date-start');
    const dateEnd = document.getElementById('date-end');
    const classSelect = document.getElementById('class-select');
    const adultCount = document.getElementById('adult-count');
    const childCount = document.getElementById('child-count');

    const covidData = document.getElementById('covid');
    const flightData = document.getElementById('flightt');

    const covidGIF = document.getElementById('covidGIF');
    const flightGIF = document.getElementById('flightGIF');

    const covidOptions = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        headers: {
            'x-rapidapi-key': '4e44b22f4amshd1b8bf1acabc94cp1ba7eejsn50285a9a5bda',
            'x-rapidapi-host': 'covid-193.p.rapidapi.com'
        }
    };

    const cleanedPlace = (place) => {
        let cleanToPlace = String(place.value).split(',');

        let country = cleanToPlace[cleanToPlace.length - 1];
        country = country.replace(" ", "");

        return country;
    };

    const alphaToCode = (country) => {
        for (let i = 0; i < COUNTRY_DATA.length; i++) {
            if (COUNTRY_DATA[i].name.toLowerCase() === country.toLowerCase()) {
                return COUNTRY_DATA[i].alpha2Code;
            } else if (COUNTRY_DATA[i].name.toLowerCase().includes(country.toLowerCase())) {
                return COUNTRY_DATA[i].alpha2Code;
            }
        }

        return "";
    };

    hotelForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (fromPlace.value === "" || toPlace.value === "" || dateStart.value === "" || dateEnd.value === "" || classSelect.value === "" || adultCount.value === "" || childCount.value === "") {
            alert("Please fill in all fields");
            return;
        }

        covidGIF.style.display = 'block';
        flightGIF.style.display = 'block';

        let toCountry = cleanedPlace(toPlace);
        let fromCountry = cleanedPlace(fromPlace);

        let toCountryAlpha2Code = alphaToCode(toCountry);
        let fromCountryAlpha2Code = alphaToCode(fromCountry);

        if (toCountryAlpha2Code === "" || fromCountryAlpha2Code === "") {
            alert(`Please enter a valid country name for ${toCountry} or ${fromCountry}`);
            covidGIF.style.display = 'none';
            flightGIF.style.display = 'none';
            return;
        }

        await axios.request(covidOptions).then(function (response) {
            const data = response.data.response;
            if (toCountry.toLowerCase() === "united states") {
                toCountry = "USA";
            }
            if (toCountry.toLowerCase() === "united kingdom") {
                toCountry = "UK";
            }

            let temp = data.filter((da) =>
                da.country.toLowerCase().includes(toCountry.toLowerCase())
            );

            covidGIF.style.display = 'none';

            covidData.innerHTML = `<div align="center">
                <h3 style="color: red;">${temp[0].country} - Covid Report (Today)</h3>
                <p style="color: red;">Today New Death: ${temp[0].deaths.new === null ? "No Data Found" : temp[0].deaths.new}</p>
                <p style="color: red;">Total Death: ${temp[0].deaths.total === null ? "No Data Found" : temp[0].deaths.total}</p>
            </div > `;

        }).catch(function (error) {
            covidGIF.style.display = 'none';
            covidData.innerHTML = `<div align="center">
                <h3 style="color: red;">No Covid Report Found for ${toCountry}</h3>
            </div > `;
            // console.error(error);
        });

        await axios.get('https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v2/prices/latest', {
            params: {
                destination: `${toCountryAlpha2Code}`,
                origin: `${fromCountryAlpha2Code}`,
                period_type: 'year',
                one_way: ' ',
                show_to_affiliates: 'false',
                trip_class: '0',
                currency: 'USD',
                page: '1',
                sorting: 'price',
                limit: '30'
            },
            headers: {
                'x-access-token': 'c9a82809a9e92f390565dd02b53dd74a',
                'x-rapidapi-host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com',
                'x-rapidapi-key': '4e44b22f4amshd1b8bf1acabc94cp1ba7eejsn50285a9a5bda'
            }
        }).then(function (response) {
            const data = response.data.data[0];

            flightGIF.style.display = 'none';

            flightData.innerHTML = `<div align="center">
            <p style="color: green;">Estimated Fare: $${data.value}</p>
                <p style="color: green;">Distance: ${data.distance} km</p>
                <p style="color: green;">Duration: ${(data.duration / 60).toFixed(2)} hour</p>
            </div > `;

        }).catch(function (error) {
            covidGIF.style.display = 'none';
            flightData.innerHTML = `<div align="center">                
                <h3 style="color: red;">No Flight Data Found From ${fromCountry} To ${toCountry}</h3>
            </div > `;
        });

        // console.log(fromPlace.value);
        // console.log(toPlace.value);
        // console.log(dateStart.value);
        // console.log(dateEnd.value);
        // console.log(classSelect.value);
        // console.log(adultCount.value);
        // console.log(childCount.value);
    });
});
