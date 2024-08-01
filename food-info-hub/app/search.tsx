import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { fetchProductData } from "./api/apiService";

// Composant -------------------------------------------------------------------------------------
export default function SearchScreen() {
  const [productData, setProductData] = useState<{
    product: {
      product_name: string;
      image_front_url: string;
      quantity: string;
      brands: string;
      categories: string;
      ingredients_text_fr: string;
      conservation_conditions_fr: string;
      customer_service_fr: string;
    };
  } | null>(null);
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
      <StatusBar style="auto" />

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
          <Image
            source={{ uri: productData.product.image_front_url }}
            style={{ width: 200, height: 200 }}
          />
          <Text>Marque: {productData.product.brands}</Text>
          <Text>Quantité: {productData.product.quantity}</Text>

          <div>
            <Text>L'oeil de l'observateur</Text>
            {/* TODO: Ajouter affichage du Nutri-Score */}

            {/* TODO: Ajouter affichage du Eco-Score */}
            {/* TODO: Ajouter affichage du Carbon-Score */}
          </div>

          <Text>Catégories: {productData?.product?.categories}</Text>

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
