import { useState } from "react";
import { Alert, Button, Platform, Text, TextInput, View } from "react-native";
import { fetchProductData } from "./api/apiService";

// Composant -------------------------------------------------------------------------------------
export default function Index() {
  const [productData, setProductData] = useState(null);
  const [barcode, setBarcode] = useState("");

  const handleFetchProductData = async () => {
    if (!barcode.trim()) {
      if (Platform.OS === "web") {
        alert("Veuillez entrer un code-barres.");
      } else {
        Alert.alert("Erreur", "Veuillez entrer un code-barres.");
      }
      return;
    }
    const data = await fetchProductData(barcode);
    setProductData(data);
    console.log(data);
  };

  return (
    <View>
      <Text>Page d'accueil</Text>

      {/* Champ de saisie pour le code-barres */}
      <TextInput
        placeholder="Entrez le code-barres"
        value={barcode}
        onChangeText={setBarcode}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
      />

      {/* Bouton pour lancement recherche */}
      <Button title="Rechercher" onPress={handleFetchProductData} />

      {/* Affichage des informations du produit (si disponibles -> TODO : gestion aucune info sur produit) */}
      {productData && (
        <View>
          {/* Affiche nom, image, marque, catégories */}
          <Text>Nom du produit: {productData.product.product_name}</Text>
          <img
            src={productData.product.image_front_url}
            style={{ width: 200, height: 200 }}
          />
          <Text>Marque: {productData.product.brands}</Text>
          <Text>Catégories: {productData.product.categories}</Text>

          {/* TODO: Ajouter affichage du Nutri-Score */}
          {/* TODO: Ajouter affichage du Eco-Score */}
          {/* TODO: Ajouter affichage du Carbon-Score */}

          {/* Affiche ingrédients, conditions de conservation */}
          <Text>Ingrédients: {productData.product.ingredients_text_fr}</Text>
          <Text>
            Conditions de conservation:{" "}
            {productData.product.conservation_conditions_fr}
          </Text>

          {/* service client */}
          <Text>Service client: {productData.product.customer_service_fr}</Text>
        </View>
      )}
    </View>
  );
}
