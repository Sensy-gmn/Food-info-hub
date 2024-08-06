import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function AdminProducts() {
  const urlBase = "http://localhost:5001/api/";

  interface Product {
    id: number;
    barcode: string;
    name: string;
    description: string;
    category_ID: number;
    user_ID: number;
    created_at: string;
    updated_at: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    barcode: "",
    name: "",
    description: "",
    category_ID: 0,
    user_ID: 0,
    created_at: "",
    updated_at: "",
  });

  // Récupération de tous les produits -----------------------------------
  const fetchProducts = async () => {
    try {
      const response = await fetch(urlBase + "products");
      const textData = await response.text();
      const data = JSON.parse(textData);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Création d'un produit -----------------------------------
  const createProduct = async () => {
    try {
      const response = await fetch(urlBase + "products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const textData = await response.text();
      const data = JSON.parse(textData);
      setProducts(data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Page d'administration - produits</Text>

      {/* Formulaire de création d'utilisateur */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Barcode"
          value={newProduct.barcode}
          onChangeText={(text) =>
            setNewProduct({ ...newProduct, barcode: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newProduct.name}
          onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newProduct.description}
          onChangeText={(text) =>
            setNewProduct({ ...newProduct, description: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Category ID"
          value={newProduct.category_ID.toString()}
          onChangeText={(text) =>
            setNewProduct({ ...newProduct, category_ID: parseInt(text) })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="User ID"
          value={newProduct.user_ID.toString()}
          onChangeText={(text) =>
            setNewProduct({ ...newProduct, user_ID: parseInt(text) })
          }
        />

        <Button title="Créer un produit" onPress={createProduct} />
      </View>

      {/* Affichage des produits */}
      <Button title="Afficher tous les produits" onPress={fetchProducts} />

      <View>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.userCard}>
              <Text style={styles.userText}>nom : {item.name}</Text>
              <Text style={styles.userText}>
                description : {item.description}
              </Text>
              <Text style={styles.userText}>
                category_ID : {item.category_ID}
              </Text>
              <Text style={styles.userText}>user_ID : {item.user_ID}</Text>
              <Text style={styles.userText}>
                created_at : {item.created_at}
              </Text>
              <Text style={styles.userText}>
                updated_at : {item.updated_at}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    backgroundColor: "lightblue",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 60,
    marginTop: 60,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
  },
  editForm: {
    backgroundColor: "lightgreen",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 60,
    marginTop: 60,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
  },
  userCard: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#f0f500",
  },
  userText: {
    fontSize: 20,
  },
});
