angular.module('calendarDemo', []);

var Calendar = function () {
	var self = this;
  self.selectedDay = new Date();
  self.today = new Date();
	self.currentMonth =  new Date();
  self.weekdays = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
  self.dateRows = [];
  self.claimCounts = {
  	'2015-09-15': 12,
  	'2015-09-12': 1,
  	'2015-09-27': 3,
  	'2015-10-01': 2,
  	'2015-10-10': 200  	
  }

  self.getClaimCount = function(date) {
  	var key = moment(date).format('YYYY-MM-DD');
  	return self.claimCounts[key] || 0;
  }

  self.firstOfCurrentMonth = function() {
  	return new Date(self.currentMonth.getFullYear(), self.currentMonth.getMonth(), 1); 
  }

  self.lastOfCurrentMonth = function() {
  	return new Date(self.currentMonth.getFullYear(), self.currentMonth.getMonth() + 1, 0); 
  }

  self.decrementCurrentMonth = function() {
  	var current_month_moment = moment(self.currentMonth);
  	self.setCurrentMonth(current_month_moment.subtract(1, 'months').toDate());
  }

  self.incrementCurrentMonth = function() {
  	var current_month_moment = moment(self.currentMonth);
  	self.setCurrentMonth(current_month_moment.add(1, 'months').toDate());
  }

  self.isToday = function(date) {
  	return date.getFullYear() === self.today.getFullYear()
  		&& date.getMonth() === self.today.getMonth()
  		&& date.getDate() === self.today.getDate();
  }

  self.isSelectedDay = function(date) {
  	return date.getFullYear() === self.selectedDay.getFullYear()
  		&& date.getMonth() === self.selectedDay.getMonth()
  		&& date.getDate() === self.selectedDay.getDate();  	
  }

  self.setCurrentMonth = function(date) {
  	self.currentMonth = date;

  	self.dateRows = [];
  	var row_dates = [];
  	var first_of_month_weekday = self.firstOfCurrentMonth().getDay();
  	var current_moment = moment(self.firstOfCurrentMonth());
  	
  	current_moment.subtract(first_of_month_weekday + 1, 'days');
  	var last_day = self.lastOfCurrentMonth();

  	do {
  		row_dates = [];
  		for (var i = 0; i < 7; i++) {
  			row_dates.push(current_moment.add(1, 'days').clone().toDate());
  		}
  		self.dateRows.push(row_dates);
  	} while (current_moment.isBefore(last_day));
  }

  self.setSelectedDay = function(date) {
  	self.selectedDay = date;
  }

  self.setCurrentMonth(self.today);
}
angular.module('calendarDemo').controller('calendarDemoCtrl', [Calendar]);

