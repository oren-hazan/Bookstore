import React from 'react';
import './custom-input.styles.css';

const CustomInput = (props) => {

	return (
		<div className='input-container'>
			<input
				onInput={props.onInput}
				className={props.inputClassName}
				type={props.type}
				id={props.id}
				placeholder={props.placeholder}
				name={props.name}
				required={props.required}
			/>
			{!props.isValid && (
				<div className='error-message'>{props.errorMessage}</div>
			)}
		</div>
	);
};

export default CustomInput;
