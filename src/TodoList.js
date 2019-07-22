import React from "react";

import { View, Text, Button, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux"; //função que coloca o dispatch em cada action
import * as TodosActions from "./store/actions/todos";

const TodoList = ({ todos, addTodo, markAsCompleted }) => {
  return (
    <View style={{ flex: 1 }}>
      {todos.map(todo => (
        <TouchableOpacity
          key={todo.id}
          onPress={() => markAsCompleted(todo.id)}
        >
          <Text style={{ color: todo.completed ? "green" : "black" }}>
            {todo.text}
          </Text>
        </TouchableOpacity>
      ))}
      <Button title="add todo" onPress={addTodo} />
    </View>
  );
};

const mapStateToProps = state => ({
  todos: state //recebe todo valor do Store atraves do state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(TodosActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
