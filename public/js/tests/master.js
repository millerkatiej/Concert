'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('<Click Create Seats>', function(){
  expect(8);

  $('#seatSection').val('vip');
  $('#quantity').val('200');
  $('#seatCost').val('100');
  $('#createSeats').trigger('click');

  deepEqual($('#vip .seat').length, 200, 'There should be 200 VIP seats');
  deepEqual(db.sections[0].costPerSeat, 100,'db.costPerSeat object should reflect $100 in textbox');
  deepEqual($('#seatSection>option').length, 2,'selection box should have only 2 options');
  deepEqual($('#vip .available').length, 200,'should be 200 available');

  $('#seatSection').val('ga');
  $('#quantity').val('950');
  $('#seatCost').val('60');
  $('#createSeats').trigger('click');

  deepEqual($('#ga .seat').length, 950, 'There should be 950 GA seats');
  deepEqual(db.sections[1].costPerSeat, 60,'db.costPerSeat object should reflect $60 in textbox');
  deepEqual($('#seatSection>option').length, 0,'selection box should have 0 options');
  deepEqual($('#ga .available').length, 950, 'there should be 950 available');

});

test('<Double click to Reserve', function(){
  expect(3)
  $('#seatSection').val('vip');
  $('#quantity').val('200');
  $('#seatCost').val('100');
  $('#username').val('Sally');
  $('#createSeats').trigger('click');
  $('#vip > .seat:first-child').trigger('dblclick');

  deepEqual($('#vip > .seat:first-child').hasClass('available'), false, 'Seat should not be available');
  deepEqual($('#vip > .seat:first-child').text(), '1: Sally', 'Username is Sally and in first seat');

  $('username').val('John')
  $('#vip > .seat:first-child').trigger('dblclick');

  deepEqual($('#vip > .seat:first-child').text(), '1: Sally', 'Username should remain Sally on second dblClick');
});

test('<Click Create Seats - statistics>', function(){
  expect(8);

  $('#seatSection').val('vip');
  $('#quantity').val('200');
  $('#seatCost').val('100');
  $('#createSeats').trigger('click');

  deepEqual($('#vip .seat').length, 200, 'There should be 200 VIP seats');
  deepEqual(db.sections[0].costPerSeat, 100,'db.costPerSeat object should reflect $100 in textbox');
  deepEqual($('#seatSection>option').length, 2,'selection box should have only 2 options');
  deepEqual($('#vip .available').length, 200,'should be 200 available');

  $('#seatSection').val('ga');
  $('#quantity').val('950');
  $('#seatCost').val('60');
  $('#createSeats').trigger('click');

  deepEqual($('#ga .seat').length, 950, 'There should be 950 GA seats');
  deepEqual(db.sections[1].costPerSeat, 60,'db.costPerSeat object should reflect $60 in textbox');
  deepEqual($('#seatSection>option').length, 0,'selection box should have 0 options');
  deepEqual($('#ga .available').length, 950, 'there should be 950 available');

});

test('<Click Create Seats - Numbering Seats', function() {
  expect(1);

  $('#seatSection').val('vip');
  $('#quantity').val('200');
  $('#seatCost').val('100');
  $('#createSeats').trigger('click');

  deepEqual($('#vip .seat:nth-child(2)').text(), '2', 'should be numbered as the second seat');

});

test('<Building guest list', function(){
  expect(1);
  $('#seatSection').val('vip');
  $('#quantity').val('200');
  $('#seatCost').val('100');
  $('#username').val('Sally');
  $('#createSeats').trigger('click');
  $('#vip > .seat:first-child').trigger('dblclick');

  deepEqual($('#guestList li:first-child').text(), "vip-1: Sally", "Sally should be listed as Seat#1 guest")

});

test('<Building reporting lists', function() {
  expect(8);
  $('#seatSection').val('vip');
  $('#quantity').val('200');
  $('#seatCost').val('100');
  $('#username').val('Sally');
  $('#createSeats').trigger('click');
  $('#seatSection').val('ga');
  $('#quantity').val('950');
  $('#seatCost').val('60');
  $('#createSeats').trigger('click');
  $('#vip > .seat:first-child').trigger('dblclick');
  $('#vip > .seat:nth-child(2)').trigger('dblclick');


  deepEqual($('#vipRev').text(), 'Total VIP: $200', 'VIP revenue should be $200');
  deepEqual($('#totalRev').text(), 'Grand Total: $200', 'Grand total should be $200');
  deepEqual($('#vipCount').text(), 'Total VIP: #2', 'VIP total guests is 2');
  deepEqual($('#totalCount').text(), 'Grand Total: #2', 'Total guests is 2');

  $('#ga > .seat:first-child').trigger('dblclick');
  $('#ga > .seat:nth-child(2)').trigger('dblclick');

  deepEqual($('#gaRev').text(), 'Total GA: $120', 'GA revenue should be $120');
  deepEqual($('#totalRev').text(), 'Grand Total: $320', 'Grand total should be $320');
  deepEqual($('#gaCount').text(), 'Total GA: #2', 'GA total guests is 2');
  deepEqual($('#totalCount').text(), 'Grand Total: #4', 'Total guests is 4');
});


// test('testing click for statistics', function(){
//   expect(3)
//   $('#seatSection').val('vip');
//   $('#quantity').val('200');
//   $('#seatCost').val('100');
//   $('#username').val('Sally');
//   $('#createSeats').trigger('click');
//   $('#vip > .seat:first-child').trigger('dblclick');

//   deepEqual($('#vip > .seat:first-child').hasClass('available'), false, 'Seat should not be available');
//   deepEqual($('#vip > .seat:first-child').val(), 'Sally', 'Username is Sally and in first seat');

//   $('username').val('John')
//   $('#vip > .seat:first-child').trigger('dblclick');

//   deepEqual($('#vip > .seat:first-child').val(), 'Sally', 'Username should remain Sally on second dblClick');
// });
