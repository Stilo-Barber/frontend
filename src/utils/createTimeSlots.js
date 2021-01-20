function getTime(num) {
  var tempHour = String(Math.trunc(num / 60));
  var hour = tempHour + "".length === 1 ? "0" + tempHour : tempHour;
  var min = num % 60 === 0 ? "00" : num % 60;
  return hour + ":" + min;
}

const createTimeSlots = (dayFrom, dayTo, dayAppointments, serviceDuration) => {

  const blockTimes = dayAppointments.map(apt => [(new Date(apt.from).getHours() * 60) + new Date(apt.from).getMinutes(), (new Date(apt.to).getHours() * 60) + new Date(apt.to).getMinutes()])
  blockTimes.unshift([0, ((dayFrom.getHours() * 60) + dayFrom.getMinutes())])
  blockTimes.push([((dayTo.getHours() * 60) + dayTo.getMinutes()), 1440])


  var start = 0;
  var freeTimeSlots = Array(Math.round(24 * (60/30)))
    .fill(0)
    .map(function(_) {
      start = start + 30;
      return start;
    });

  if (blockTimes.length > 0) {
    freeTimeSlots = blockTimes.reduce((total, x) => {
      return total
        .filter(function(y) {
          return (y + (serviceDuration - 1)) < x[0];
        })
        .concat(
          total.filter(function(y) {
            return y >= x[1];
          })
        );
      }, freeTimeSlots);
  }

  freeTimeSlots.pop()

  return freeTimeSlots
    .map(function(x) {
      return getTime(x);
    })





}

export default createTimeSlots
