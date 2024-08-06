import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Composant -------------------------------------------------------------------------------------
export default function AdminScreen() {
  const urlBase = "http://localhost:5001/api/";

  interface User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    password: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    id: null,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  });

  const [editingUser, setEditingUser] = useState<typeof newUser | null>(null);

  // Création d'un utilisateur -----------------------------------
  const createUser = async () => {
    try {
      const { id, ...userWithoutId } = newUser;
      const response = await fetch(urlBase + "users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userWithoutId),
      });
      const textData = await response.text();
      const data = JSON.parse(textData);
      setUsers(data);
      setNewUser({
        id: null,
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        password: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Récupération de tous les utilisateurs -----------------------------------
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

  // Modification d'un utilisateur -----------------------------------
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

  // Suppression d'un utilisateur -----------------------------------
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
    <View style={styles.container}>
      <Text style={styles.header}>Page d'administration</Text>

      {/* Formulaire de création d'utilisateur */}
      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          value={newUser.username}
          onChangeText={(text) => setNewUser({ ...newUser, username: text })}
        />
        <TextInput
          placeholder="Firstname"
          value={newUser.firstname}
          onChangeText={(text) => setNewUser({ ...newUser, firstname: text })}
        />
        <TextInput
          placeholder="Lastname"
          value={newUser.lastname}
          onChangeText={(text) => setNewUser({ ...newUser, lastname: text })}
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
      </View>

      <Button title="Afficher tous les utilisateurs" onPress={fetchUsers} />

      {editingUser && (
        <View style={styles.editForm}>
          <TextInput
            placeholder="Username"
            value={editingUser.username}
            onChangeText={(text) =>
              setEditingUser({ ...editingUser, username: text })
            }
          />
          <TextInput
            placeholder="Firstname"
            value={editingUser.firstname}
            onChangeText={(text) =>
              setEditingUser({ ...editingUser, firstname: text })
            }
          />
          <TextInput
            placeholder="Lastname"
            value={editingUser.lastname}
            onChangeText={(text) =>
              setEditingUser({ ...editingUser, lastname: text })
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
            onPress={() => editingUser && updateUser(editingUser.id)}
          />
        </View>
      )}

      <FlatList
        data={users}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userText}>ID: {item.id || "erreur"}</Text>
            <Text style={styles.userText}>
              Username: {item.username || "erreur"}
            </Text>
            <Text style={styles.userText}>
              Firstname: {item.firstname || "erreur"}
            </Text>
            <Text style={styles.userText}>
              Lastname: {item.lastname || "erreur"}
            </Text>
            <Text style={styles.userText}>Email: {item.email || "erreur"}</Text>
            <Text style={styles.userText}>Role: {item.role || "erreur"}</Text>
            <Text style={styles.userText}>
              Created At: {item.created_at || "erreur"}
            </Text>
            <Text style={styles.userText}>
              Updated At: {item.updated_at || "erreur"}
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
