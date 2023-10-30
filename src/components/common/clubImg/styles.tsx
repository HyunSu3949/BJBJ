import styled from 'styled-components';
import DefaultClubImg from '../../../assets/image/empty_img.svg';
import DefaultClubImgBig from '../../../assets/image/empty_img_big.svg';

export const Img = styled.img`
  width: 280;
  height: 200px;
  object-fit: cover;
`;

export const BasigClubImg = styled(DefaultClubImg)`
  width: 280;
  height: 200px;
`;
export const BasigClubImgBig = styled(DefaultClubImgBig)`
  width: 430px;
  height: 360px;
`;
