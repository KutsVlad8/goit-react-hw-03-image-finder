import styled from '@emotion/styled';

export const GalleryList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const TextContainer = styled.div`
  width: 450px;

  padding: 15px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;

  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.3) 4px 4px 8px 3px;
`;

export const Text = styled.p`
  margin: 0;
  text-align: center;
`;
