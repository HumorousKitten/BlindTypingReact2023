import React from "react";
import { useNavigate } from "react-router-dom";
import Datablock from "../../Components/DataBlock/DataBlock";

const Registration = ({server, transfer, changeImg, setChangeImg, setTransferData}) => {
    const [userData, setUserData] = React.useState({
      login: '',
      password: '',
      email: '',
    });
    const navigate = useNavigate()
    const catAnimation = React.useRef(null);
    const [isSuccessData, setSuccessData] = React.useState({
      isSuccess: null,
      text: "",
      color: "",
    })

    const types = {
      Login: 'text',
      "E-mail": 'email',
      Password: 'password',
    };

    async function sendToServer(login, password, email) {
      if(await server.registration(login, password, email)){
        setSuccessData({isSuccess: true, text: "Успешно"})
        setTransferData((prev) => {
          return { ...prev, timerIsActive: (prev.timerIsActive = false) };
        });
        catAnimation.current = false
        setTimeout(()=>{
          navigate("/autorization")
        }, 1000)
        return 
      }
      setSuccessData({isSuccess: false, text: "Ваш аккаунт существует", color: "#FF0C46"})
    }

    return (
      <>
        <Datablock
          types={types}
          title='Регистрация'
          textField='Создать аккаунт'
          questionSpan='Уже есть аккаунт?'
          action='Войдите здесь'
          link='/autorization'
          setUserData={setUserData}
          userData={userData}
          sendToServer={sendToServer}
          isSuccess={isSuccessData}
          transfer={transfer}
          changeImg={changeImg}
          setChangeImg={setChangeImg}
          setTransferData={setTransferData}
          catAnimation={catAnimation}
        />
      </>
    );
}
 
export default Registration;