import React from "react";
import cl from "./_Datainfo.module.scss";
const DataINFO = ({ type, placeholder, setUserData }) => {
  const element = React.useRef();

  function inpValue(){
    if(element.current.type === 'text'){
      setUserData((actual) => {
        return { ...actual, login: (actual.login = element.current.value) };
      });
    }
    if (element.current.type === 'email') {
      setUserData((actual) => {
        return { ...actual, email: (actual.email = element.current.value) };
      });
    }
    if (element.current.type === 'password') {
      setUserData((actual) => {
        return { ...actual, password: (actual.password = element.current.value) };
      });
    }
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={cl.dataInfo}
      ref={element}
      autoComplete='off'
      onChange={inpValue}
    />
  );
};
 
export default DataINFO;