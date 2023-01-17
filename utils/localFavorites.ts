const toggleFavorite = (id: number) => {
  const FAVORITES_LOCALSTORAGE = 'favorites';
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

const localFav = {
  toggleFavorite,
};

export default localFav;
