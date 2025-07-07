import React from 'react';
import ProductSection from '../screens/ProductSection';

const TopOffersSection = ({ products }) => {
  return (
    <ProductSection title="Top Offers" products={products} />
  );
};

export default TopOffersSection;
