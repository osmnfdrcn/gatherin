export function createSlug(name: string): string {
  const removePunctuation = (str: string) => str.replace(/[^\w\s]/g, "");
  const processedName = removePunctuation(name.trim()).replace(/\s+/g, "-");
  return processedName.toLowerCase();
}
