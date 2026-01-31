export function slugify(name) {
  if (!name) return '';
  
  let slug = name;
  // Handle specific suffix removal if needed
  if (slug.endsWith(" ÜNİVERSİTESİ")) {
    slug = slug.slice(0, -" ÜNİVERSİTESİ".length);
  }
  
  return slug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-'); // Remove duplicate dashes
}
