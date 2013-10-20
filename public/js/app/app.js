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
  var username = getValue('#username');
  var $clickedSeat = $(this);

  if(! $clickedSeat.hasClass('available'))
    return;

  $clickedSeat.removeClass('available');
  var seatNum = $clickedSeat.text();
  $clickedSeat.text(seatNum + ': ' +username);
  htmlBuildGuestList(username, $clickedSeat);
  htmlBuildReport();
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

function htmlBuildGuestList(username, $clickedSeat)
{
  var $newLi = $('<li>');
  $('#guestList>ul').append($newLi);
  $newLi.text($clickedSeat.parent().attr('id')+'-' + $clickedSeat.text() );
}

function htmlBuildReport() {
  var totalVIPSeats = $('#vip div').length;
  var totalAvailableVIPSeats = $('#vip .available').length;
  var totalVIP = (totalVIPSeats - totalAvailableVIPSeats);
  var vipRev = totalVIP*getCost('vip');


  var totalGASeats = $('#ga div').length;
  var totalAvailableGASeats = $('#ga .available').length;
  var totalGA = (totalGASeats - totalAvailableGASeats);
  var gaRev = totalGA*getCost('ga');

  var grandTotalRev = vipRev + gaRev;
  var grandTotalCount = totalVIP + totalGA;

  $('#vipRev').text("Total VIP: $" + vipRev);
  $('#gaRev').text('Total GA: $' + gaRev);
  $('#totalRev').text('Grand Total: $' + grandTotalRev);
  $('#vipCount').text('Total VIP: #' + totalVIP);
  $('#gaCount').text('Total GA: #' + totalGA);
  $('#totalCount').text('Grand Total: #' + grandTotalCount);

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

function getCost(sectionName){
  // debugger;
  var i = 0;

  while(i<db.sections.length)
  {
    if(db.sections[i].name == sectionName)
    {
      return db.sections[i].costPerSeat;
    }
    i++;
  }

  // while(i<db.sections.length && db.sections[i].name !==sectionName)
  //   i++;

  // return db.sections[i].costPerSeat;

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
