import { RotatingLines } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export const Loader = () => (
  <LoaderContainer>
    <RotatingLines strokeColor="#3f51b5" />
  </LoaderContainer>
);
