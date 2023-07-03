import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CategoryButtons from '../category/CategoryButtons';



const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    categoryId: '',
    description: '',
    price: '',
    imagen: '',
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/productDetail/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => {
        console.error('Error al obtener la lista de productos:', error);
      });

    fetch('http://localhost:3000/productDetail/api/category')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => {
        console.error('Error al obtener la lista de categorías:', error);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(category => category.id === categoryId);
    return category ? category.name : 'Categoría desconocida';
  };

  const filterProductsByCategory = () => {
    if (selectedCategoryId === null) {
      return products;
    } else {
      return products.filter(product => product.categoryId === selectedCategoryId);
    }
  };

  const filteredProducts = filterProductsByCategory();

  const handleDeleteProduct = (productId) => {
    fetch(`http://localhost:3000/productDetail/api/products/${productId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.error('Error al eliminar el producto:', error);
      });
  };

  const handleCreateProduct = () => {
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('categoryId', newProduct.categoryId);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('imagen', newProduct.imagen);

    fetch('http://localhost:3000/productDetail/api/products', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Producto creado exitosamente:', data);
        setProducts(prevProducts => [...prevProducts, data]);
        setNewProduct({
          name: '',
          categoryId: '',
          description: '',
          price: '',
          imagen: '',
        });
      })
      .catch(error => {
        console.error('Error al crear el producto:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'imagen') {
      setNewProduct(prevProduct => ({
        ...prevProduct,
        [name]: files[0],
      }));
    } else {
      setNewProduct(prevProduct => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      categoryId: selectedCategory,
    }));
  };

  useEffect(() => {
    fetch('http://localhost:3000/productDetail/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => {
        console.error('Error al obtener la lista de productos:', error);
      });
  }, [newProduct]);

  const handleCreateProductClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  return (
    <div className="product-table">
      <CategoryButtons onCategoryClick={handleCategoryClick} />
      <h3>Tabla de productos</h3>
      Total de productos: {filteredProducts.length}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <Link className= "nombre-lista" to={`/product/${product.id}`}>{product.name}</Link>
              </td>
              <td>{getCategoryName(product.categoryId)}</td>
              <td>{product.price}</td>
              <td>
                <img src={`http://localhost:3000/images/${product.imagen}`} style={{ width: "100px" }} alt={product.name} />
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <button className="botoncito" onClick={handleCreateProductClick}>Creación de producto
        </button>
      </div>

      {showCreateForm && (
        <form className="form-container" onSubmit={handleCreateProduct}>
          <div>
            <label htmlFor="name" className="form-label">Nombre:</label>
            <input type="text" id="name" className="form-input" name="name" required value={newProduct.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="categoryId" className="form-label">Categoría:</label>
            <select id="categoryId" name="categoryId" className="form-select" value={newProduct.categoryId} onChange={handleCategoryChange}>
              <option value="">Seleccione una categoría</option>
              {categories && categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="form-label">Descripción:</label>
            <input type="text" id="description" className="form-input" name="description" value={newProduct.description} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="price" className="form-label">Precio:</label>
            <input type="number" id="price" name="price" value={newProduct.price} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="imagen" className="form-label">Imagen:</label>
            <input type="file" id="imagen" className="form-input" name="imagen" onChange={handleInputChange} />
          </div>
          <button className="form-button">Crear producto</button>
        </form>
      )}
      

    </div>
  );
};

export default ProductTable;