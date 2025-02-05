<template>
  <v-menu open-on-click>
    <template v-slot:activator="{ props }">
      <v-btn
        icon="mdi-translate"
        v-bind="props"
      ></v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="{ title, code } in availableLanguages"
        :key="code"
        :active="code === locale"
        @click="changeLanguage(code)"
      >
        <v-list-item-title>{{ title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useLocalisationSwitcher } from "./useLocalisationSwitcher";

const { availableLanguages, changeLanguage, locale } =
  useLocalisationSwitcher();
</script>
