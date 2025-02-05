import type { Marker } from "../../types";

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

class Backend {
  entityType: string;
  constructor(entityType: string) {
    this.entityType = entityType;
  }

  private static simulateAsync<T>(
    data: T,
    delay: number = 300
  ): Promise<ApiResponse<T>> {
    return new Promise<ApiResponse<T>>((resolve, reject) => {
      setTimeout(() => {
        if (data) {
          resolve({
            data: data,
            status: 200,
            statusText: "OK",
          });
        } else {
          reject({
            data: {} as T,
            status: 400,
            statusText: "Error",
          });
        }
      }, delay);
    });
  }

  static generateId() {
    return crypto.randomUUID();
  }

  static saveToDatabase<T extends { id?: string }>(entity: string, data: T) {
    localStorage.setItem(`${entity}-${data.id}`, JSON.stringify(data));
  }

  static getEntitiesFromDatabase<T>(entity: string): T[] {
    const items: T[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(entity)) {
        const value = localStorage.getItem(key);
        if (!value) continue;
        try {
          items.push(JSON.parse(value));
        } catch {}
        items.push();
      }
    }

    return items;
  }

  static removeFromDatabase(entity: string, id: string) {
    localStorage.removeItem(`${entity}-${id}`);
    return id;
  }

  saveMarker(marker: Omit<Marker, "id">) {
    const markerData = { ...marker, id: Backend.generateId() };
    Backend.saveToDatabase(this.entityType, markerData);
    return Backend.simulateAsync(markerData);
  }

  getMarkers() {
    const markersData = Backend.getEntitiesFromDatabase(this.entityType);
    return Backend.simulateAsync(markersData);
  }

  removeMarker(id: string) {
    const deletedItemId = Backend.removeFromDatabase(this.entityType, id);
    return Backend.simulateAsync(deletedItemId);
  }
}

export const apiService = new Backend("marker");
