import { computed } from "vue";
import { useStore } from "vuex";
import type { Marker } from "../../shared/types";

export function useMarkers() {
  const store = useStore();
  const markers = computed<Marker[]>(() => store.state.markers || []);
  const isMarkersLoading = computed(() => store.state.isLoading);
  const isMarkersError = computed(() => store.state.hasError);

  const fetchMarkers = async () => {
    await store.dispatch("fetchMarkers");
  };

  const addMarker = async (lat: number, lon: number, address: string) => {
    return await store.dispatch("addMarker", { lat, lon, address });
  };

  const removeMarker = async (id: string) => {
    return await store.dispatch("removeMarker", id);
  };

  return {
    markers,
    isMarkersLoading,
    isMarkersError,
    fetchMarkers,
    addMarker,
    removeMarker,
  };
}
