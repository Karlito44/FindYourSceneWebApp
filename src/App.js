import React, { Component } from "react";
import './App.css';
import CityCard from "./components/city-card/City";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { parisFilms: {} };
  }

  async componentDidMount() {
    const parisFilmUriQuery = `
      PREFIX : <http://www.semanticweb.org/FindYourScene#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
  
      SELECT *
      WHERE {
         ?film rdf:type :Film .
         ?film rdfs:label ?label .
         ?film :aEteTourneA "Surenes"
       }
    `

    var parisUri = [];
    var parisTab;

    this.requestData(parisFilmUriQuery).then(function (result) {
      console.log(Array.isArray(result))
      // IL EST PAS ITERABLE JE SAIS PAS PK
      result.map(elem => console.log("elem", elem))
    })
    
    // parisUri.map(function (uri) {
    //   console.log("URI:", uri)
    //   const request = `
    //     PREFIX : <http://www.semanticweb.org/FindYourScene#>
    //     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    //     PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    //     PREFIX owl: <http://www.w3.org/2002/07/owl#>
  
    //     SELECT ?labelFilm ?labelProduction ?labelType ?labelGenre ?langue ?adresse ?date ?resume ?labelActeur
    //     WHERE {
    //       ` + uri + ` rdfs:label ?labelFilm .
    //       ` + uri + ` :estProduitPar ?production .
    //       ?production rdfs:label ?labelProduction .
    //       ` + uri + ` :estDeType ?type .
    //       ?type rdfs:label ?labelType .
    //       ` + uri + ` :aPourGenre ?genre .
    //       ?genre rdfs:label ?labelGenre .
    //       ` + uri + ` :aPourLangue ?langue .
    //       ` + uri + ` :aEteTourneLe ?date .
    //       ` + uri + ` :aPourResume ?resume .
    //       ` + uri + ` :aPourActeur ?acteur .
    //       ?acteur rdfs:label ?labelActeur
    //     }
    //     `
    //     // ` + uri + ` :aPourAdresse ?adresse .
    //   console.log(this.requestData(request))
    //   parisTab.push(this.requestData(request))

    // }).then(function (result) {
    //   parisTab = result
    //   console.log("Paris: ", parisTab)

    //   this.setState((state) => {
    //     // Important : lisez `state` au lieu de `this.state` lors de la mise à jour.
    //     console.log("State:", this.state.parisFilms)
    //     return { parisFilms: parisTab }
    //   })
    // });
  }

  async requestData(query) {
    var tab = new Array();
    const SparqlClient = require('sparql-http-client')
    const endpointUrl = 'http://localhost:3030/FindYourScene'
    const client = new SparqlClient({ endpointUrl })
    const stream = await client.query.select(query)

    stream.on('data', row => {
      Object.entries(row).forEach(([key, value]) => {
        if (key === "film")
          tab.push(value.value)
      })
    })

    console.log("Type:", typeof(tab))

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
          <CityCard films={this.state.parisFilms} title="Paris" description={parisDesc} image="https://cdn.turkishairlines.com/m/536e8df8c381e006/original/Travel-Guide-of-Paris-via-Turkish-Airlines.jpg"></CityCard>
          <CityCard films={this.state.parisFilms} title="Montpellier" description={mtpDesc} image="https://cdn.radiofrance.fr/s3/cruiser-production/2020/11/e6ca63fe-8a00-43be-b13b-2f35ff9936ba/870x489_maxnewsworld798581.jpg"></CityCard>
          <CityCard films={this.state.parisFilms} title="Suresnes" description={suresnesDesc} image="https://www.tourisme.fr/images/otf_offices/1282/suresnes-laurence-masson--9-.jpg"></CityCard>
        </div>

      </div>
    );
  }
}

export default App;

//   (async () => {
//     const SparqlClient = require('sparql-http-client')

//     const endpointUrl = 'http://localhost:3030/FindYourScene/sparql'
//     const query = `
//     PREFIX : <http://www.semanticweb.org/FindYourScene#>
//     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
//     PREFIX owl: <http://www.w3.org/2002/07/owl#>

//     SELECT *
//     WHERE {
//       ?a :aJoueDans :film .
//     }
//     `

//     const client = new SparqlClient({ endpointUrl })
//     const stream = await client.query.select(query)

//     stream.on('data', row => {
//       Object.entries(row).forEach(([key, value]) => {
//         console.log(`${key}: ${value.value} (${value.termType})`)
//         console.log("row", row)
//       })
//     })

//     stream.on('error', err => {
//       console.error(err);
//     })
//     })()