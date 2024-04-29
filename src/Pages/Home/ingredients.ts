export interface Ingredient {
    icon: string;
    label: string;
  }
  
  export const allIngredients = [
    { icon: "🍅", label: "Tomato", div: [1, 2] },
    { icon: "🥬", label: "Lettuce", div: [3] },
    { icon: "🧀", label: "Cheese", div: [] },
  ];
  
  const [tomato, lettuce, cheese] = allIngredients;
  export const initialTabs = [tomato, lettuce, cheese];
  
  export function getNextIngredient(
    ingredients: Ingredient[]
  ): Ingredient | undefined {
    const existing = new Set(ingredients);
    return allIngredients.find((ingredient) => !existing.has(ingredient));
  }
  