import { getTimeSlots } from "time-slots-generator";

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
  console.log(freeTimeSlots)

  return freeTimeSlots
    .map(function(x) {
      return getTime(x);
    })





  // const blockTimes = dayAppointments.map(apt => [(new Date(apt.from).getHours() * 60) + new Date(apt.from).getMinutes(), (new Date(apt.to).getHours() * 60) + new Date(apt.to).getMinutes()])
  // blockTimes.unshift([0, ((dayFrom.getHours() * 60) + dayFrom.getMinutes())])
  // blockTimes.push([((dayTo.getHours() * 60) + dayTo.getMinutes()), 1440])


  // const timeSlotTest = getTimeSlots(blockTimes,true,"half", false, true)
  // delete timeSlotTest[1440]
  // console.log(timeSlotTest, blockTimes)




  // const freeTimeSlots = []

  // dayTo.setMinutes(dayTo.getMinutes() - serviceDuration)
  // // console.log(dayTo.getTime(), dayTo, dayTo)
  // for (let i = dayFrom; i.getTime() <= dayTo.getTime(); i.setMinutes(i.getMinutes() + 30)) {
  //   let hasAppointment = []
  //   // dayAppointments.map(appointment => console.log(new Date(appointment.from).getTime(), new Date(appointment.to).getTime(), i.getTime()))
  //   // console.log("func", dayAppointments.some(appointment => (new Date(appointment.from).getTime() <= i.getTime()) && (new Date(appointment.to).getTime() > i.getTime())))
  //   console.log("hasAppointment", hasAppointment)
  //   hasAppointment = dayAppointments.filter(appointment => {
  //     return (
  //       (new Date(appointment.from).getTime() <= i.getTime()) && 
  //       (new Date(appointment.to).getTime() > i.getTime())
  //     )
  //   })
  //   // console.log("hasAppointment", hasAppointment)
  //   console.log("hasAppointment2", hasAppointment)

  //   if (hasAppointment.length === 0 && new Date().getTime() < i) {
  //     freeTimeSlots.push(i.toJSON())
  //   } 
  // }
  // return freeTimeSlots
}

export default createTimeSlots

// hasAppointment = dayAppointments.some(appointment => 
//   (new Date(appointment.from).getTime() <= i.getTime()) && 
//   (new Date(appointment.to).getTime() > i.getTime())
// )

//conditions:
// TS < início do horário marcado && TS >= fim do horário marcado
// IC = 10h, FC = 11h

// const createTimeSlots = (dayFrom, dayTo, dayAppointments, serviceDuration) => {
//   const freeTimeSlots = []
//   dayTo.setMinutes(dayTo.getMinutes() - serviceDuration)
//   console.log(dayFrom.getTime(), dayTo.getTime(), dayAppointments, serviceDuration)
//   for (let i = dayFrom; i.getTime() <= dayTo.getTime(); i.setMinutes(i.getMinutes() + 30)) {
//     console.log(i )
//     //(dayAppointments.some(appointment => (new Date(appointment.from).getTime() <= i.getTime()) && (new Date(appointment.to).getTime() > i.getTime()))) && 
//     const mockDayApts = [{from: 1610715600000, to: 1610805600000}]
//     const mockI = 1610717400000
//     // if (new Date().getTime() < i.getTime() && (dayAppointments.some(apt => new Date(apt.from).getTime() < i.getTime() && new Date(apt.to).getTime() >= i.getTime()))) {
//     //   freeTimeSlots.push(i.toJSON())
//     // }
//     const hasAppointment
//     if (new Date().getTime() < mockI && (mockDayApts.some(apt => new Date(apt.from) < mockI && new Date(apt.to) >= mockI))) {
//       freeTimeSlots.push(mockI)
//     } 
//   }
//   return freeTimeSlots
// }

// export default createTimeSlots