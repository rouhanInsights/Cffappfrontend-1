import React from 'react';
import ProductSection from '../screens/ProductSection';

const BestSellersSection = ({ products }) => {
  return (
    <ProductSection title="Best Sellers" products={products} />
  );
};

export default BestSellersSection;
