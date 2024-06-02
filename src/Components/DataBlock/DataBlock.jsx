import React from 'react';
import { Link } from 'react-router-dom';
import DataINFO from './DataInfo/Datainfo';
import DataButton from './dataButton/dataButton';
import AnimatedCat from '../AnimatedCat/AnimatedCat';
import cl from './_DataBlock.module.scss';

const Datablock = ({
  types,
  title,
  textField,
  questionSpan,
  action,
  link,
  setUserData,
  userData,
  sendToServer,
  isSuccess,
  transfer,
  setTransferData,
  catAnimation
}) => {

  React.useEffect(() => {
      setTransferData((prev) => {
        return { ...prev, timerIsActive: (prev.timerIsActive = true) };
      });
      catAnimation.current = true
  }, []);

  return (
    <>
      <div className={cl.dataBlock}>
        <AnimatedCat
          transfer={transfer}
          style={{ position: 'absolute', left: '180px', zIndex: '-1' }}
          stopAnimate={catAnimation}
        />
        <h2>{title}</h2>
        {Object.keys(types).map((item) => {
          return (
            <DataINFO
              key={types[item]}
              type={types[item]}
              placeholder={item}
              setUserData={setUserData}
            />
          );
        })}
        <DataButton
          textField={textField}
          userData={userData}
          title={title}
          sendToServer={sendToServer}
          isSuccess={isSuccess}
        />
        <div>
          <span>{questionSpan}</span>
          <Link
            to={link}
            style={{
              color: '#0066FF',
              textDecorationLine: 'underline',
              fontSize: '0.75rem',
            }}
          >
            {action}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Datablock;
