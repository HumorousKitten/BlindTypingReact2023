const KeyBlock = ({ styles, elem, helpfulRecess, id}) => {
  return (
    <div style={styles} id = {id}>
      {elem}
      <div style={helpfulRecess}></div>
    </div>
  );
};
 
export default KeyBlock;