import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function AdminCategory() {
  const urlBase = "http://localhost:5001/api/";

  interface Category {
    id: number;
    name: string;
  }

  const [category, setCategory] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({
    id: 0,
    name: "",
  });

  const [editingCategory, setEditingCategory] = useState<
    typeof newCategory | null
  >(null);

  // Récupération de tous les produits -----------------------------------
  const fetchCategory = async () => {
    try {
      const response = await fetch(urlBase + "category");
      const textData = await response.text();
      const data = JSON.parse(textData);
      setCategory(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Création d'un produit -----------------------------------
  const createCategory = async () => {
    try {
      const response = await fetch(urlBase + "category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategory.name }),
      });
      const textData = await response.text();
      const data = JSON.parse(textData);
      setCategory(data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Modification d'une catégorie -----------------------------------
  const updateCategory = async (id: number) => {
    try {
      const response = await fetch(urlBase + "category/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingCategory), // Utiliser editingCategory ici
      });
      const textData = await response.text();
      const data = JSON.parse(textData);
      setCategory(data);
      setEditingCategory(null); // Réinitialiser après mise à jour
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Suppression d'un utilisateur -----------------------------------
  const deleteCategory = async (id: number) => {
    try {
      const response = await fetch(urlBase + "category/" + id, {
        method: "DELETE",
      });
      const textData = await response.text();
      const data = JSON.parse(textData);
      setCategory(data);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Page d'administration - Catégories</Text>

      {/* Formulaire de création de catégorie */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nom de la catégorie"
          value={newCategory.name}
          onChangeText={(text) =>
            setNewCategory({ ...newCategory, name: text })
          }
        />
        <Button title="Créer une catégorie" onPress={createCategory} />
      </View>

      {/* Affichage des catégories */}
      <Button title="Afficher les catégories" onPress={fetchCategory} />

      {editingCategory && (
        <View style={styles.editForm}>
          <TextInput
            style={styles.input}
            placeholder="Nom de la catégorie"
            value={editingCategory.name}
            onChangeText={(text) =>
              setEditingCategory({ ...editingCategory, name: text })
            }
          />
          <Button
            title="Modifier la catégorie"
            onPress={() => {
              if (editingCategory) {
                updateCategory(editingCategory.id);
              }
            }}
          />
        </View>
      )}

      <FlatList
        data={category}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.userCard}>
            <Text style={styles.userText}>id :{item.id}</Text>
            <Text style={styles.userText}>nom :{item.name}</Text>
            <Button
              onPress={() => {
                setEditingCategory(item); // Mettre à jour editingCategory ici
              }}
              title="Modifier la catégorie"
            />
            <Button onPress={() => deleteCategory(item.id)} title="Supprimer" />
          </View>
        )}
      />
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
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
  },
});

