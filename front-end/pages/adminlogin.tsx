
import Header from "../components/header"
import styles from '@styles/home.module.css';
import AdminLogin from "../components/Login/adminlogin";
import Footer from "../components/Footer/footer"
const login : React.FC = () => {


    return (
        <main className="">
          <Header/>
          <div className="flex-grow">
          <AdminLogin/>
           </div>
          <Footer />
        </main>
      )

}

export default login;