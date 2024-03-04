import { createBrowserRouter } from "react-router-dom";
// import Home from "./components/Home";
import { AsyncHome, AsyncLogin, AsyncCheckout } from "./layout";
import Layout from "./components/Layout";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <AsyncHome />
            },
            {
                path: '/checkout',
                element: <AsyncCheckout />
            }
        ] 
    },
    {
        path: '/login',
        element: <AsyncLogin />
    }
])

export default router;