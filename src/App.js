import React, { Component } from "react";
import './App.css';
import CityCard from "./components/city-card/City";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { parisFilms: null, montpellierFilms: null, suresnesFilms: null };
  }

  async componentDidMount() {
    const parisQuery = `
    PREFIX : <http://www.semanticweb.org/FindYourScene#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    SELECT ?labelFilm ?labelProduction ?labelType ?labelGenre ?langue ?adresse ?date ?resume ?labelActeur
    WHERE {
        ?film :aEteTourneA "Paris" .
        ?film rdfs:label ?labelFilm .
        ?film :estProduitPar ?production .
        ?production rdfs:label ?labelProduction .
        ?film :estDeType ?type .
        ?type rdfs:label ?labelType .
        ?film :aPourGenre ?genre .
        ?genre rdfs:label ?labelGenre .
        ?film :aPourLangue ?langue .
        ?film :aEteTourneLe ?date .
        ?film :aPourResume ?resume .
        ?film :aPourActeur ?acteur .
        ?acteur rdfs:label ?labelActeur .
        ?film :aPourAdresse ?adresse .
     }
     LIMIT 50
    `
    const montepellierQuery = `
    PREFIX : <http://www.semanticweb.org/FindYourScene#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    SELECT DISTINCT ?labelFilm (SAMPLE (?nameProduction) as ?labelProduction) (SAMPLE (?nameType) as ?labelType) (SAMPLE (?nameGenre) as ?labelGenre) (SAMPLE (?nameLangue) as ?langue) (SAMPLE (?nameDate) as ?date) (SAMPLE (?nameResume) as ?resume) (SAMPLE (?nameActeur) as ?labelActeur) (SAMPLE (?nameAdresse) as ?adresse)
        WHERE {
            ?film :aEteTourneA "Montpellier" .
            ?film rdfs:label ?labelFilm .
            ?film :estProduitPar ?production .
            ?production rdfs:label ?nameProduction .
            ?film :estDeType ?type .
            ?type rdfs:label ?nameType .
            ?film :aPourGenre ?genre .
            ?genre rdfs:label ?nameGenre .
            ?film :aPourLangue ?nameLangue .
            ?film :aEteTourneLe ?nameDate .
            ?film :aPourResume ?nameResume .
            ?film :aPourActeur ?acteur .
            ?acteur rdfs:label ?nameActeur .
            ?film :aPourAdresse ?nameAdresse .  
        }
    GROUP BY ?labelFilm
    `
    const suresnesQuery = `
    PREFIX : <http://www.semanticweb.org/FindYourScene#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    SELECT ?labelFilm (SAMPLE (?nameProduction) as ?labelProduction) (SAMPLE (?nameType) as ?labelType) (SAMPLE (?nameGenre) as ?labelGenre) (SAMPLE (?nameLangue) as ?langue) (SAMPLE (?nameDate) as ?date) (SAMPLE (?nameResume) as ?resume) (SAMPLE (?nameActeur) as ?labelActeur) (SAMPLE (?nameAdresse) as ?adresse)
    WHERE {
        ?film :aEteTourneA "Suresnes" .
              ?film rdfs:label ?labelFilm .
              ?film :estProduitPar ?production .
              ?production rdfs:label ?nameProduction .
              ?film :estDeType ?type .
              ?type rdfs:label ?nameType .
              ?film :aPourGenre ?genre .
              ?genre rdfs:label ?nameGenre .
              ?film :aPourLangue ?nameLangue .
              ?film :aEteTourneLe ?nameDate .
              ?film :aPourResume ?nameResume .
              ?film :aPourActeur ?acteur .
              ?acteur rdfs:label ?nameActeur .
              ?film :aPourAdresse ?nameAdresse . 
     }
     GROUP BY ?labelFilm
    `

    this.requestData(parisQuery).then(res => this.setState({ parisFilms: res }))
    this.requestData(montepellierQuery).then(res => this.setState({ montpellierFilms: res }))
    this.requestData(suresnesQuery).then(res => this.setState({ suresnesFilms: res }))
  }

  async requestData(query) {
    var tab = new Array();
    const SparqlClient = require('sparql-http-client')
    const endpointUrl = 'http://localhost:3030/FindYourScene'
    const client = new SparqlClient({ endpointUrl })
    const stream = await client.query.select(query)

    stream.on('data', row => {
      tab.push(row)
    })

    stream.on('error', err => {
      console.error(err);
    })
    return tab
  }

  render() {
    const parisDesc = "Ville la plus célèbre de France, c'est également l'une des commune française ayant accueilli le plus de tournage de film internationnaux. Il se peut que si vous cherchez un film, celui-ci se soit sûrement déroulé àParis.";
    const mtpDesc = "Reconnue pour son beau temps et son beau vivre, Montpellier est une ville française ayant accueilli de nombreux films. Amis sudistes, soyez surpris du nombre de scènes tournées dans cette magnifique ville !";
    const suresnesDesc = "Petite commune non loin de Paris, Suresnes compte parmis les petites communes françaises ayant eu pour lieu de tournage un certains nombre de films. Venez découvrir ses films et ses belles ruelles.";
    return (
      <div>
        <div id="page-header">
          <h1>{this.props.pageTitle}</h1>
          <p>{this.props.pageDesc}</p>
        </div>
        <div id="container-cards">
          <CityCard listFilms={this.state.parisFilms} city={"Paris"} title="Paris" description={parisDesc} image="https://cdn.turkishairlines.com/m/536e8df8c381e006/original/Travel-Guide-of-Paris-via-Turkish-Airlines.jpg"></CityCard>
          <CityCard listFilms={this.state.montpellierFilms} city={"Montpellier"} title="Montpellier" description={mtpDesc} image="https://cdn.radiofrance.fr/s3/cruiser-production/2020/11/e6ca63fe-8a00-43be-b13b-2f35ff9936ba/870x489_maxnewsworld798581.jpg"></CityCard>
          <CityCard listFilms={this.state.suresnesFilms} city={"Suresnes"} title="Suresnes" description={suresnesDesc} image="https://www.tourisme.fr/images/otf_offices/1282/suresnes-laurence-masson--9-.jpg"></CityCard>
        </div>

      </div>
    );
  }
}

export default App;