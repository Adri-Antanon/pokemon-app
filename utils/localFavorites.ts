const FAVORITES_LOCALSTORAGE = 'favorites';

const toggleFavorite = (id: number) => {
  let favorites: number[] = JSON.parse(
    localStorage.getItem(FAVORITES_LOCALSTORAGE) ?? '[]',
  );

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem(FAVORITES_LOCALSTORAGE, JSON.stringify(favorites));
};

const existInFavorites = (id: number): boolean => {
  if (typeof window === 'undefined') return false;
  const favorites: number[] = JSON.parse(
    localStorage.getItem(FAVORITES_LOCALSTORAGE) ?? '[]',
  );

  return favorites.includes(id);
};

const localFav = {
  existInFavorites,
  toggleFavorite,
};

export default localFav;
