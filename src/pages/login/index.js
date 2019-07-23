import React, { Component } from "react";
import api from "../../services/api";

import { ActivityIndicator } from "react-native";
import { Container, Input, Button, ButtonText, Error } from "./styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../../store/actions/login";

class login extends Component {
  state = {
    username: "",
    loading: false
  };

  handleSubmit = async () => {
    const { username } = this.state;
    const { loginSuccess, loginFailure, navigation } = this.props;
    try {
      this.setState({ loading: true });
      await api.get(`/users/${username}`);

      loginSuccess(username);

      this.setState({ loading: false });
      navigation.navigate("Repositories");
    } catch (error) {
      loginFailure();
      this.setState({ loading: false });
    }
  };

  render() {
    const { username, loading } = this.state;
    const { error } = this.props;

    return (
      <Container>
        {error && <Error>Usuário não encontrado</Error>}
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu usuário"
          value={username}
          onChangeText={text => this.setState({ username: text })}
        />
        <Button onPress={this.handleSubmit}>
          {loading ? (
            <ActivityIndicator size={30} />
          ) : (
            <ButtonText>Entrar</ButtonText>
          )}
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.login.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(loginActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(login);
