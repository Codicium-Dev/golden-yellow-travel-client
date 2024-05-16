export function slugify(name: string) {
  const normalized = name.replace(/:/g, "-").replace(/[-\s]+/g, "-");

  const slug = normalized.replace(/^-+/, "").replace(/-+$/, "");

  return slug.toLowerCase();
}

export function createTourObject(
  tourName: string,
  tourId: number
): { slug: string; id: number } {
  const slug = slugify(tourName);
  return {
    slug,
    id: tourId,
  };
}
