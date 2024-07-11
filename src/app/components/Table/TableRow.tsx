import React from 'react';
import styled from 'styled-components';

export interface Props {
  onClick?: () => void;
  id?: string;
  children: React.ReactNode;
  index: number;
}

type TableRowWrapperProps = {
  index: number;
};

export const TableRowWrapper = styled.div<TableRowWrapperProps>`
  box-sizing: border-box;
  flex: 1 1 100%;

  ${({ index }) => (index % 2 == 0 ? 'background-color: #323C50' : 'background-color: #2C3446')};
  border: 1px solid black;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: row;
  cursor: pointer;

  &:hover {
    background-color: #5f9ea0;
  }
`;

const ContentWrapper = styled.div<Partial<Props>>`
  height: 3.375rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1 1 100%;
  align-items: center;
  margin: 0 1rem;
`;

const TableRow: React.FC<Props> = ({ children, onClick, id, index }) => (
  <TableRowWrapper onClick={onClick} id={id} index={index}>
    <ContentWrapper>{children}</ContentWrapper>
  </TableRowWrapper>
);

export default TableRow;
