//----------------------------------- [Produit en fonction du code barre] ---------------------------------------------//
export async function fetchProductDataByBarcode(barcode) {
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

//----------------------------------- [Produit en fonction du mot clé] ---------------------------------------------//
export async function fetchProductDataByKeyword(keyword) {
  const encodedKeyword = encodeURIComponent(keyword);
  const url = `https://prices.openfoodfacts.net/api/v1/products?product_name__like=${encodedKeyword}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "FoodInfoHub - Version 0.1",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.products; // Retourne directement le tableau de produits
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
}
