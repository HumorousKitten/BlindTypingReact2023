import React from "react";
import HeaderAccount from "./HeaderAccount/HeaderAccount";
import Results from "./Results/Results";
import cl from "./_AccountBlock.module.scss";


const AccountBlock = ({data}) => {

    return (
        <div className={cl.AccountBlock}>
            <HeaderAccount data = {data}/>
            <Results data = {data}/>
        </div>
    );
}
 
export default AccountBlock;