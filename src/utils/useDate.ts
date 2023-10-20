export function useDate(date: any) {
   if (!date) return '';
   const formatDate = new Date(date.$date || date);
   return date ? formatDate.toLocaleDateString() : '';
}
  