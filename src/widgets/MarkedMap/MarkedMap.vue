<template>
  <div class="marked-map">
    <div class="marked-map__list">
      <v-skeleton-loader
        :loading="isMarkersLoading"
        type="list-item-three-line"
      >
        <MarkersList
          v-if="markers.length > 0"
          :markers="markers"
          :current-marker="markerId"
          @remove="removeMarkerAndClearFromMap"
          @show="showMarker"
        />
        <v-empty-state
          v-else
          :text="t('markersList.empty.text')"
          :title="t('markersList.empty.title')"
        ></v-empty-state>
      </v-skeleton-loader>
    </div>
    <div class="marked-map__map">
      <div
        ref="mapContainer"
        class="marked-map__map-element"
        :class="{ 'marked-map__map-element--edit': isEditorMode }"
      >
        <v-fab
          icon="mdi-plus"
          location="bottom end"
          size="small"
          absolute
          :color="isEditorMode ? 'green-accent-3' : 'blue-grey'"
          class="marked-map__map-add"
          @click="toggleEditorMode"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useMap } from "./useMap";
import { useMarkers } from "./useMarkers";
import { useMarkerEditor } from "./useMarkerEditor";
import type { Marker } from "../../shared/types";
import { MarkersList } from "./components";
import { useToast } from "vue-toastification";

const DETAILED_ZOOM_VALUE = 18;

defineProps<{ markerId?: string }>();
const router = useRouter();
const { t } = useI18n();
const toast = useToast();

const chooseMarker = (markerId: string) => {
  router.push({ name: "map", params: { id: markerId } });
};

const { mapService, mapContainer, initMap } = useMap();

const {
  markers,
  addMarker,
  isMarkersLoading,
  isMarkersError,
  fetchMarkers,
  removeMarker,
} = useMarkers();

const { isEditorMode, toggleEditorMode } = useMarkerEditor(
  mapService,
  chooseMarker,
  addMarker
);

const showMarker = (marker: Marker) => {
  chooseMarker(marker.id);
  mapService.value?.centerMap(marker.lon, marker.lat, DETAILED_ZOOM_VALUE);
};

const addInitialMarkersToMap = () => {
  markers.value.forEach((marker: Marker) => {
    mapService.value?.addMarker(marker);
  });
};

const removeMarkerAndClearFromMap = async (marker: Marker) => {
  await removeMarker(marker.id);
  mapService.value?.removeMarker(marker.id);
  if (isMarkersError.value) {
    toast.error(t("notification.marker.removeFailed"));
  } else {
    toast.success(t("notifications.marker.removeSuccess"));
  }
};

onMounted(async () => {
  initMap(chooseMarker);
  await fetchMarkers();
  addInitialMarkersToMap();
});
</script>

<style scoped>
.marked-map {
  --header-height: 64px;
  --container-gap: 32px;
  display: grid;
  gap: 16px;
  height: calc(100vh - var(--header-height) - var(--container-gap));
  width: 100%;
  grid-template-rows: 200px auto;
}

.marked-map__list {
  overflow: auto;
}

@media (min-width: 768px) {
  .marked-map {
    grid-template-columns: 300px auto;
    grid-template-rows: auto;
  }
}

.marked-map__map-element {
  width: 100%;
  height: 100%;
  position: relative;
}

.marked-map__map-element.marked-map__map-element--edit {
  cursor: crosshair;
}

.marked-map__map-element:active:not(.marked-map__map-element--edit) {
  cursor: grabbing;
}

.marked-map__map-add {
  top: -24px;
  right: 24px;
}
</style>
