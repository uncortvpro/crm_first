export function useCheckEndDate(date: any) {
   if(!date) return false;
   
   const currentDate: any = new Date();
   const dueDate: any = new Date(date["$date"]);

   const differenceMs = dueDate - currentDate;
 
   const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

   return differenceDays <= 1 || differenceMs < 0;
 }