
import Header from "../components/header"
import Home_Content from "../components/Home/home";
import Footer from "../components/Footer/footer"

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Home_Content />

      </div>
      <Footer />
    </div>
  );
};

export default Home;
