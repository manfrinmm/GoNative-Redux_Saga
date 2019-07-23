import React, { Component } from "react";
import { ActivityIndicator, Text } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as RepoActions } from "../../store/ducks/repositories";

import { Container } from "./styles";

class Repositories extends Component {
  componentDidMount() {
    const { loadRepositoriesRequest } = this.props;

    loadRepositoriesRequest();
  }

  render() {
    const { repositoires } = this.props;
    return (
      <Container>
        {repositoires.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          repositoires.data.map(repo => <Text key={repo.id}>{repo.name}</Text>)
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  repositoires: state.repositories
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(RepoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repositories);
