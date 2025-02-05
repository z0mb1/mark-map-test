import { createStore } from "vuex";
import { apiService } from "../../shared/services/backend";
import type { Marker } from "../../shared/types";

export interface State {
  markers: Marker[];
  isLoading: boolean;
  error: string | null;
}

export const store = createStore<State>({
  state: {
    markers: [],
    isLoading: false,
    error: null,
  },
  mutations: {
    setMarkers(state, markers: Marker[]) {
      state.markers = markers;
    },
    addMarker(state, marker: Marker) {
      state.markers.push(marker);
    },
    removeMarker(state, id: string) {
      state.markers = state.markers.filter((marker) => marker.id !== id);
    },
    setLoading(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    setError(state, error: string | null) {
      state.error = error;
    },
  },
  actions: {
    async fetchMarkers({ commit }) {
      commit("setError", null);
      commit("setLoading", true);
      try {
        const response = await apiService.getMarkers();
        commit("setMarkers", response.data);
      } catch (error) {
        commit("setError", "Failed to fetch markers");
      } finally {
        commit("setLoading", false);
      }
    },
    async addMarker({ commit }, marker: Omit<Marker, "id">) {
      commit("setError", null);
      try {
        const response = await apiService.saveMarker(marker);
        commit("addMarker", response.data);
        return response;
      } catch (error) {
        commit("setError", "Failed to add marker");
      }
    },
    async removeMarker({ commit }, id: string) {
      commit("setError", null);
      try {
        await apiService.removeMarker(id);
        commit("removeMarker", id);
      } catch (error) {
        commit("setError", "Failed to remove marker");
      }
    },
  },
  getters: {
    allMarkers: (state) => state.markers,
    isMarkersLoading: (state) => state.isLoading,
    hasError: (state) => !!state.error,
  },
});
