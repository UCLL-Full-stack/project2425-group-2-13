
import Header from "../components/header"
import styles from '@styles/home.module.css';
import Login from "../components/Login/login";
import Footer from "../components/Footer/footer"
const login : React.FC = () => {


    return (
        <main className="">
          <Header/>
          <div className="flex-grow">
          <Login/>
          </div>
          <Footer />
        </main>
        
      )

}

export default login;