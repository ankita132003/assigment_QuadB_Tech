import './App.css';
import Home from './Components/Home';
import Summary from './Components/Summary';
import { RouterProvider } from "react-router";
import router from "./Router";
function App() {
  return (
    <>
     <RouterProvider router={router}>
      <Home/>
      <Summary/>
     </RouterProvider>
    
    </>
  );
}
export default App;
