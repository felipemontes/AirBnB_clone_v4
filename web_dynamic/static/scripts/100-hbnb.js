document.addEventListener('DOMContentLoaded', function () {
  const ameIds = [];
  const ameNames = [];
  $('.amenities input[type="checkbox"]').click(function () {
    const findId = ($(this).attr('data-id'));
    const findName = ($(this).attr('data-name'));
    if ($(this).prop('checked') === true) {
      ameIds.push(findId);
      ameNames.push(findName);
    } else {
      for (let i = 0; i < ameIds.length; i++) {
        if (ameIds[i] === findId) {
          ameIds.splice(i, 1);
          ameNames.splice(i, 1);
        }
      }
    }
    $('DIV.amenities H4').text(ameNames);
  });

  const cityIds = [];
  const cityNames = [];
  $('.locations input.cities[type="checkbox"]').click(function () {
    const findCityId = ($(this).attr('data-id'));
    const findCityName = ($(this).attr('data-name'));
    if ($(this).prop('checked') === true) {
      cityIds.push(findCityId);
      cityNames.push(findCityName);
    } else {
      for (let i = 0; i < cityIds.length; i++) {
        if (cityIds[i] === findCityId) {
          cityIds.splice(i, 1);
          cityNames.splice(i, 1);
        }
      }
    }
    $('DIV.locations H4').text(cityNames);
  });

  const stateIds = [];
  const stateNames = [];
  $('.locations input.states[type="checkbox"]').click(function () {
    const findStateId = ($(this).attr('data-id'));
    const findStateName = ($(this).attr('data-name'));
    if ($(this).prop('checked') === true) {
      stateIds.push(findStateId);
      stateNames.push(findStateName);
    } else {
      for (let i = 0; i < stateIds.length; i++) {
        if (stateIds[i] === findStateId) {
          stateIds.splice(i, 1);
          stateNames.splice(i, 1);
        }
      }
    }
    $('DIV.locations H4').text(stateNames);
  });

  $.ajax({
    type: 'GET',
    url: 'http://localhost:5001/api/v1/status/',
    complete: function (e) {
      if (e.status === 200) {
        console.log('Entro en 200');
        $('DIV#api_status').addClass('available');
      } else {
        console.log('Error no entro');
        $('DIV#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      let numberBaths; let numberGuests; let numberRooms = '';
      for (const place of data) {
        numberBaths = (`${place.number_bathrooms}` > 1 ? 'Bathrooms' : 'Bathroom');
        numberGuests = (`${place.max_guest}` > 1 ? 'Guests' : 'Guest');
        numberRooms = (`${place.number_rooms}` > 1 ? 'Rooms' : 'Room');
        const cont = `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} ${numberGuests}</div>
            <div class="number_rooms">${place.number_rooms} ${numberRooms}</div>
            <div class="number_bathrooms">${place.number_bathrooms} ${numberBaths}</div>
          </div>
          <div class="description">
            ${place.description};
          </div>
        </article>`;
        $('SECTION.places').append(cont);
      }
    }
  });

  $('BUTTON').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify({ cities: cityIds, states: stateIds, amenities: ameIds }),
      contentType: 'application/json',
      success: function (data) {
        $('SECTION.places').empty();
        console.log(data);
        let numberBaths; let numberGuests; let numberRooms = '';
        for (const place of data) {
          numberBaths = (`${place.number_bathrooms}` > 1 ? 'Bathrooms' : 'Bathroom');
          numberGuests = (`${place.max_guest}` > 1 ? 'Guests' : 'Guest');
          numberRooms = (`${place.number_rooms}` > 1 ? 'Rooms' : 'Room');
          const cont = `<article>
            <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
            <div class="max_guest">${place.max_guest} ${numberGuests}</div>
            <div class="number_rooms">${place.number_rooms} ${numberRooms}</div>
            <div class="number_bathrooms">${place.number_bathrooms} ${numberBaths}</div>
            </div>
            <div class="description">
            ${place.description};
          </div>
            </article>`;
          $('SECTION.places').append(cont);
        }
      }
    });
  });
});
