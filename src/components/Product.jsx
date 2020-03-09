import React, { Component } from 'react';
import Axios from 'axios';

const makeQuery = (slug) => `
query MyQuery {
  product(filter: {slug: {eq: "${slug}"}}) {
    id
    name
    category
    slug
  }
}`;

export default class Produits extends Component {
  state = {
    data: null,
  }

  componentDidMount = () => {
    const slug = this.props.match.params.slug;
    const query = makeQuery(slug);

    Axios.post(
      // GraphQL endpoint
      'https://graphql.datocms.com/',
      // Requête GraphQL
      { query },
      // Options pour authentifier notre requête
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_DATOCMS_API_KEY}`,
        } 
      },
    )
    .then(response => {
      if (response.data.hasOwnProperty('errors')) {
        for (let error of response.data.errors) {
          console.error('Error while querying GraphQL API:', error.message);
        }
      } else {
        const { data } = response.data;
        this.setState({ data });
      }
    })
    .catch(error => console.error(error));
  }

  render = () => {
    const { data } = this.state;

    if (data === null) {
      return <div>Loading...</div>;
    }

    const { produits } = data;

    return (
      <produits>
        <h1>{produits.nom}</h1>
        <p>{produits.catégorie}</p>
      </produits>
    );
  }
}
