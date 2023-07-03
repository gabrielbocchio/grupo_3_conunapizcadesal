import { useState, useEffect } from 'react';
import "../users/LastUser.css"

const LasProduct = () => {
  const [lasProduct, setLasProduct] = useState();

  useEffect(() => {
    fetch('http://localhost:3000/productDetail/api/products')
      .then(response => response.json())
      .then(data => setLasProduct(data.slice(-1)[0]));
  }, []);

  if (!lasProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="box">
        <h2 className="title">El último producto creado fue: &nbsp;{lasProduct.name} &nbsp; ${lasProduct.price}</h2> 
        
        
     
      </div>
    </div>
  );
};

export default LasProduct;