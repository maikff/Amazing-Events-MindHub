const queryString = location.search;
let params = new URLSearchParams(queryString);
let id = params.get("id");

let container = document.getElementById('card-details');

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(data => {
        const event = data.events.find(event => event._id == id);
        container.insertAdjacentHTML('beforeend', `
            <div class="row g-0">
                <div class="col-sm-6 col-12">
                    <img src="${event.image}" style="width: 90%; height: 90%;"
                        class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-sm-6 col-12">
                    <div class="card-body text-center fs-5">
                    <h2>${event.name}<span class="badge fs-6 ms-2 bg-secondary">${event.date}</span></h2>
                    <p>${event.description}</p>
                    <section>
                        <i class="bi bi-cash-stack"></i>
                        <p class="d-inline fw-bold">Price:</p>
                        <p class="d-inline">${event.price}</p>
                    </section>
                    <section>
                        <i class="bi bi-geo-alt-fill"></i>
                        <p class="d-inline fw-bold">Location:</p>
                        <p class="d-inline">${event.place}</p>
                    </section>
                    <section>
                        <i class="bi d-inline bi-person-check-fill"></i>
                        <p class="d-inline fw-bold">Capacity:</p>
                        <p class="d-inline">${event.capacity}</p>
                    </section>
                    <section>
                        <i class="bi bi-person-fill"></i>
                        <p class="d-inline fw-bold">${event.estimate == null ? 'Assistance' : 'Estimate'}</p>
                        <p class="d-inline">${event.estimate != null ? event.estimate : event.assistance}</p>
                    </section>
                    </div>
                </div>
            </div>
        `);
    }
    );

