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
  $.ajax( {
    url: ajaxUrl,
    method: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      $stuff;
    }
  });
});
