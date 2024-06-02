import React from "react";
import AttributesOfKeyBlocks from "./AttributesOfKeyBlocks";

const KeyBoardBlock = ({pressedKey, transferStr, transfer, mistakes, deleteDublicatesOfArray}) => {
    const lettersArr = [
        "`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace",
        "Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","Backslash",
        "CapsLock","A","S","D","F","G","H","J","K","L",";","'","Enter",
        "ShiftLeft","Z","X","C","V","B","N","M",",",".","?","ShiftRight",
        "Space"
		];

    const { correct, requiredKey, pressingKey, keyNext } = pressedKey
    
	
		React.useEffect(() => {
			let str = transferStr;
      const firstSymbol = (str.length !==0 ) && getId(transformToKeyCode(str[0]))
			if(str.length !== 0 && !transfer.endTyping)
        firstSymbol.style.border = '2px solid grey'
      else if(transfer.endTyping && mistakes.current.indexOf(firstSymbol) >= 0)
        firstSymbol.style.border = '2px solid red';

      return () => {
        if(str.length !== 0) firstSymbol.style.border = "none"
      }
		}, [transferStr])
	
    React.useEffect(() => {
      return () => {
        let withoutDublicates = deleteDublicatesOfArray(mistakes.current);
        withoutDublicates.forEach((item) => {
          if (getId(item)) {
            getId(item).style.border = 'none';
          }
        });   
      };
    }, [])


		React.useEffect(() => {
      if (pressingKey === 'reset') {
        !keyNext
          ? (getId(requiredKey).style.border = 'none')
          : (getId(keyNext).style.border = 'none');
        getId('Key' + transferStr[0].toUpperCase()).style.border =
          '2px solid grey';
        return;
      }

      if (pressingKey !== 'Backspace' && !transfer.endTyping)
        nextKeyCap(correct, requiredKey, keyNext);

      if (pressingKey === 'Backspace') {
        document.getElementById(keyNext).style.border = 'none';
        document.getElementById(requiredKey).style.border = '2px solid grey';
      }

      if (correct) {
        getId(pressingKey).style.background = '#070707';

        setTimeout(() => {
          getId(pressingKey).style.background = '#1B1B1B';
          getId(pressingKey).style.transition = '0.1s';
        }, 300);
      }

      if (correct === false) {
        mistakes.current.push(pressingKey)
        getId(pressingKey).style.border = '2px solid red'

        setTimeout(() => {
          getId(pressingKey).style.border = 'none'
          getId(pressingKey).style.transition = '0.1s'
        }, 300);
        return;
      }
    }, [keyNext, requiredKey, pressingKey, pressedKey.index]);
	
		function getId(elem) {
			return document.getElementById(elem)
		}
	
    function transformToKeyCode(symbol) {
      if (symbol === ' ' || symbol === '\r' || symbol === '\n') return 'Space';
      if (symbol === '`') return 'Backquote';
      if (symbol === '-') return 'Minus';
      if (symbol === '=') return 'Equal';
      if (symbol === '[') return 'BracketLeft';
      if (symbol === ']') return 'BracketRight';
      if (symbol === ';') return 'Semicolon';
      if (symbol === "'") return 'Quote';
      if (symbol === ',') return 'Comma';
      if (symbol === '.') return 'Period';
      if (symbol === '?') return 'Slash';
      if (!isNaN(symbol)) return 'Digit' + symbol;
      else {
        return 'Key' + symbol.toUpperCase();
      }
    }

		function nextKeyCap(correct, requiredKey, keyNext) {
			if (correct !== null) {
				getId(requiredKey).style.border = 'none'
				getId(keyNext).style.border = '2px solid grey'
			}
		}
	
    return (
			<AttributesOfKeyBlocks letters={lettersArr} />
    );
}
 
export default KeyBoardBlock;