var ShepherdDog = function ()
{

	this.init = function ()
	{
		var self = this;

		self.setupEventHandlers();
	};

	this.setupEventHandlers = function ()
	{
		var self = this;
	};
};

var shepherdDog = new ShepherdDog();

$(document).ready(function () 
{
	shepherdDog.init();
});