import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Input, Button } from './components';

export default class App extends Component {

  state = {
    person: '',
    data: [],
    homeworld: '',
    films: [],
    starships: [],
    vehicles: [],
  }

  handlePerson = (person) => {
    this.setState({ person });
  };

  fetchDataPerson = async () => {
    if (this.state.person !== '') {
      const data = await fetch(`https://swapi.co/api/people/?search=${this.state.person}`, 'GET').then(res => res.json()).then(response => response.results);
      if (data) {
        const homeworld = await fetch(`${data[0].homeworld}`, 'GET').then(res => res.json()).then(response => response.name);

        this.setState({ data, person: '', homeworld });

        data[0].films.map(async film => {
          const res = await fetch(`${film}`, 'GET').then(res => res.json()).then(response => response);
          this.setState({ films: [...this.state.films, res] });
        });

        data[0].starships.map(async starship => {
          const res = await fetch(`${starship}`, 'GET').then(res => res.json()).then(response => response);
          this.setState({ starships: [...this.state.starships, res] });
        });

        data[0].vehicles.map(async vehicle => {
          const res = await fetch(`${vehicle}`, 'GET').then(res => res.json()).then(response => response);
          this.setState({ vehicles: [...this.state.vehicles, res] });
        });

      }
    }
  }

  renderFilms = (films) => {
    if (films.length > 0) {
      return (
        films.map((film, index) => {
          return (
            <View key={index}>
              <Text style={styles.titleText}>{`Titulo: ${film.title}`}</Text>
              <Text style={styles.titleText}>{`Diretor: ${film.director}`}</Text>
              <Text style={styles.titleText}>{`Episodio: ${film.episode_id}`}</Text>
            </View>
          );
        })
      )
    }
  }

  renderStarships = (starships) => {
    if (starships.length > 0) {
      return (
        starships.map((starship, index) => {
          return (
            <View key={index}>
              <Text style={styles.titleText}>{`Nome: ${starship.name}`}</Text>
              <Text style={styles.titleText}>{`Capacidade: ${starship.cargo_capacity}`}</Text>
              <Text style={styles.titleText}>{`Tripulacao: ${starship.crew}`}</Text>
            </View>
          );
        })
      )
    }
  }

  renderVehicles = (vehicles) => {
    if (vehicles.length > 0) {
      return (
        vehicles.map((vehicle, index) => {
          return (
            <View key={index}>
              <Text style={styles.titleText}>{`Nome: ${vehicle.name}`}</Text>
              <Text style={styles.titleText}>{`Capacidade: ${vehicle.cargo_capacity}`}</Text>
              <Text style={styles.titleText}>{`Tripulacao: ${vehicle.crew}`}</Text>
            </View>
          );
        })
      )
    }
  }

  renderData = () => {
    const { data, films, starships, vehicles } = this.state;

    if (data.length > 0) {
      return (
        <View style={styles.center}>
          <Text style={styles.titleText}>{`Nome: ${data[0].name}`}</Text>
          <Text style={styles.titleText}>{`Nascimento: ${data[0].birth_year}`}</Text>
          <Text style={styles.titleText}>{`Olhos: ${data[0].eye_color}`}</Text>
          <Text style={styles.titleText}>{`Genero: ${data[0].gender}`}</Text>
          <Text style={styles.titleText}>{`Cabelo: ${data[0].hair_color}`}</Text>

          <View style={styles.center}>
            <Text style={styles.titleText}>{`FILMES`}</Text>
            {this.renderFilms(films)}
          </View>

          <View style={styles.center}>
            <Text style={styles.titleText}>{`NAVES`}</Text>
            {this.renderStarships(starships)}
          </View>

           <View style={styles.center}>
            <Text style={styles.titleText}>{`NAVES`}</Text>
            {this.renderVehicles(vehicles)}
          </View>

        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.root}>
          <View style={styles.viewInput}>
            <Input
              onChangeText={(person) => this.handlePerson(person)}
              value={this.state.person}
            />
          </View>

          <View style={styles.viewButton}>
            <Button
              text='Buscar'
              onPress={() => this.fetchDataPerson()}
            />
          </View>

          <View>
            {this.renderData()}
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  viewInput: {
    paddingTop: 20,
    justifyContent: "center",
    paddingHorizontal: 30,
    height: 80,
    width: '100%'
  },
  viewButton: {
    justifyContent: "center",
    paddingHorizontal: 30,
    height: 100
  },
  titleText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  center: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
