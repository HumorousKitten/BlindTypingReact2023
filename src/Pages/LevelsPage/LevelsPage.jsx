import LevelsBlock from "../../Components/levelsBlock/LevelsBlock";
import Header from "../../Components/Header/Header";

const LevelsPage = ({ server, transfer, token }) => {
  return (
    <>
      <Header server={server} token={token}/>
      <LevelsBlock server={server} transfer={transfer} token = {token}/>
    </>
  );
};
 
export default LevelsPage;