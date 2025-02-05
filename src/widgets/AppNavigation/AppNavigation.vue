<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="!mobile"
    temporary
  >
    <v-divider />
    <v-list>
      <v-list-item
        prepend-icon="mdi-information-variant-box"
        :title="t('pages.about.title')"
        value="about"
        :to="{ name: 'about' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-map-marker-multiple"
        :title="t('pages.map.title')"
        value="map"
        :to="{ name: 'map' }"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const drawer = defineModel<boolean>();

defineProps<{ mobile: boolean }>();
</script>
