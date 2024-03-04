import React, {lazy, Suspense} from "react";
import Loading from "./Loading";

const withPageLoader = (Component) => {
    return function EnhancedComponent () {
        return (
            <Suspense fallback ={<Loading />}>
                <Component />
            </Suspense>
        )
    }
}

const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'))
const Checkout = lazy(() => import('./Checkout'))

export const AsyncHome = withPageLoader(Home);
export const AsyncLogin = withPageLoader(Login);
export const AsyncCheckout = withPageLoader(Checkout);