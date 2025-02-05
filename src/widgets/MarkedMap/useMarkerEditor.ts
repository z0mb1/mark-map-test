import { ref, type Ref } from "vue";
import { getAddress } from "./MarkedMap.api";
import type { MapService } from "./MapService";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

export function useMarkerEditor(
  mapService: Ref<MapService | undefined>,
  chooseMarker: (id: string) => void,
  addMarker: (lat: number, lon: number, address: string) => Promise<any>
) {
  const { t } = useI18n();
  const isEditorMode = ref(false);
  let callback: ((event: any) => void) | undefined;

  const toast = useToast();

  const endEditorMode = () => {
    isEditorMode.value = false;
    mapService.value?.offClick(callback);
  };

  const addMarkerToMap = async (lon: number, lat: number) => {
    try {
      const { address, error } = await getAddress(lat, lon);
      if (error || !address) {
        throw new Error(error);
      }
      const response = await addMarker(lat, lon, address);
      mapService.value?.addMarker(response.data);
      chooseMarker(response.data.id);
      toast.success(t("notifications.marker.addSuccess"));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message ?? t("notifications.marker.addFailed"));
      } else {
        console.log("Неизвестная ошибка", error);
      }
    } finally {
      endEditorMode();
    }
  };

  const startEditorMode = () => {
    isEditorMode.value = true;
    callback = mapService.value?.onClick(addMarkerToMap);
  };

  const toggleEditorMode = () => {
    isEditorMode.value ? endEditorMode() : startEditorMode();
  };

  return { isEditorMode, toggleEditorMode };
}
