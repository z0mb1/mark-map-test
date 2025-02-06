const API_KEY = "67a1515855fd9856587905zydf04467";

export const getAddress = async (
  lat: number,
  lon: number
): Promise<{ address?: string | undefined; error?: string | undefined }> => {
  try {
    const response = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${API_KEY}`
    );
    const data = await response.json();

    if (!(data.address.house_number && data.address.road)) {
      throw new Error("Точка не содержит номер дома");
    }

    return { address: data.display_name, error: data.error };
  } catch (error) {
    console.error("Ошибка получения адреса:", error);
    return { error: "Ошибка поиска адреса" };
  }
};
