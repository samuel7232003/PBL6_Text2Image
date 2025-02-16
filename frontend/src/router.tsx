import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Welcome from "./pages/welcome/Welcome";
import MainPage from "./pages/mainpage/MainPage";
import Test from "./pages/test/Test";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Home/>,
        children:[
            {
                path:"",
                element: <Test/>
            },
            {
                path:"home",
                element: <MainPage/>
            }
        ]
    }
]);