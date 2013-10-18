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
  expect(2)
  $('#seatSection').val('vip');
  $('#quantity').val('200');
  $('#seatCost').val('100');
  $('#username').val('Sally');
  $('#createSeats').trigger('click');
  $('#vip > .seat:first-child').trigger('dblclick');

  deepEqual($('#vip > .seat:first-child').hasClass('available'), false, 'Seat should not be available');
  deepEqual($('#vip > .seat:first-child').val(), 'Sally', 'Username is Sally and in first seat');
});

