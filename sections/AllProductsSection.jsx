import React from 'react';
import ProductSection from '../screens/ProductSection';

const AllProductsSection = ({ products }) => {
  return (
    <ProductSection title="All Products" products={products} />
  );
};

export default AllProductsSection;
