#!/usr/bin/node
$(document).ready(function () {
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
