/* eslint-disable react-hooks/exhaustive-deps */
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

const Home = () => {
  const signOut = async () => {
    auth()
      .signOut()
      .then(() => {
        GoogleSignin.revokeAccess()
          .then(() => {
            console.log('user revoked');
          })
          .catch(err => {
            console.log(err);
          });

        console.log('User signed out');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<{id: string; task: string}[]>([]);

  const userId = auth().currentUser?.uid;

  const todosRef = firestore()
    .collection('users')
    .doc(userId)
    .collection('todos');

  useEffect(() => {
    const unsubscribe = todosRef.onSnapshot(snapshot => {
      let tempTodos: {id: string; task: string}[] = [];
      snapshot.forEach(doc => {
        tempTodos.push({id: doc.id, task: doc.data()?.todo});
      });
      setTodos(tempTodos);
    });
    return unsubscribe;
  }, []);

  const addTodo = () => {
    todosRef.add({todo: task});
    setTask('');
  };

  const deleteTodo = async (id: string) => {
    todosRef
      .doc(id)
      .delete()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={style.screen}>
      <View style={style.inputContainer}>
        <TextInput
          value={task}
          onChangeText={setTask}
          style={style.inputStyle}
          placeholder="Enter task"
        />
        <Pressable onPress={addTodo} style={style.addBtnContainer}>
          <Text style={style.addBtnText}>Add</Text>
        </Pressable>
      </View>
      <ScrollView style={style.todosContainer}>
        {todos.map(({id, task}) => {
          return (
            <View key={id} style={style.todoDelBtnContainer}>
              <View style={style.todoContainer}>
                <Text style={style.todoText}>{task}</Text>
              </View>
              <Pressable
                style={style.deleteBtnContainer}
                onPress={() => deleteTodo(id)}>
                <Text style={style.deleteBtnText}>Delete</Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
      <View style={style.logoutBtnView}>
        <Pressable onPress={signOut} style={style.logoutBtnContainer}>
          <Text style={style.logoutBtnText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    marginBottom: 10,
  },
  inputStyle: {
    backgroundColor: 'white',
    color: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    flex: 1,
    elevation: 2.5
  },
  addBtnContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  addBtnText: {
    color: 'white',
  },
  todosContainer: {
    flex: 1,
  },
  logoutBtnView: {
    paddingVertical: 5,
  },
  logoutBtnContainer: {
    backgroundColor: 'tomato',
    borderRadius: 5,
    paddingVertical: 12,
  },
  logoutBtnText: {
    color: 'white',
    textAlign: 'center',
  },
  todoDelBtnContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  todoContainer: {
    padding: 16,
    elevation: 2.5,
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 3,
  },
  todoText: {
    textAlign: 'left',
  },
  deleteBtnContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 12,
  },
});

export default Home;
