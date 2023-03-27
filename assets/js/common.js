//##############Genero el cuerpo de la card##################
function generateEventCard(event) {
    return `
    <div class="col ${event.category}">
        <div class="card mx-4 m-sm-0">
        <img class="card-img-top" src="${event.image}" alt="${event.name}">
            <div class="card-body">
                <h2>${event.name}</h2>
                <p>${event.description}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <p class="my-0">$${event.price}</p>
                <button type="button" class="btn btn-outline-secondary" aria-label="Ver más detalles" 
                onclick="window.location.href='${getDetailsLink()}?id=${event._id}'"style="color: white;">
                    Ver más...
                </button>
            </div>
        </div>
    </div>
    `;
}

//##################Dibujo las cards#################
function displayEvents(events, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    const currentDate = new Date("2023-03-10");

    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="category"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const categories = Array.from(checkboxes)
                .filter(c => c.checked)
                .map(c => c.value);
            filterEvents(events, containerId, categories, currentDate);
        });
    });

    events.forEach((event) => {
        const eventDate = new Date(event.date);
        if (containerId === "container_cards-home" ||
            (containerId === "container_cards-upcoming" && eventDate > currentDate) ||
            (containerId === "container_cards-past" && eventDate < currentDate)) {
            container.insertAdjacentHTML("beforeend", generateEventCard(event));
        }
    });
}
//############################Filtrar por categorias###################################
function filterEvents(events, containerId, categories, currentDate) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }
    container.innerHTML = "";
    events.forEach((event) => {
        const eventDate = new Date(event.date);
        if ((containerId === "container_cards-home" ||
            (containerId === "container_cards-upcoming" && eventDate > currentDate) ||
            (containerId === "container_cards-past" && eventDate < currentDate)) &&
            (categories.length === 0 || categories.includes(event.category))) {
            container.insertAdjacentHTML("beforeend", generateEventCard(event));
        }
    });
}


//###############Buscador por nombre de evento#################
function searchEvents(events, inputId, btnId, containerId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    const container = document.getElementById(containerId);

    function search() {
        const searchText = input.value.toLowerCase().trim();
        container.innerHTML = "";
        let filteredEvents = events;
        const checkboxes = document.querySelectorAll('input[type="checkbox"][name="category"]');
        const categories = Array.from(checkboxes)
            .filter(c => c.checked)
            .map(c => c.value);
        if (categories.length > 0) {
            filteredEvents = filteredEvents.filter(event => categories.includes(event.category));
        }

        if (containerId === "container_cards-home") {
            // Buscar en todos los eventos
            if (searchText === "") {
                filteredEvents.forEach((event) => {
                    container.insertAdjacentHTML("beforeend", generateEventCard(event));
                });
            } else {
                let foundEvents = false;
                filteredEvents.forEach((event) => {
                    const eventName = event.name.toLowerCase();
                    if (eventName.includes(searchText)) {
                        container.insertAdjacentHTML("beforeend", generateEventCard(event));
                        foundEvents = true;
                    }
                });
                if (!foundEvents) {
                    container.insertAdjacentHTML("beforeend", `
                        <div>
                            <h2>Evento no encontrado</h2>
                        </div>
                    `);
                }
            }
        } else if (containerId === "container_cards-upcoming") {
            // Buscar solo en eventos futuros
            const currentDate = new Date("2023-03-10");
            const upcomingEvents = filteredEvents.filter(event => new Date(event.date) > currentDate);
            if (searchText === "") {
                upcomingEvents.forEach((event) => {
                    container.insertAdjacentHTML("beforeend", generateEventCard(event));
                });
            } else {
                let foundEvents = false;
                upcomingEvents.forEach((event) => {
                    const eventName = event.name.toLowerCase();
                    if (eventName.includes(searchText)) {
                        container.insertAdjacentHTML("beforeend", generateEventCard(event));
                        foundEvents = true;
                    }
                });
                if (!foundEvents) {
                    container.insertAdjacentHTML("beforeend", `
                        <div>
                            <h2>Evento no encontrado</h2>
                        </div>
                    `);
                }
            }
        } else if (containerId === "container_cards-past") {
            // Buscar solo en eventos pasados
            const currentDate = new Date("2023-03-10");
            const pastEvents = filteredEvents.filter(event => new Date(event.date) < currentDate);
            if (searchText === "") {
                pastEvents.forEach((event) => {
                    container.insertAdjacentHTML("beforeend", generateEventCard(event));
                });
            } else {
                let foundEvents = false;
                pastEvents.forEach((event) => {
                    const eventName = event.name.toLowerCase();
                    if (eventName.includes(searchText)) {
                        container.insertAdjacentHTML("beforeend", generateEventCard(event));
                        foundEvents = true;
                    }
                });
                if (!foundEvents) {
                    container.insertAdjacentHTML("beforeend", `
                        <div>
                            <h2>Evento no encontrado</h2>
                        </div>
                    `);
                }
            }
        }
    }

    btn.addEventListener("click", search);

    input.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            search();
        }
    });

    input.addEventListener("input", search);
}

function getDetailsLink() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('pages/')) {
        return "./details.html";
    }
    return "./pages/details.html";
}
