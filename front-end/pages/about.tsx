
import Header from "../components/header"
import styles from '@styles/home.module.css';
import Guide_Dashboard from "../components/Home/Guide.home";
const About : React.FC = () => {


    return (
        <main className="">
          <Header/>
          
          <Guide_Dashboard/>
        </main>
      )

}

export default About;