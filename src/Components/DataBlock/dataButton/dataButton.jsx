import React from "react";

const DataButton = ({ textField, userData, sendToServer, isSuccess }) => {
  const { login, password, email } = userData;
  const button = React.useRef(null)
  const [textStatus, setTextStatus] = React.useState(textField);
  React.useEffect(()=>{
    if(isSuccess.isSuccess){
      button.current.style.background = '#0066FF';
      setTextStatus(isSuccess.text)
    }
    if(isSuccess.isSuccess === false){
      button.current.style.background = '#FF0C46'
      setTextStatus(isSuccess.text);
    }
  }, [isSuccess])
  async function data() {
    if (!login) {
      return sendToServer(email, password);
    }
    sendToServer(login, password, email);
  }

  return (
    <button
      style={{
        background: '#0066FF',
        borderRadius: '11px',
        color: 'white',
        height: '42px',
        fontWeight: '700',
        marginBottom: '9px',
      }}
      ref = {button}
      onClick={data}
    >
      {textStatus}
    </button>
  );
};
 
export default DataButton;