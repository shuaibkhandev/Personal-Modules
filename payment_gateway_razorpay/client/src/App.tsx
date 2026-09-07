import {useSelector} from "react-redux";
import './App.css'

function App() {
  const products = useSelector((state: any) => state.products.items);
  console.log(products);

  return (
   <div>
      <h1>Products</h1>

      {products.map((product: any) => (
        <div key={product.id}>
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default App
