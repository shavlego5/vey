addEventListener("DOMContentLoaded", function () {
  pickmeup(".single", {
    flat: true,
  });
  pickmeup(".multiple", {
    flat: true,
    mode: "multiple",
  });
  pickmeup(".range", {
    flat: true,
    mode: "range",
    separator: "5",
  });
  let plus_5_days = new Date();
  plus_5_days.setDate(plus_5_days.getDate() + 5);
  pickmeup(".three-calendars", {
    flat: true,
    // date: [new Date(), plus_5_days],
    mode: "range",
    calendars: 2,
    default_date: false,
  });
});
