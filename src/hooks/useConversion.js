import { useAuthContext } from "./useAuthContext";

export const useConversion = () => {

const { translate } = useAuthContext()
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

  const parseYear = (date) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    return  year
  }
  const parseMonth = (date) => {
    const newDate = new Date(date)
    const month = newDate.getMonth() + 1
    return  month
  }

  const dateByLanguage = ( date, lang ) => {
    console.log('language', lang)
    return date.toLocaleString(
      translate(lang, 'cs-CZ', 'en-US', 'es-ES'),
      {
      month: "short",
      day: "2-digit",
      year: "numeric",
      }
  )}


  return {formatDate, getFirstDayOfMonth, parseYear, parseMonth, dateByLanguage}
}