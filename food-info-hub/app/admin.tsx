import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

// Composant -------------------------------------------------------------------------------------
export default function AdminScreen() {
  const urlBase = "http://localhost:5001/api/";

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  // Création d'un utilisateur
  const createUser = async () => {
    try {
      const response = await fetch(urlBase + "users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const textData = await response.text();
      const data = JSON.parse(textData);
      setUsers(data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Récupération de tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await fetch(urlBase + "users");
      const textData = await response.text();
      const data = JSON.parse(textData);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Modification d'un utilisateur
  const updateUser = async (id: number) => {
    try {
      const response = await fetch(urlBase + "users/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const textData = await response.text();
      const data = JSON.parse(textData);
      setUsers(data);
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Suppression d'un utilisateur
  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(urlBase + "users/" + id, {
        method: "DELETE",
      });
      const textData = await response.text();
      const data = JSON.parse(textData);
      setUsers(data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <View>
      <Text>
        <h1>Page d'administration</h1>
      </Text>

      {/* Formulaire de création d'utilisateur */}
      <div
        style={{
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
        }}
      >
        <TextInput
          placeholder="Username"
          value={newUser.username}
          onChangeText={(text) => setNewUser({ ...newUser, username: text })}
        />
        <TextInput
          placeholder="Email"
          value={newUser.email}
          onChangeText={(text) => setNewUser({ ...newUser, email: text })}
        />
        <TextInput
          placeholder="Role"
          value={newUser.role}
          onChangeText={(text) => setNewUser({ ...newUser, role: text })}
        />
        <TextInput
          placeholder="Password"
          value={newUser.password}
          onChangeText={(text) => setNewUser({ ...newUser, password: text })}
        />

        <Button title="Créer un utilisateur" onPress={createUser} />
      </div>

      <Button title="Afficher tous les utilisateurs" onPress={fetchUsers} />

      {editingUser && (
        <View
          style={{
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
          }}
        >
          <TextInput
            placeholder="Username"
            value={editingUser.username}
            onChangeText={(text) =>
              setEditingUser({ ...editingUser, username: text })
            }
          />
          <TextInput
            placeholder="Email"
            value={editingUser.email}
            onChangeText={(text) =>
              setEditingUser({ ...editingUser, email: text })
            }
          />
          <TextInput
            placeholder="Role"
            value={editingUser.role}
            onChangeText={(text) =>
              setEditingUser({ ...editingUser, role: text })
            }
          />

          <Button
            title="Mettre à jour l'utilisateur"
            onPress={() => updateUser(editingUser.id)}
          />
        </View>
      )}

      <FlatList
        data={users}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={({ item }) => (
          <View
            style={{
              margin: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: "black",
              backgroundColor: "#f0f500",
            }}
          >
            <Text style={{ fontSize: 20 }}>ID: {item.id || "erreur"}</Text>
            <Text style={{ fontSize: 20 }}>
              Username: {item.username || "erreur"}
            </Text>
            <Text style={{ fontSize: 20 }}>
              Email: {item.email || "erreur"}
            </Text>
            <Text style={{ fontSize: 20 }}>Role: {item.role || "erreur"}</Text>
            <Text style={{ fontSize: 20 }}>
              Created At: {item.createdAt || "erreur"}
            </Text>
            <Text style={{ fontSize: 20 }}>
              Updated At: {item.updatedAt || "erreur"}
            </Text>

            <Button
              onPress={() => deleteUser(item.id)}
              title="Supprimer l'utilisateur"
            />
            <Button
              onPress={() => setEditingUser(item)}
              title="Modifier l'utilisateur"
            />
          </View>
        )}
      />
    </View>
  );
}
