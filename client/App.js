import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from "react-native";

import Axios from "axios";

import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import TaskList from "./src/components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    Axios.get("http://192.168.0.195:3001/items").then((response) => {
      setTasks(response.data);
    });
  }, [tasks]);

  function handleAdd() {
    if (input === "") return;

    Axios.post("http://192.168.0.195:3001/item", { item: input });

    setOpen(false);
    setInput("");
  }

  function handleDelete(id) {
    Axios.delete(`http://192.168.0.195:3001/item/${id}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#191970" />

      <View style={styles.content}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskList props={item} handleDelete={handleDelete} />
        )}
      />

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons
                style={{ marginLeft: 5, marginRight: 5 }}
                name="md-arrow-back"
                size={40}
                color="#FFF"
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nova Tarefa</Text>
          </View>

          <Animatable.View
            style={styles.modalBody}
            animation="fadeInUp"
            useNativeDriver
          >
            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              autoCorrect={false}
              placeholder="O que precisa fazer hoje?"
              style={styles.input}
              value={input}
              onChangeText={(texto) => setInput(texto)}
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </SafeAreaView>
      </Modal>

      <Animatable.View
        style={styles.fab}
        animation="bounceInUp"
        duration={1500}
      >
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Ionicons name="ios-add" size={35} color="#FFF" />
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191970",
  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 5,
    zIndex: 9,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  modal: {
    flex: 1,
    backgroundColor: "#191970",
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: "#FFF",
  },
  modalBody: {
    marginTop: 15,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: "#FFF",
    padding: 9,
    height: 80,
    textAlignVertical: "top",
    color: "#000",
    borderRadius: 5,
  },
  handleAdd: {
    backgroundColor: "#FFF",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5,
  },
  handleAddText: {
    fontSize: 20,
  },
});
