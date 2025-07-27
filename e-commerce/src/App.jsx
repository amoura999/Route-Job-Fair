
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Categories from './Components/Categories/Categories.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'

let routers = createBrowserRouter([{
  path:'' , element : <Layout/>,children:[
    {index: true , element: <Home/>},
    {path:'home' , element: <Home/>},
    {path:'categories' , element: <Categories/>},
    {path:'categories/:category' , element: <Categories/>},
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
