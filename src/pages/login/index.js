import React, { Component } from "react";

import { ActivityIndicator } from "react-native";
import { Container, Input, Button, ButtonText, Error } from "./styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as loginActions } from "../../store/ducks/login";

class login extends Component {
  state = {
    username: ""
  };

  handleSubmit = async () => {
    const { username } = this.state;
    const { loginRequest, navigation } = this.props;

    loginRequest(username);
  };

  render() {
    const { username } = this.state;
    const { error, loading } = this.props;

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
            <ActivityIndicator size={30} color="#fff" />
          ) : (
            <ButtonText>Entrar</ButtonText>
          )}
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.login.error,
  loading: state.login.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(loginActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(login);
