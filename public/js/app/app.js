'use strict';

$(document).ready(initialize);


function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#createSeats').click(clickCreateSeats);
  $('#floor').on('dblclick', '.seat', dblClickSeat);
  db.sections = [];
}

function  clickCreateSeats() {
  var section = {};
  var selector = getValue('#seatSection');
  var quantity = getValue('#quantity', parseInt);
  var costPerSeat = getValue('#seatCost', parseInt);
  section.name = selector;
  section.costPerSeat = costPerSeat;
  db.sections.push(section);
  htmlDrawSeats(selector, quantity);
  htmlRemoveSection(selector);
}

function dblClickSeat() {
  debugger;
  var username = getValue('#username');
  var $clickedSeat = $(this);

  if(! $clickedSeat.hasClass('available'))
    return;

  $clickedSeat.removeClass('available');
  $clickedSeat.text(username);
  $clickedSeat.val(username);
  debugger;
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlDrawSeats(selector, quantity) {
  var $newSeat;
  for (var i=0; i < quantity; i++) {
    $newSeat = $('<div>');
    $newSeat.addClass('seat');
    $newSeat.addClass('available');
    $newSeat.text(i+1);
    $('#' + selector).append($newSeat);
  }
}

function htmlRemoveSection(selector)
{
  var i=1;
  while ($('option:nth-child('+i+')').val()!=selector)
    {i++;}
  $('option:nth-child('+i+')').remove();
  if ($('#seatSection option').length == 1) {
    $('#adminPanel').remove();
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
