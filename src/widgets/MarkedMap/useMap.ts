import { ref } from "vue";
import { MapService } from "./MapService";
import { getUserLocation } from "./MarkedMap.utils";

export const useMap = () => {
  const mapService = ref<MapService>();
  const mapContainer = ref<HTMLElement>();

  const initMap = async (chooseMarker: (id: string) => void) => {
    if (!mapContainer.value) return;

    mapService.value = new MapService(mapContainer.value, chooseMarker);

    try {
      const { latitude, longitude } = await getUserLocation();
      console.log("latitude, longitude", latitude, longitude);
      mapService.value.centerMap(longitude, latitude);
    } catch (error) {
      console.warn(error);
      mapService.value.centerMap(19.815, 45.2565);
    }
  };

  return { mapService, mapContainer, initMap };
};
