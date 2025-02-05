import { computed, ref } from "vue";

export const useTheme = () => {
  const theme = ref("dark");

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  const themeIcon = computed(() =>
    theme.value === "light" ? "mdi-weather-sunny" : "mdi-weather-night"
  );

  return {
    theme,
    themeIcon,
    toggleTheme,
  };
};
