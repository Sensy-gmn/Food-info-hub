//----------------------------------- [Produit en fonction du code barre] ---------------------------------------------//
export async function fetchProductData(barcode) {
  const url = `https://world.openfoodfacts.net/api/v2/product/${barcode}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "FoodInfoHub - Version 0.1",
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données");
  }

  const data = await response.json();
  return data;
}
