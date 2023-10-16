import React from "react";
import styled from "styled-components";

interface RadioButtonProps {
  label: string;
  groupName: string;
}

const RadioButtonContainer = styled.div`
  input[type="radio"] {
    display: none;
  }

  label {
    cursor: pointer;
    display: inline-block;
    min-width: 8.8rem;
    text-align: center;
    font-size: var(--text-s);
    padding: 0.7rem 1.7rem;
    border-radius: 4px;
  }

  label:hover {
    box-shadow: inset 0 0 10px rgba(149, 149, 149, 0.3);
  }

  input[type="radio"]:checked + label {
    background-color: var(--point-color);
    color: var(--gray-900);
  }
`;

const RadioButton: React.FC<RadioButtonProps> = ({label, groupName}) => {
  return (
    <RadioButtonContainer>
      <input type="radio" id={label} name={groupName} />
      <label htmlFor={label}>{label}</label>
    </RadioButtonContainer>
  );
};

export default RadioButton;
