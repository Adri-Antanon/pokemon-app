import { pokeApi } from '../api';
import { Pokemon } from '../interfaces';
import { extractProperty } from './handleData';

export const getPokemonInfo = async (nameOrId: string) => {
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

  return {
    id: extractProperty(data, 'id'),
    name: extractProperty(data, 'name'),
    sprites: extractProperty(data, 'sprites'),
    types: extractProperty(data, 'types'),
  };
};
