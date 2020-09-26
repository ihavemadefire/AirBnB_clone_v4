#!/usr/bin/node
$(document).ready(function () {
  const url = "http://" + window.location.hostname + ":5001/api/v1/status/";
  $.get(url,function (response){
    if (response.status === 'OK'){
      console.log("I'm hip to the whole scene");
      $('#api_status').toggleClass('available');
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
});
