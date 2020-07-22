import styled from 'styled-components';
import {colors} from '../../config/colors';

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: ${colors.lightGrey}
  .logo {
    width: 60px;
  }
`;

export {Header};