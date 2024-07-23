const CommonService = {
  formatDates(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  },

  formatDate(date) {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  },

  timeDifferenceInHours(timeString) {
    const [startTime, endTime] = timeString
      .split("-")
      .map((time) => time.trim());
    const startHour = parseInt(startTime, 10); // Start time is in AM
    const endHour = parseInt(endTime, 10); // End time is in PM
    const totalHours = endHour - startHour;
    return totalHours;
  },

  convertIntoKiloPrefix(count) {
    if (count && count !== 0) {
      // let countString = count.toString();
      // if (countString.length === 7) {
      //   countString = count / 100000;
      //   countString = countString.toFixed(2);
      //   return countString + " M";
      // } else if (countString.length === 6) {
      //   countString = count / 1000;
      //   countString = countString.toFixed(2);
      //   return countString + " K";
      // } else if (countString.length === 5) {
      //   countString = count / 1000;
      //   countString = countString.toFixed(1);
      //   return countString + " K";
      // } else if (countString.length === 4) {
      //   countString = count / 1000;
      //   countString = countString.toFixed(1);
      //   return countString + " K";
      // } else {
      return count;
      // }
    } else {
      return 0;
    }
  },

  timeFromater12(item) {
    let time = typeof item === "string" ? item.split(":") : item;
    return typeof item === "string"
      ? `${time[0] % 12 || 12} ${time[0] >= 12 ? "PM" : "AM"}`
      : `${time % 12 || 12} ${time >= 12 ? "PM" : "AM"}`;
  },
};

export default CommonService;
