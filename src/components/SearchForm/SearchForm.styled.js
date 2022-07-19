import styled from "@emotion/styled";
import { Field, Form } from 'formik';

export const FormikForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;

  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`

export const Btn = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;

  color: black;
  border: 0;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;

  :hover {
    opacity: 1;
  }
`

export const Input = styled(Field)`
  display: inline-block;
  width: 100%;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;

  ::placeholder {
    font-size: 18px;
  }
`