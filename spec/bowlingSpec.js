'use strict';

describe('Bowling', () => {
  let bowling;

  beforeEach(() => {
    bowling = new Bowling();
  }) 

  it('starts on round 1', () => {
    expect(bowling.getCurrentRound()).toEqual(1);
  })

  it('starts on ball 1', () => {
    expect(bowling.getCurrentBall()).toEqual(1);
  })

  it('increases the round after two balls, no strike', () => {
    bowling.inputPins(1);
    bowling.inputPins(1);
    expect(bowling.getCurrentRound()).toEqual(2);
  })

  it('increases the ball after each throw', () => {
    bowling.inputPins(1);
    expect(bowling.getCurrentBall()).toEqual(2);
  })

  it('adds the pins to the scoreboard', () => {
    bowling.inputPins(5);
    expect(bowling.showScorecard()).toContain([5, '-', '-']);
  })

  it('adds a round to the scoreboard', () => {
    bowling.inputPins(1);
    bowling.inputPins(1);
    expect(bowling.showScorecard()).toContain([1, 1, 2]);
  })

  it('creates a new array for each round', () => {
    for (let i = 0; i < 4; i++) {
      bowling.inputPins(1);
    }
    expect(bowling.showScorecard()).toContain([1, 1, 2], [1, 1, 2]);
  })

  it('doesnt allow round to exceed 10 pins', () => {
    bowling.inputPins(5);
    expect(function(){ bowling.inputPins(6); }).toThrowError('Invalid input. Please check your pins.');
  })

  it('allows the tenth round to exceed 10 pins', () => {
    for (let i = 0; i < 18; i++) {
      bowling.inputPins(1);
    }
    bowling.inputPins(10);
    expect(function(){ bowling.inputPins(5); }).not.toThrowError('Invalid input. Please check your pins.');
  })

  it('doesnt allow input to exceed 10 pins', () => {
    expect(function(){ bowling.inputPins(11); }).toThrowError('Invalid input. Please check your pins.');
  })

  it('allows three pins in the 10th round if one is a strike', () => {
    for (let i = 0; i < 18; i++) {
      bowling.inputPins(1);
    }
    bowling.inputPins(10);
    bowling.inputPins(1);
    expect(bowling.getCurrentBall()).toEqual(3);
  })

  it('only allows 2 balls in the tenth round if no spare or strike', () => {
    for (let i = 0; i < 20; i++) {
      bowling.inputPins(1);
    }
    expect(function(){ bowling.inputPins(1); }).toThrowError('You have no more throws!');
  })

  it('allows 3 balls in the tenth round if the first two are a spare', () => {
    for (let i = 0; i < 19; i++) {
      bowling.inputPins(1);
    }
    bowling.inputPins(9);
    expect(function(){ bowling.inputPins(1); }).not.toThrowError('You have no more throws!');
  })

  it('doesnt allow more than 3 balls in the tenth round', () => {
    for (let i = 0; i < 19; i++) {
      bowling.inputPins(1);
    }
    bowling.inputPins(9);
    bowling.inputPins(1);
    expect(function(){ bowling.inputPins(1); }).toThrowError('You have no more throws!');
  })

  it('sends pins to the scoreboard immediately if no strike or spare', () => {
    bowling.inputPins(4);
    bowling.inputPins(4);
    expect(bowling.showScorecard()).toContain([4, 4, 8])
  })

  it('sends a full game with no strikes or spares to the scoreboard', () => {
    for (let i = 0; i < 20; i++) {
      bowling.inputPins(4);
    }
    expect(bowling.showScorecard()).toEqual([[4, 4, 8], [4, 4, 16], [4, 4, 24], [4, 4, 32], [4, 4, 40], [4, 4, 48], [4, 4, 56], [4, 4, 64], [4, 4, 72], [4, 4, '-', 80]])
  })
})