export const StartOfDay = (date: Date) => {  
  const x = new Date(date);
  x.setHours(0, 0, 0, 0);
  return x;
};

export const isSameDay = (date1: Date, date2: Date) => {
  return StartOfDay(date1).getTime() === StartOfDay(date2).getTime();
}

export const isYesterday = (ref: Date,candidate: Date) => {
    const yesterday = StartOfDay(ref);
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(yesterday, candidate);
}

export const toISO = (date: Date) => StartOfDay(date).toISOString();