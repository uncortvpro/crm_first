export function useDate(date: any) {
   const formatDate = new Date(date.$date || date);
   return date ? formatDate.toLocaleDateString() : '';
}
  