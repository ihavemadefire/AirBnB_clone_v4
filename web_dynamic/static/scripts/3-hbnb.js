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
});
