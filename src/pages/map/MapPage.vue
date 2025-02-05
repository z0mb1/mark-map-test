<template>
  <MarkedMap :marker-id="id" />
</template>

<script setup lang="ts">
import { MarkedMap } from "../../widgets/MarkedMap";

defineProps<{ id?: string }>();
</script>
