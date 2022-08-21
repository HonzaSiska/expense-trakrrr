export const useConversion = (data) => {

// FORMAT DATE TP (YYYY_MM_DD)
  const formatDate = (date) => {
    const myDate = new Date(date);
    let d = myDate.getDate();
    let m =  myDate.getMonth();
    m += 1;  
    const y = myDate.getFullYear();
    m = m < 10 ? `0${m}` : m
    d = d < 10 ? `0${d}` : d
    const newDate=(y+ "-" + m + "-" + d);
    return newDate
  }

  // FORMAT DATE TP (YYYY_MM_DD)
  const getFirstDayOfMonth = (date) => {
    const myDate = new Date(date);
    let d = '01'
    let m =  myDate.getMonth();
    m += 1;  
    const y = myDate.getFullYear();
    m = m < 10 ? `0${m}` : m
    const newDate=(y+ "-" + m + "-" + d);
    return newDate
  }

  return {formatDate, getFirstDayOfMonth}
}