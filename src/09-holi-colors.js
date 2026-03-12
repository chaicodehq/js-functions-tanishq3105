/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  // Your code here
  if (
    typeof color1 !== "object" ||
    typeof color2 !== "object" ||
    color1 === null ||
    color2 === null
  )
    return null;
  const keys = ["name", "r", "g", "b"];
  for (let key of keys) {
    if (!Object.hasOwn(color1, key) || !Object.hasOwn(color2, key)) return null;
  }
  const ans = {};
  ans.name = `${color1.name}-${color2.name}`;
  const r = Math.round((color1.r + color2.r) / 2);
  const g = Math.round((color1.g + color2.g) / 2);
  const b = Math.round((color1.b + color2.b) / 2);
  ans.r = r;
  ans.b = b;
  ans.g = g;
  return ans;
}

export function adjustBrightness(color, factor) {
  // Your code here
  if (color === null || typeof factor !== "number") return null;
  const ans = {};
  ans.name = color.name;
  const factoredR = Math.min(Math.round(factor * color.r), 255);
  const factoredG = Math.min(Math.round(factor * color.g), 255);
  const factoredB = Math.min(Math.round(factor * color.b), 255);
  ans.r = factoredR;
  ans.g = factoredG;
  ans.b = factoredB;
  return ans;
}

export function addToPalette(palette, color) {
  // Your code here
  if (!Array.isArray(palette)) return [color];
  const newPalette = [...palette];
  if (color === null) return newPalette;
  newPalette.push(color);
  return newPalette;
}

export function removeFromPalette(palette, colorName) {
  // Your code here
  if (!Array.isArray(palette)) return [];
  const paletteCopy = palette.filter((obj) => {
    return obj.name !== colorName;
  });
  return paletteCopy;
}

export function mergePalettes(palette1, palette2) {
  const p1 = Array.isArray(palette1) ? palette1 : [];
  const p2 = Array.isArray(palette2) ? palette2 : [];

  // Use a Map to track unique names
  const uniqueNames = new Map();

  // Combine both into a NEW array (originals remain unchanged)
  // Iterating p1 then p2 ensures p1 items are seen first
  [...p1, ...p2].forEach((color) => {
    if (color && color.name && !uniqueNames.has(color.name)) {
      uniqueNames.set(color.name, color);
    }
  });

  // Convert the Map back to a new array
  return Array.from(uniqueNames.values());
}
