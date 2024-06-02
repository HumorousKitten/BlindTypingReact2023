import React from "react";
import { useNavigate } from "react-router-dom";
import Datablock from "../../Components/DataBlock/DataBlock";

const AutorizationPage = ({ server, setDataOfUser, transfer, setTransferData, changeImg, setChangeImg }) => {
  const navigate = useNavigate();
  const catAnimation = React.useRef(null);
  const [userData, setUserData] = React.useState({
    password: '',
    email: '',
  });

  const [isSuccessData, setSuccessData] = React.useState({
    isSuccess: null,
    text: '',
    color: '',
  });


  const types = {
    'E-mail': 'email',
    Password: 'password',
  };

  async function sendToServer(email, password) {
    const answer = await server.login(email, password);
    if (answer) {
      setDataOfUser((prev) => {
        return {
          token: prev.token = server.readCookie('token'),
        };
      });
      setSuccessData({ isSuccess: true, text: 'Успешно' });
      setTransferData((prev)=>{return {...prev, timerIsActive: prev.timerIsActive = false}})
      catAnimation.current = false
      setTimeout(() => {
        navigate('/');
      }, 1000);
      return;
    }
    setSuccessData({ isSuccess: false, text: 'Неверный логин или пароль', color: '#FF0C46' });
  }

  return (
    <>
      <Datablock
        types={types}
        title='Добро Пожаловать!'
        textField='Войти'
        questionSpan='Ещё нет аккаунта?'
        action='Зарегистрируйтесь'
        link='/registration'
        setUserData={setUserData}
        userData={userData}
        sendToServer={sendToServer}
        isSuccess={isSuccessData}
        transfer={transfer}
        setTransferData={setTransferData}
        catAnimation = {catAnimation}
      />
    </>
  );
};
 
export default AutorizationPage;