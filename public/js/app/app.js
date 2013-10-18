'use strict';


$(document).ready(initialize);


function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#createSeats').click(clickCreateSeats);

}



function  clickCreateSeats() {
  var selector = getValue('#seatSection');
  var quantity = getValue('#quantity', parseInt);
  htmlDrawSeats(selector, quantity);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlDrawSeats(selector, quantity) {
  var $newSeat;
  console.log(quantity);
  console.log(selector);


  for (var i=0; i < quantity; i++) {
    $newSeat = $('<div>');
    $newSeat.addClass('seat');
    $('#' + selector).append($newSeat);
  }

}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //


function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
