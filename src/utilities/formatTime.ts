export const formatTime = (date:any) => {
    const weekDayNames: string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const monthNames: string[] = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
    const weekDayName = weekDayNames[date.getUTCDay()];
    const monthName = monthNames[date.getUTCMonth()];
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
  
    return `${weekDayName} ${date.getUTCDate()}, ${monthName} ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`;  
}