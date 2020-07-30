import styled from 'styled-components';
import { colors } from '../../config/colors';

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: ${colors.lightGrey}
  .logo {
    width: 60px;
  }
`;

const FloatingIcon = styled.div`
    position:fixed;
    bottom:40px;
	  right:40px;
    border-radius: 50%;
    width:30px;
    height: 30px;
    background-color:red;
    display:flex;
    justify-content: center;
    align-items:center;
    i.fa-bell {
      font-size:18px; font-family: FontAwesome; color: ${colors.white}; font-style: normal;}
   }`
export { Header, FloatingIcon };