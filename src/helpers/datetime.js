//TODO : fix utc time
//first three functions are incorrectly implemented


export function getDateFromUTC(utc) {
  try {
    var x = new Date(utc);
    var date = x.getUTCFullYear() + '-' + (x.getUTCMonth() + 1).toString().padStart(2,"0") + '-' + x.getUTCDate().toString().padStart(2,"0");
    return date;
  } catch (error) {
    console.log(error);
  }
}

export function getTimeFromUTC(utc) {
  try {
    var x = new Date(utc);
    var time = x.getUTCHours().toString().padStart(2,"0") + ':' + x.getUTCMinutes().toString().padStart(2,"0");
    return time;
  } catch (error) {
    console.log(error);
  }
}

export function getUTCFromDateTime(date, time) {
  try {
    var x = new Date();
    time = time.split(':');
    date = date.split('-');
    
    x.setUTCHours(time[0], time[1], 0, 0);
    x.setUTCFullYear(date[0], parseInt(date[1]) - 1, date[2])

    return x;
  } catch (error) {
    console.log(error);
  }
}

//to format date and time display
export function toNiceDateString(date){
  var strDate = date.toLocaleDateString( 'en-IN', {
    timeZone: 'UTC',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  return strDate
}

export function toNiceTimeString(date){
  var strTime = date.toLocaleTimeString( 'en-IN', {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: '2-digit'
  })
  return strTime
}

export function getInterval(date){
  var now = Date.now()
  var diff = date.getTime() - now
  
  if(diff > 0){
    if(diff > 86400000){
      return Math.floor(diff / 86400000).toString() + ' d left'
    } else if(diff>3600000) {
      return Math.floor(diff / 3600000).toString() + ' hr left'
    } else if(diff>60000) {
      return Math.floor(diff / 60000).toString() + ' min left'
    } else {
      return 'Started'
    }
  }
  else {
    if(diff > -86400000){
      return 'today'
    } else if(diff > -2592000000){
      return (Math.abs(Math.floor(diff / 86400000))-1).toString() + ' d ago'
    } else if(diff > -31104000000){
      return Math.abs(Math.floor(diff / 2592000000)).toString() + ' mth ago'
    } else {
      return Math.abs(Math.floor(diff / 31104000000)).toString() + ' yr ago'
    }
  }
}
