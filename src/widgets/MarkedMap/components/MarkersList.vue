<template>
  <v-card>
    <v-list>
      <v-list-item
        v-for="marker in markers"
        :key="marker.id"
        :active="marker.id === currentMarker"
        @click="emit('show', marker)"
      >
        <v-list-item-title>{{ marker.address }}</v-list-item-title>
        <v-list-subheader>{{
          `${marker.lon.toFixed(4)}, ${marker.lat.toFixed(4)}`
        }}</v-list-subheader>
        <template #append>
          <v-icon
            @click.stop="emit('remove', marker)"
            color="red"
          >
            mdi-close
          </v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { Marker } from "../../../shared/types";

defineProps<{
  markers: Marker[];
  currentMarker?: string;
}>();

const emit = defineEmits<{
  (event: "remove", payload: Marker): void;
  (event: "show", payload: Marker): void;
}>();
</script>
