export type AstroObjectCategory = "planet" | "dwarf planet" | "star";

export class AstroObject {
  name: string;
  slug: string;
  category: AstroObjectCategory;
  description: string;
  imagePath: string;
  imageDetailPath: string;
  info: Record<string, string>;

  constructor(
    name: string,
    slug: string,
    category: AstroObjectCategory,
    description: string,
    imagePath: string,
    imageDetailPath: string,
    info: Record<string, string>
  ) {
    this.name = name;
    this.slug = slug;
    this.category = category;
    this.description = description;
    this.imagePath = imagePath;
    this.imageDetailPath = imageDetailPath;
    this.info = info;
  }
}
