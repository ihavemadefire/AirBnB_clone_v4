#!/usr/bin/node
$(document).ready(function () {
  const url = "http://" + window.location.hostname + ":5001/api/v1/status/";
  $.get(url,function (response){
    if (response.status === 'OK'){
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

let states = {};
  // assemble list of state objects to be querried
  $('.locations ul h2 input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      // set value of the amens dict - amens[data-id] = data-name
      states[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete states[$(this).attr('data-id')];
    }
    // add cities and states to text of h4
    // combine the two dicts
    const cities_states = Object.assign({}, states, cities);
    //update the h4
    if (Object.values(cities_states).length === 0){
      $('.locations h4').html('&nbsp;');
      } else {
    $('.locations h4').text(Object.values(cities_states).join(', '));
	}
  });

let cities = {};
  // the chage function looks for a change in the target element
  $(".locations ul ul li input[type='checkbox']").change(function () {
    if ($(this).is(':checked')) {
      // set value of the amens dict - amens[data-id] = data-name
      cities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete states[$(this).attr('data-id')];
    }
    // add cities and states to text of h4
    // combine the two dicts
    const cities_states = Object.assign({}, states, cities);
    //update the h4
    if (Object.values(cities_states).length === 0){
      $('.locations h4').html('&nbsp;');
      } else {
    $('.locations h4').text(Object.values(cities_states).join(', '));
	}
  });

  const amens = {};
  // the chage function looks for a change in the target element
  $("input[type='checkbox']").change(function () {
    if ($(this).is(':checked')) {
      // set value of the amens dict - amens[data-id] = data-name
      amens[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amens[$(this).attr('data-id')];
    }
    // add amens to text of h4
    $('.amenities h4').text(Object.values(amens).join(', '));
  });

  ajaxUrl = 'http://' + window.location.hostname + ':5001/api/v1/places_search/';
  let htmlString = "";
  $.ajax( {
    url: ajaxUrl,
    method: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function (response) {
      for (i = 0; i < response.length; i++) {
        htmlString += "<article><div class='title_box'><h2>" + response[i].name + "</h2><div class='price_by_night'>$" + response[i].price_by_night + "</div></div><div class='information'><div class='max_guest'>" + response[i].max_guest + "</div><div class='number_rooms'>" + response[i].number_rooms + "</div><div class='number_bathrooms'>" + response[i].number_bathrooms + "</div></div><div class='description'>" + response[i].description + "</div></article>";
      }
    $('section.places').append(htmlString);
    }
  });
  // code for number 5
    $('button').click( function(){
    console.log(amens);
    $.ajax({
      url: ajaxUrl,
      type: 'POST',
      data: JSON.stringify({'amenities': Object.keys(amens)}),
      dataType: 'json',
      contentType: 'application/json',
      //too big to put here, breaking out succes into separate function
      success: repopulatePage
    });
});
});

function repopulatePage (data) {
  //clear the section
  $('.places').empty();
  // iterate across the data with map
  $('.places').append(data.map(place => {
    console.log(place);
    return `<article>
      <div class='title_box'>
          <h2>${place.name}</h2>
          <div class='price_by_night'>
             $${place.price_by_night}
          </div>
      </div>
      <div class='information'>
          <div class="max_guest">
              ${place.max_guest} Guests
          </div>
          <div class="number_rooms">
              ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
              ${place.number_bathrooms} Bathrooms
          </div>
      </div>
      <div class="description">
          ${place.description}
      </div>
      </article>`
}));
}
