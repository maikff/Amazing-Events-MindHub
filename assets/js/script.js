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
    <button type="button" class="btn btn-outline-secondary">
    <a href="./pages/details.html?id=${event._id}">ver más...</a>
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

    const currentDate = new Date(data.currentDate);

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
function searchEvents(inputId, btnId, containerId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    const container = document.getElementById(containerId);
    const events = data.events;

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
        if (searchText === "") {
            filteredEvents.forEach((event) => {
                container.insertAdjacentHTML("beforeend", generateEventCard(event));
            });
        } else {
            filteredEvents.forEach((event) => {
                const eventName = event.name.toLowerCase();
                if (eventName.includes(searchText)) {
                    container.insertAdjacentHTML("beforeend", generateEventCard(event));
                }
            });
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



//#########################Llamo a las funciones#######################################

displayEvents(data.events, "container_cards-home");
displayEvents(data.events, "container_cards-upcoming");
displayEvents(data.events, "container_cards-past");

searchEvents("searchInput", "searchBtn", "container_cards-home");
searchEvents("searchInput", "searchBtn", "container_cards-upcoming");
searchEvents("searchInput", "searchBtn", "container_cards-past");