import slugify from "slugify";

// export function slugify(name: string) {
//   const normalized = name.replace(/:/g, "-").replace(/[-\s]+/g, "-");

//   const slug = normalized.replace(/^-+/, "").replace(/-+$/, "");

//   return slug.toLowerCase();
// }

export function createSlug(name: string) {
  return slugify(name, {
    lower: true, // Convert to lower case
    strict: true, // Remove special characters
    replacement: "-", // Replace spaces with hyphens
  });
}

export function createTourObject(
  tourName: string,
  tourId: number
): { slug: string; id: number } {
  const slug = createSlug(tourName);
  return {
    slug,
    id: tourId,
  };
}
