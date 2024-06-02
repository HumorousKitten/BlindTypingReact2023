import React from "react";
import AboutBlock from "../../Components/About/AboutBlock";
import Header from "../../Components/Header/Header";
const About = ({server, token}) => {
    return (
      <>
        <Header server={server} token={token} />
        <AboutBlock />
      </>
    );
}
 
export default About;