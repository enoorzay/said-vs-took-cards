var deck = Deck();
var $container = document.getElementById('container');
var card = deck.cards[0];
var othercard = deck.cards[1];
deck.mount($container)
card.mount($container);
othercard.mount($container);
	
card.animateTo({
	y: window.innerHeight / 4
});
// Allow to move/drag it
card.enableDragging();
card.enableFlipping();
othercard.enableDragging();
othercard.enableFlipping();

var socket = io();
socket.on('message', function(data) {
  console.log(data);
});
