// Define the interface for Ingredient
export interface Ingredient {
  icon: string;
  label: string;
  div: number[]; // Add div property to hold an array of numbers
}

// Define allIngredients array
export const allIngredients: Ingredient[] = [
  { icon: "🍅", label: "Tomato", div: [1, 2] },
  { icon: "🥬", label: "Lettuce", div: [3] },
  { icon: "🧀", label: "Cheese", div: [] },
];

// Destructure allIngredients to initialTabs
export const [tomato, lettuce, cheese] = allIngredients;
export const initialTabs: Ingredient[] = [tomato, lettuce, cheese];

// Function to get the next available ingredient
export function getNextIngredient(ingredients: Ingredient[]): Ingredient | undefined {
  const existing = new Set(ingredients);
  return allIngredients.find((ingredient) => !existing.has(ingredient));
}
