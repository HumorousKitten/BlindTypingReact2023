import React from "react";
import { useNavigate } from "react-router-dom";
import { HandySvg } from 'handy-svg';
import avatarIcon from '../../../img/icons/avatar.svg';
import exit from "../../../img/icons/close cross.svg";
import edit from "../../../img/icons/rename.svg";

import cl from "./_HeaderAccount.module.scss";

const HeaderAccount = ({data}) => {
    const {server, token} = data
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const navigate = useNavigate()

    React.useEffect(()=>{
      (async()=>{
        const {login, email} = await server.getUserData(token)
        setUserName(login)
        setEmail(email)
      })()
    }, [])

    function toMainPage(e){
      navigate("/")
    }

    function exitFromAccount(){
      document.cookie = `token=; max-age=-1`;
      navigate('/autorization')
    }

    return (
      <div className={cl.HeaderAccount}>
        <HandySvg src={avatarIcon} width='71' height='71' />
        <div className={cl.data}>
          <div>
            <span>{userName}</span>
            <HandySvg src={edit} width='13.5' height='13.5' onClick={exitFromAccount}/>
          </div>
          <span>{email}</span>
        </div>
        <HandySvg
          src={exit}
          width='24'
          height='24'
          style={{ position: 'relative', left: '320px' }}
          onClick={toMainPage}
        />
      </div>
    );
}
 
export default HeaderAccount;