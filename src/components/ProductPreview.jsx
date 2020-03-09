import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductPreview = ({ name, category, cover, slug }) =>
  <Card>

    <Card.Header as="h3">
      {category.name}
      
    </Card.Header>
    <Card.Header as="h3">
      {name}
        
    </Card.Header>
    
    <Card.Body>
      <Image src={cover.url} fluid />
     
      <div>
        <Link to={`/product/${slug}`}>
          <Button variant="primary">Read more...</Button>
        </Link>
      </div>
    </Card.Body>
  </Card>
;

export default ProductPreview;
