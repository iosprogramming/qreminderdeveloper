app.service('starterservices', function() {
    var currentDate = [];
    var addCurrentDate = function(newObj) {
        currentDate.push(newObj);
  };
  return {
     addCurrentDate
  };
});
