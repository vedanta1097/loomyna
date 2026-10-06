/** Entries follow the supplied chart, left to right and top to bottom. */
const names = [
  "White", "Cream", "Rosato", "Goldie", "Yoghurt", "Jade",
  "Tq. Muda", "Yellow Stabilo", "Bubblegum", "Guava", "Sakura", "Violet",
  "Ash", "Khaky", "Skin", "Burnt Orange", "Melon", "Royal Blue",
  "Azure", "Green Stabilo", "Vibrant Orange", "African Violet", "Coral Cloud", "Hunter",
  "Grey Lilac", "Olive", "Honey Glow", "Hot Coral", "Lemon", "Gulf Blue",
  "Cyan Blue", "Psycho Red", "Red", "Bellflower", "Dark Ivy", "Bahamas",
  "Stone Grey", "Bronze", "Melrose", "New Yellow", "Biscuit", "Parlian",
  "Hyperblue", "Pink Stabilo", "Colonial Red", "Malibu Blue", "Shaded Spruce", "Eventide",
  "Onyx", "Dk. Brown", "Clay", "Military Green", "Acorn", "Indigo",
  "Navy", "Neon Pink", "Wine", "Black", "Lemon Zest", "Mauve",
] as const;

/** Colors sampled from the center of each chart swatch. */
const hexes = [
  "#ecedeb", "#ebe5ca", "#dfbab1", "#ede384", "#eeeee3", "#126d68",
  "#43e3f5", "#daf41c", "#df85c4", "#ca636c", "#febcd7", "#9138aa",
  "#a2b9cb", "#938f89", "#ac8c79", "#e05d23", "#d0da8c", "#3d3ead",
  "#1e9fc0", "#8cf614", "#fc6f07", "#b486ca", "#fbbfbb", "#203430",
  "#7c8a85", "#8a8972", "#cf9171", "#f25f4b", "#b7c8a1", "#91bad0",
  "#2191ba", "#fe615b", "#b51712", "#aa44ad", "#6c7566", "#205d7b",
  "#6f6e6a", "#5f524c", "#9f615f", "#edc407", "#c6b9a5", "#3a84aa",
  "#2e1898", "#fb3593", "#7d0f21", "#6a91bb", "#254e4b", "#949db4",
  "#3e4146", "#3f372b", "#9d3827", "#4a502e", "#715f52", "#26344c",
  "#252b45", "#ff16b0", "#562837", "#1b1b1b", "#efef3e", "#948391",
] as const;

export const bikiniChartColors = names.map((name, index) => ({
  name,
  hex: hexes[index],
}));
