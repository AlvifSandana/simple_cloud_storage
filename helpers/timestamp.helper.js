/**
 * Generate timestamps.
 * 
 * type : 
 *  - dateOnly (YYYY-MM-DD)
 *  - timeOnly (HH:MM)
 *  - dateTime (YYYY-MM-DD HH:MM:SS)
 * @param {String} type 
 */
const Timestamp = (type = '') => {
  let date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();
  switch (type) {
    // prints date in YYYY-MM-DD format
    case 'dateOnly':
      return year + "-" + month + "-" + date;
    // prints time in HH:MM format
    case 'timeOnly':
      return hours + ":" + minutes;
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    case 'dateTime':
      return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    default:
      return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  }
}

module.exports = Timestamp;
