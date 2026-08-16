import { useCallback, useState } from "react";
import { loadFavorites, toggleFavorite } from "../lib/favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => loadFavorites());

  const toggle = useCallback((id: string) => {
    setFavorites(toggleFavorite(id));
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggle, isFavorite };
}
