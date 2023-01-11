export interface PokemonListResponse {
  count: number;
  next: string;
  previous?: string;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}
