import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Welcome from "./pages/welcome/Welcome";
import MainPage from "./pages/mainpage/MainPage";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Home/>,
        children:[
            {
                path:"",
                element: <Welcome/>
            },
            {
                path:"home",
                element: <MainPage/>
            }
        ]
    }
]);