import styled from "styled-components";

export const FormBlock = styled.div`
  box-sizing: border-box;
  font-variant: tabular-nums;
  list-style: none;
  width: 100%;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-image: none;
  display: inline-block;
  width: "100%"
  margin: 0;
  padding: 0;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 11px;
  text-align: left;
  border: 0;
  border-radius: 2px;
  outline: 0;
`;

export const FormSelect = styled.select`
  width: 100%;
  margin: 0;
  padding: 4px 22px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  outline: none;
`;
