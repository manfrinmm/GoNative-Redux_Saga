import React, { Component } from "react";
import { ActivityIndicator, Text } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as RepoActions from "../../store/actions/repositoires";

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
          <ActivityIndicator size="small" />
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
