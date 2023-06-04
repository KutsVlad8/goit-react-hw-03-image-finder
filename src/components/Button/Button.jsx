import { Btn } from './Button.styled';

export const LoadMore = ({ onClick }) => {
  return (
    <Btn type="button" onClick={onClick}>
      Load more
    </Btn>
  );
};
