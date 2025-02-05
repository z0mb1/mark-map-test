<template>
  <v-app-bar elevation="0">
    <v-app-bar-nav-icon
      v-if="mobile"
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>

    <template v-slot:append>
      <LocalisationSwitcher />
      <v-btn
        :icon="themeIcon"
        @click="emit('toggleTheme')"
      ></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { LocalisationSwitcher } from "../../features/LocalisationSwitcher";

defineProps<{
  themeIcon: string;
  mobile: boolean;
}>();

const drawer = defineModel<boolean>();

const emit = defineEmits<{
  (event: "toggleTheme"): void;
}>();
</script>
