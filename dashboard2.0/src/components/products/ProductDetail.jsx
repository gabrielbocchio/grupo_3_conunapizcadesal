import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imagen, setImage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/productDetail/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setName(data.name);
        setCategoryId(data.categoryId);
        setPrice(data.price);
        setDescription(data.description);
      })
      .catch(error => {
        console.error('Error al obtener el detalle del producto:', error);
      });
  }, [id]);

  useEffect(() => {
    fetch('http://localhost:3000/productDetail/api/category')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => {
        console.error('Error al obtener la lista de categorías:', error);
      });
  }, []);
  
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategoryId(selectedCategory);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'file' ? target.files[0] : target.value;
    const name = target.name;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'price':
        setPrice(value);
        break;
        case 'category':
            setCategoryId(value);
            break;
      case 'description':
        setDescription(value);
        break;
      case 'imagen':
        setImage(value);
        break;
      default:
        break;
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedProduct = {
      id: product.id,
      name,
      categoryId,
      price,
      description,
      imagen,
    };

    const formData = new FormData();
    formData.append('imagen', imagen);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('categoryId', categoryId);


    fetch(`http://localhost:3000/productDetail/api/products/${id}`, {
      method: 'PUT',
      body: formData,
      
    })
      .then(response => response.json())
      .then(data => {
        console.log('Producto actualizado:', data);
        setProduct(updatedProduct);
        navigate('/');
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
      });
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="product-detail">
      <h3>Detalles del producto:</h3>
      <form className="formulario-detail" onSubmit={handleUpdate}>
        <h2>Formulario de edicion</h2>
        <p>ID: {product.id}</p>
        <p>
          Nombre:
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Categoría:
          <select
            name="categoryId"
            value={categoryId}
            onChange={handleCategoryChange}
            
          >
            <option value="">Seleccione una categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </p>
        <p>
          Precio:
          <input
            type="text"
            name="price"
            value={price}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Descripción:
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Imagen:
          <input
            type="file"
            name="imagen"
            onChange={handleInputChange}
          />
        </p>
       {/*  {product.imagen && (
          <img
            src={`http://localhost:3000/images/${product.imagen}`}
            style={{ width: '200px' }}
            alt={product.name}
          />
        )} */}
        <button type="submit">Guardar cambios</button>
      </form>
      <div className='botoncito-volver'>
      <Link className= "botoncito" to={`/`}>Volver al Dashboard</Link>
      </div>
      
    </div>
  );
};

export default ProductDetail;