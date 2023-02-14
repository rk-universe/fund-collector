import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
 
}
  body {
    background: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    width: 100vw;
    margin: 0;
    padding: 0;
    transition: all 0.25s linear;
  }
  `