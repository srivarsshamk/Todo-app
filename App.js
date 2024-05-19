import React from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import create from 'zustand';

// Zustand store
const useStore = create((set) => ({
  tasks: [],
  editIndex: -1,

  // Add a task
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

  // Edit a task
  editTask: (index, task) =>
    set((state) => {
      const updatedTasks = [...state.tasks];
      updatedTasks[index] = task;
      return { tasks: updatedTasks, editIndex: -1 };
    }),

  // Delete a task
  deleteTask: (index) =>
    set((state) => {
      const updatedTasks = [...state.tasks];
      updatedTasks.splice(index, 1);
      return { tasks: updatedTasks, editIndex: -1 };
    }),

  // Set the task to edit
  setEditTask: (index) => set({ editIndex: index }),

  // Clear edit mode
  clearEdit: () => set({ editIndex: -1 }),
}));

export default function App() {
  const { tasks, editIndex, addTask, editTask, deleteTask, setEditTask, clearEdit } = useStore();
  const [task, setTask] = React.useState("");

  const handleAddTask = () => {
    if (task.trim() === "") return; // Do not add empty tasks

    if (editIndex !== -1) {
      // Editing existing task
      editTask(editIndex, task);
    } else {
      // Adding new task
      addTask(task);
    }
    setTask("");
  };

  const handleEditTask = (index) => {
    setEditTask(index);
    setTask(tasks[index]);
  };

  const handleDelTask = (index) => {
    deleteTask(index);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.task}>
        <Text style={styles.taskText}>{item}</Text>
        <View style={styles.taskActions}>
          <TouchableOpacity onPress={() => handleEditTask(index)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelTask(index)}>
            <Text style={styles.delButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sri Varssha's</Text>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a new Task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? "Update Task" : "Add Task"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
    backgroundColor: "#FFE4E1", // light rose background
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "#DB7093", // pinkish shade
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FF69B4", // pinkish shade
  },
  input: {
    borderWidth: 3,
    borderColor: "#DB7093", // pinkish shade
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#FF69B4", // pinkish shade
    padding: 10,
    borderRadius: 5,
    marginBottom: 7,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  taskActions: {
    flexDirection: "row",
  },
  editButton: {
    color: "#FF69B4", // pinkish shade
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 10,
  },
  delButton: {
    color: "#FF69B4", // pinkish shade
    fontWeight: "bold",
    fontSize: 18,
  },
  taskText: {
    fontSize: 19,
    color: "#DB7093", // pinkish shade
  },
});
