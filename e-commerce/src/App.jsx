
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Home from './components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Products from './components/Products/Products.jsx'
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'

let routers = createBrowserRouter([{
  path:'' , element : <Layout/>,children:[
    {index: true , element: <Home/>},
    {path:'home' , element: <Home/>},
    {path:'cart' , element: <Cart/>},
    {path:'brands' , element: <Brands/>},
    {path:'categories' , element: <Categories/>},
    {path:'categories/:category' , element: <Categories/>},
    {path:'products' , element: <Products/>},
    {path:'products/:id' , element: <ProductDetails/>},
    {path:'*' , element: <NotFound/>},
  ]
}])
function App() {

  return <>

    <RouterProvider router={routers}></RouterProvider>

  </>
}

export default App
