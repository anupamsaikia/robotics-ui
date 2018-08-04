export function getDateFromDateObject(d) {
  try {
    var x = new Date(d);
    var d = x.getFullYear() + '-' + (x.getMonth() + 1).toString().padStart(2,"0") + '-' + x.getDate().toString().padStart(2,"0");
    return d;
  } catch (error) {
    console.log(error);
  }
}

export function getTimeFromDateObject(d) {
  try {
    var x = new Date(d);
    var time = x.getHours().toString().padStart(2,"0") + ':' + x.getMinutes().toString().padStart(2,"0");
    return time;
  } catch (error) {
    console.log(error);
  }
}

export function getDateObjectFromDateTime(date, time) {
  try {
    time = time.split(':');
    date = date.split('-');
    
    var d = new Date();
    d.setHours(time[0], time[1], 0, 0);
    d.setFullYear(date[0], parseInt(date[1]) - 1, date[2])

    return d;
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
