import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimeListService {

  private animeListsCache: Map<string, any[]> = new Map();

  constructor() { }

  // Método para agregar una lista de anime al caché
  addAnimeList(key: string, animeList: any[]): void {
    if(this.hasAnimeList(key))
      return;
    this.animeListsCache.set(key, animeList);
    console.log(this.getCacheSize());
  }

  // Método para obtener una lista de anime del caché
  getAnimeList(key: string): any[] | undefined {
    return this.animeListsCache.get(key);
  }

  // Método para verificar si una lista de anime está en el caché
  hasAnimeList(key: string): boolean {
    return this.animeListsCache.has(key);
  }

  // Método para eliminar una lista de anime del caché
  removeAnimeList(key: string): void {
    this.animeListsCache.delete(key);
  }

  // Método para limpiar todo el caché de listas de anime
  clearCache(): void {
    this.animeListsCache.clear();
  }

  // Método para calcular el tamaño del caché
  getCacheSize(): number {
    let size = 0;
    for (let [, animeList] of this.animeListsCache) {
      size += JSON.stringify(animeList).length;
    }
    return size;
  }
}
