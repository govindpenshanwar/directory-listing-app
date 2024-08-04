import React from 'react'
import AllProductsPage from './Components/AllProducts/AllProductsPage'
import AddNewProductPage from './Components/AddNewProduct/AddNewProductPage'
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div >
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(51,65,85)",
            color: "white",
          },
        }}
      />
      <AddNewProductPage />
      <AllProductsPage />
    </div>
  )
}

export default App
