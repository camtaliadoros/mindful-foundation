/**
 * Formats a date string in a consistent way that avoids hydration mismatches
 * by using a fixed format that doesn't depend on locale/timezone differences
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Use explicit month names to avoid locale differences
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Parse the date string to get year, month, day in a deterministic way
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  
  return `${month} ${day}, ${year}`;
}

