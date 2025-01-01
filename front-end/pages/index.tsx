
import Header from "../components/header"
import Admin_Dashboard from "../components/Home/Admin.home";
import Footer from "../components/Footer/footer"
import Guide_Dashboard from "../components/Home/Guide.home";
import Tourist_Dashboard from "../components/Home/Tourist.home";
import React,{ useEffect, useState } from "react";

const Home: React.FC = () => {

 

  const [adminlogged, Setadminlogged] = useState(false);
  const [touristlogged, Settouristlogged] = useState(false);
  const [guideLogged, SetguideLogged] = useState(false);

  useEffect(() => {
    
  const admin = sessionStorage.getItem("admin_email");
  const guide = sessionStorage.getItem("guide_email");
  const tourist = sessionStorage.getItem("tourist_email");

    if (admin) {
      Setadminlogged(true);
    }
    if (guide) {
      SetguideLogged(true);
    }
    if (tourist) {
      Settouristlogged(true);
    }
  }, []);


  return (

    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow">
        {adminlogged && <Admin_Dashboard/>}
        {guideLogged && <Guide_Dashboard/>}
        {touristlogged && <Tourist_Dashboard/>}

        

      </div>
      <Footer />
    </div>
  );
};

export default Home;
