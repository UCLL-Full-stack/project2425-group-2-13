
import TourGuideRegistration from "@/components/Registration/registration";
import Header from "../components/header"
import styles from '@styles/home.module.css';
import Footer from "../components/Footer/footer"
const Signup : React.FC = () => {


    return (
        <main className="">
          <Header/>
          <div className="flex-grow">
          <TourGuideRegistration/>
          </div>
          <Footer />
        </main>
      )

}

export default Signup;