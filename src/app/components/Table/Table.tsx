import React from 'react';
import styled from 'styled-components';

interface Props {
  headersText: string[];
  flexSize: number[];
  children: React.ReactNode;
}

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: inherit;
  flex: 1 1 auto;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  background-color: transparent;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;
  padding: 8px 16px;
`;

const RowsWrapper = styled.div`
  row-gap: 0.5rem;
  display: flex;
  flex-direction: column;
  z-index: 0;

  overflow-y: overlay;
  overflow-x: hidden;
`;

type TypographyWrapperProps = {
  flexSize: number;
};

const TypographyWrapper = styled.div<TypographyWrapperProps>`
  display: flex;
  ${({ flexSize }) => flexSize && `flex: 1 0 ${flexSize}%`};
`;

const Typography = styled.p`
  whitespace: nowrap;
  color: white;
`;

const Table: React.FC<Props> = ({ headersText, flexSize, children }) => (
  <ComponentWrapper>
    <HeaderWrapper>
      {headersText.map((header, index) => (
        <TypographyWrapper key={`TypographyWrapper-${index}`} flexSize={flexSize[index]}>
          <Typography key={index}>{header}</Typography>
        </TypographyWrapper>
      ))}
    </HeaderWrapper>
    <RowsWrapper>{children}</RowsWrapper>
  </ComponentWrapper>
);

export default Table;
