/**
 * Generates initials from a full name.
 * Example: "Rutvik Parmar" -> "RP"
 * 
 * @param name The full name to generate initials from
 * @returns A string containing the initials (first letter of first name + first letter of last name)
 */
export const getInitials = (name: string): string => {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};
