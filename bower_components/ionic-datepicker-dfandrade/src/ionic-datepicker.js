//By Rajeshwar Patlolla
//https://github.com/rajeshwarpatlolla

angular.module('ionic-datepicker', ['ionic', 'ionic-datepicker.templates'])

.directive('ionicDatepicker', ['$ionicPopup', '$filter', function($ionicPopup, $filter) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            date: '=',
            minDate: '=',
            maxDate: '=',
            popupTitle: '@',
            btnSetText: '@',
            btnSetType: '@',
            btnCloseText: '@',
            btnCloseType: '@',
            btnTodayShow: '@',
            btnTodayText: '@',
            btnTodayType: '@'
        },
        link: function(scope, element, attrs) {

            element.on("click", function() {

                scope.datePicker = {
                    date: new Date(scope.date.getTime()),
                    minDate: null,
                    maxDate: null,
                    popupTitle: angular.isDefined(scope.popupTitle) ? scope.popupTitle : 'Select date',
                    btnCloseText: angular.isDefined(scope.btnCloseText) ? scope.btnCloseText : 'Close',
                    btnSetText: angular.isDefined(scope.btnSetText) ? scope.btnSetText : 'Set',
                    btnTodayText: angular.isDefined(scope.btnTodayText) ? scope.btnTodayText : 'Today',
                    btnCloseType: angular.isDefined(scope.btnCloseType) ? scope.btnCloseType : 'button-default',
                    btnSetType: angular.isDefined(scope.btnSetType) ? scope.btnSetType : 'button-positive',
                    btnTodayType: angular.isDefined(scope.btnTodayType) ? scope.btnTodayType : 'button-default',
                    btnTodayShow: angular.isDefined(scope.btnTodayShow) ? scope.btnTodayShow === "true" : true
                }

                function normalizeTime(dt) {
                    dt.setHours(0);
                    dt.setMinutes(0);
                    dt.setSeconds(0);
                    dt.setMilliseconds(0);
                }

                scope.datePicker.today = new Date();

                normalizeTime(scope.datePicker.date);
                normalizeTime(scope.datePicker.today);

                if (angular.isDefined(scope.minDate)) {
                    scope.datePicker.minDate = new Date(scope.minDate.getTime());
                    normalizeTime(scope.datePicker.minDate);
                }

                if (angular.isDefined(scope.maxDate)) {
                    scope.datePicker.maxDate = new Date(scope.maxDate.getTime());
                    normalizeTime(scope.datePicker.maxDate);
                }

                scope.datePicker.dateSelected = new Date(scope.datePicker.date.getTime());

                scope.datePicker.weekNames = [];

                var weekNamesGen = new Date('October 12, 2019 22:45:00');
                for (var weekDay = 0; weekDay < 7; weekDay++) {
                    weekNamesGen.setDate(weekNamesGen.getDate() + 1);
                    var weekDayName = $filter('date')(weekNamesGen, 'EEE');
                    scope.datePicker.weekNames.push(weekDayName);
                }

                scope.updateWeeks = function() {

                    scope.datePicker.weeks = [];
                    var datePickerMonth = new Date(scope.datePicker.date.getTime());

                    datePickerMonth.setDate(1);

                    var firstDayMonthWeekName = $filter('date')(datePickerMonth, 'EEE');
                    var days = [];
                    var daysFillingComplete = false;
                    for (var i = 0; i < scope.datePicker.weekNames.length && !daysFillingComplete; i++) {
                        if (scope.datePicker.weekNames[i] == firstDayMonthWeekName) {
                            daysFillingComplete = true;
                        } else {
                            days.push(null);
                        }
                    }

                    var currentDatePickerMonth = datePickerMonth.getMonth();
                    while (currentDatePickerMonth == datePickerMonth.getMonth()) {
                        if (days.length == scope.datePicker.weekNames.length) {
                            scope.datePicker.weeks.push(days.slice());
                            days = [];
                        }

                        days.push(new Date(datePickerMonth.getTime()));
                        datePickerMonth.setDate(datePickerMonth.getDate() + 1);
                    }

                    if (days.length > 0) {
                        for (var i = days.length; i < scope.datePicker.weekNames.length; i++) {
                            days.push(null);
                        }
                        scope.datePicker.weeks.push(days);
                    }
                }

                scope.updateWeeks();

                scope.isToday = function(day) {
                    return day != null && day.getTime() == scope.datePicker.today.getTime();
                }

                scope.isSelected = function(day) {
                    return day != null && day.getTime() == scope.datePicker.dateSelected.getTime();
                }

                scope.prevMonthAllowed = function() {
                    var prevMonthAllowed = true;
                    if (scope.datePicker.minDate != null && scope.datePicker.date.getMonth() <= scope.datePicker.minDate.getMonth()) {
                        prevMonthAllowed = false;
                    }
                    return prevMonthAllowed;
                }

                scope.nextMonthAllowed = function() {
                    var nextMonthAllowed = true;
                    if (scope.datePicker.maxDate != null && scope.datePicker.date.getMonth() >= scope.datePicker.maxDate.getMonth()) {
                        nextMonthAllowed = false;
                    }
                    return nextMonthAllowed;
                }

                scope.dayAllowed = function(day) {
                    var dayAllowed = true;

                    if (day != null) {
                        if (scope.datePicker.minDate != null && day.getTime() < scope.datePicker.minDate.getTime()) {
                            dayAllowed = false;
                        } else if (scope.datePicker.maxDate != null && day.getTime() > scope.datePicker.maxDate.getTime()) {
                            dayAllowed = false;
                        }
                    }

                    return dayAllowed;
                }

                scope.prevMonth = function() {
                    scope.datePicker.date.setMonth(scope.datePicker.date.getMonth() - 1);
                    scope.updateWeeks();
                }

                scope.nextMonth = function() {
                    scope.datePicker.date.setMonth(scope.datePicker.date.getMonth() + 1);
                    scope.updateWeeks();
                }

                scope.selectDate = function(day) {
                    if (day != null && scope.dayAllowed(day)) {
                        scope.datePicker.dateSelected = day;

                        var updateWeeks = scope.datePicker.date.getMonth() != day.getMonth();

                        if (updateWeeks) {
                            scope.datePicker.date = new Date(day.getTime());
                            scope.updateWeeks();
                        }
                    }
                }

                var popupButtons = [];

                popupButtons.push({
                    text: scope.datePicker.btnCloseText,
                    type: scope.datePicker.btnCloseType
                });

                if (scope.datePicker.btnTodayShow) {
                    popupButtons.push({
                        text: scope.datePicker.btnTodayText,
                        type: scope.datePicker.btnTodayType,

                        onTap: function(e) {

                            e.preventDefault();

                            scope.datePicker.today = new Date();

                            normalizeTime(scope.datePicker.today);

                            scope.selectDate(new Date(scope.datePicker.today.getTime()));
                        }
                    });
                }

                popupButtons.push({
                    text: scope.datePicker.btnSetText,
                    type: scope.datePicker.btnSetType,
                    onTap: function(e) {
                        scope.date = scope.datePicker.dateSelected;
                    }
                });

                $ionicPopup.show({
                    templateUrl: 'date-picker-modal.html',
                    title: '<strong>' + scope.datePicker.popupTitle + '</strong>',
                    subTitle: '',
                    scope: scope,
                    buttons: popupButtons
                })
            });
        }
    }
}]);
