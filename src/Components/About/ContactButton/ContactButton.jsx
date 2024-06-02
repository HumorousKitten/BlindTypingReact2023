import React from "react";
import cl from "./_ContactButton.module.scss";

const ContactButton = ({img, contact}) => {
    const [link, setLink] = React.useState()
		function ourContacts(e){
			// if(e.target.textContent === 'zahar')
			// 	setLink('https://discordapp.com/users/zahar97')
			// if(e.target.textContent === 'dexter')
			// 	setLink('https://discordapp.com/users/DEXTER')
			if(e.target.textContent === 'Kyznechik99')
				setLink('tg://resolve?domain=cotiara_Dev')
			if(e.target.textContent === 'Vlad_kx')
				setLink('tg://resolve?domain=Vlad_kx');
		}

    return (
        <a href = {link} className={cl.ContactButton} onClick = {ourContacts}  target="_blank" rel="noreferrer" >
            {img}
            {contact}
        </a>
    );
}
 
export default ContactButton;