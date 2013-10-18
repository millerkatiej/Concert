'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('<Click Create Seats>', function(){
  expect(1);

  $('#seatSection').val('vip');
  $('#quantity').val('200');
  $('#seatCost').val('100');
  $('#createSeats').trigger('click');

  deepEqual($('#vip .seat').length, 200, 'There should be 200 VIP seats');

});

