/**
 * Parses joining date in various backend formats:
 * - "yyyy-MM-dd"
 * - "dd-MM-yyyy"
 * - "yyyy-MM-ddTHH:mm:ss" (and ISO string variants)
 * - Array: [year, month, day, ...]
 * Returns { year, month, day } as numbers or null if unparseable.
 */
export function parseJoiningDate(value) {
  if (value == null) return null;

  // Handle Array format e.g. [2023, 3, 15]
  if (Array.isArray(value)) {
    if (value.length >= 3) {
      const year = Number(value[0]);
      const month = Number(value[1]);
      const day = Number(value[2]);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day) && year > 0 && month >= 1 && month <= 12) {
        return { year, month, day };
      }
    }
    return null;
  }

  if (typeof value !== 'string') {
    value = String(value);
  }

  const str = value.trim();
  if (!str) return null;

  // Handle "yyyy-MM-ddTHH:mm:ss" or ISO strings
  const datePart = str.includes('T') ? str.split('T')[0] : str;

  // Handle "yyyy-MM-dd" (or "yyyy/MM/dd")
  const ymdMatch = datePart.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (ymdMatch) {
    const year = Number(ymdMatch[1]);
    const month = Number(ymdMatch[2]);
    const day = Number(ymdMatch[3]);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day) && month >= 1 && month <= 12) {
      return { year, month, day };
    }
  }

  // Handle "dd-MM-yyyy" (or "dd/MM/yyyy")
  const dmyMatch = datePart.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmyMatch) {
    const day = Number(dmyMatch[1]);
    const month = Number(dmyMatch[2]);
    const year = Number(dmyMatch[3]);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day) && month >= 1 && month <= 12) {
      return { year, month, day };
    }
  }

  // Fallback: standard Date parsing
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return {
      year: parsed.getFullYear(),
      month: parsed.getMonth() + 1,
      day: parsed.getDate(),
    };
  }

  return null;
}
