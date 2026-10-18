import { useRoutes } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import Pages from "./views/Pages";
import Builder from "./views/Builder";
import Preview from "./views/Preview";

export default function App() {
  return useRoutes([
    {
      'path':'/register',
      'element':<Register/>
    },  
    {
      'path':'/',
      'element':<Login/>
    },
    {
      'path':'/pages',
      'element':<Pages/>
    },
    {
      'path':`/pages/:slug/builder`,
      'element':<Builder/>
    },
    {
      'path':`/pages/:slug/preview`,
      'element':<Preview/>
    },
    {
      'path': "login",
      'element': <Login />,
    },
  ]);
}
