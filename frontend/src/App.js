
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

/**import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Profile from './components/Profile';
import Reset from './components/Reset';

/**root routes*/

const router = createBrowserRouter([
  {
    path:'/',
    element:<Username></Username>
  },
  {
    path:'/register',
    element:<Register></Register>

  },
  {
      path:'/password',
      element:<Password></Password>

  },
  {

      path:'/profile',
      element:<Profile></Profile>

  },
  {
      path:'/recovery',
      element:<Recovery></Recovery>
  },
  {
      path:'/reset',
      element:<Reset></Reset>

  }
])




function App() {
  return (
    <main>

      <RouterProvider router={router}>

     </RouterProvider>
     
    </main>
)}

export default App;






