import KeyBlock from "./KeyBlock/KeyBlock";
import {styles} from "./KeyStyles";
import cl from "./_KeyBoard.module.scss";

const AttributesOfKeyBlocks = ({ letters }) => {
	const slash = "\\";

	return (
		<div className={cl.KeyBoardBlock}>
			{letters.map((item) => {
				if (item === '`') {
					return (
						<KeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id = "Backquote"
						/>
					);
				}
				if (item === '-') {
					return (
						<KeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id = "Minus"
						/>
					);
				}
				if (item === '=') {
					return (
						<KeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id = "Equal"
						/>
					);
				}
				if (item === '[') {
					return (
						<KeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id = "BracketLeft"
						/>
					);
				}
				if (item === ']') {
					return (
						<KeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id = "BracketRight"
						/>
					);
				}
				if (item === ';') {
					return (
						<KeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id = "Semicolon"
						/>
					);
				}
				if (item === "'") {
					return (
						<KeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id = "Quote"
						/>
					);
				}
				if (item === ",") {
					return (
						<KeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id = "Comma"
						/>
					);
				}
				if (item === ".") {
					return (
						<KeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id = "Period"
						/>
					);
				}
				if (item === "?") {
					return (
						<KeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id = "Slash"
						/>
					);
				}
				if(item === 'Backspace'){
					return (
						<KeyBlock
							key={item}
							styles={styles.backSpace}
							elem='<-'
							id = {item}
						/>
					);
				}
				if(item === 'Backslash'){
					return (
						<KeyBlock
							key={item}
							styles={styles.slash}
							elem={slash}
							id = {item}
						/>
					);
				}
				if(item === 'Tab'){
					return (
						<KeyBlock
							key={item}
							styles={styles.tab}
							elem="tab"
							id = {item}
						/>
					);
				}
				if(item === 'CapsLock'){
					return (
						<KeyBlock
							key={item}
							styles={styles.caps}
							elem="caps"
							id = {item}
						/>
					);
				}
				if(item === 'Enter'){
					return (
						<KeyBlock
							key={item}
							styles={styles.enter}
							elem="enter"
							id = {item}
						/>
					);
				}
				if (item === 'ShiftLeft') {
					return (
						<KeyBlock
							key={item}
							styles={styles.leftShift}
							elem='shift'
							id = {item}
						/>
					);
				}
				if(item === 'ShiftRight'){
					return (
						<KeyBlock
							key={item}
							styles={styles.rightShift}
							elem='shift'
							id = {item}
						/>
					);
				}
				if (item === 'Space') {
					return (
						<KeyBlock
							key={item}
							styles={styles.space}
							elem=''
							id = {item}
						/>
					);
				}
				if (item === 'F' || item === 'J'){
					return (
						<KeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id = {"Key" + item}
							helpfulRecess={{
								width: '15px',
								height: '2px',
								background: 'rgba(139, 139, 139, 0.5)',
								position: 'absolute',
								bottom: '7px',
								left: '17px',
								borderRadius: '2px',
							}}
						/>
					);
				}
				if (!isNaN(item) && item) {
					return (
						<KeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id = {"digit" + item}
						/>
					);
				}
				return (
					<KeyBlock
						key={item}
						styles={styles.identical}
						elem={item}
						id = {"Key" + item}
					/>
				);
			})}
		</div>
	);
}
export default AttributesOfKeyBlocks;