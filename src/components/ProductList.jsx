import React, { Component } from 'react';
import Axios from 'axios';
import ProductPreview from './ProductPreview';

const query = `
query MyQuery {
  allProducts {
    id
    name
    slug
    cover {
      url
    }
    category {
      id
      name
    }
  }
}`;

export default class ProductList extends Component {
  state = {
    data: null,
  }

  componentDidMount = () => {
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
        console.log (data)
      }
    })
    .catch(error => console.error(error));
  }

  render = () => {
    const { data } = this.state;

    if (data === null) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {data.allProducts.map( (product, index) =>
          <li key={index}>
            <ProductPreview {...product} />
          </li>
        )}
      </ul>
    );
  }
}
