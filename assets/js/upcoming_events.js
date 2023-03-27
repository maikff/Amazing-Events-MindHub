fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(data => {
        displayEvents(data.events, "container_cards-upcoming");
        searchEvents(data.events,"searchInput", "searchBtn", "container_cards-upcoming");
    });
