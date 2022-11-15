import React from "react";
import NavbarHome from "../Components/NavbarHome";
import HomePageList from "../Components/HomePageList";

const HomePage = () => {
    return (
        <div>
            <div> 
                <NavbarHome />
            </div>
            <HomePageList />
        </div>
    )
}

export default HomePage;