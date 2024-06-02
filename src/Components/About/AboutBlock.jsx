import React from "react";
import ContactButton from "./ContactButton/ContactButton";
import { HandySvg } from 'handy-svg';
import discord from "../../img/icons/discord.svg";
import telegram from "../../img/icons/TG.svg";
import exit from '../../img/icons/close cross.svg';
import cl from "./_AboutBlock.module.scss";

const AboutBlock = () => {
    return (
      <div className={cl.AboutBlock}>
        <div className={cl.titleBlock}>
          <h2>О нас</h2>
          <HandySvg
            src={exit}
            width='24'
            height='24'
            style={{position: "relative", left:"245px"}}
          />
        </div>

        <p>
          Данный сайт является учебной практикой двух студентов, которые только
          встали на путь изучения web - программирования.
        </p>
        <p>
          Мы открыты для любых идей и рекомендаций о нашем сервисе и его
          функциях. Отправьте нам свои пожелания и мы с радостью вам ответим!
        </p>

        <div className={cl.contacts}>
            <ContactButton
              img={<HandySvg src={discord} width='20' height='14' />}
              contact='zahar'
            />
            <ContactButton
              img={<HandySvg src={discord} width='20' height='14' />}
              contact='dexter'
            />
            <ContactButton
              img={<HandySvg src={telegram} width='17' height='14' />}
              contact='Kyznechik99'
            />
            <ContactButton
              img={<HandySvg src={telegram} width='17' height='14' />}
              contact='Vlad_kx'
            />
          
        </div>
      </div>
    );
}
 
export default AboutBlock;