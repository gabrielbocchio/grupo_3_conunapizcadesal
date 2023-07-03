import React, { useState, useEffect } from 'react';
import "./Category.css"

const CategoryButtons = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/productDetail/api/category')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => {
        console.error('Error al obtener la lista de categorías:', error);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    onCategoryClick(categoryId);
  };

  return (
    <div className="category-buttons">
      <button onClick={() => handleCategoryClick(null)}>Todos</button>
      {categories.map(category => (
        <button key={category.id} onClick={() => handleCategoryClick(category.id)}>
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;