import { Outlet } from "react-router";
import Header from "../Header/Header";

export default function Ecommerce() {
    return <div>
        <Header/>
        <Outlet/>
        
        
    </div>
}