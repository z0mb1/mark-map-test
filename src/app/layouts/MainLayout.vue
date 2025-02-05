<template>
  <v-app :theme="theme">
    <AppBar
      @toggle-theme="toggleTheme"
      v-model="drawer"
      :mobile="mobile"
      :theme-icon="themeIcon"
    />

    <AppNavigation
      :mobile="mobile"
      v-model="drawer"
    />

    <v-main>
      <v-container
        fluid
        class="fill-height"
      >
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AppBar } from "../../widgets/AppBar";
import { AppNavigation } from "../../widgets/AppNavigation";
import { useTheme } from "./useTheme";
import { useDisplay } from "vuetify";

const { theme, themeIcon, toggleTheme } = useTheme();

const { mobile } = useDisplay();
const drawer = ref(!mobile.value);
</script>
