<template>
  <v-container>
    <div v-html="taskText"></div>
    <v-img
      :aspect-ratio="1"
      src="/example.webp"
      width="500"
    ></v-img>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import markdownit from "markdown-it";
import { computed } from "vue";

const { t } = useI18n();

const md = markdownit();

const taskText = computed(() => {
  return md.render(t("task"));
});
</script>
