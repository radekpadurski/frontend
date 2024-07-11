import React from 'react';
import styled from 'styled-components';

export interface Props {
  text: string;
  flex: string;
}

const TableCellWrapper = styled.div<Pick<Props, 'flex'>>`
  display: flex;
  flex-direction: column;
  min-width: 0;
  ${({ flex }) => flex && `flex: ${flex}`};
`;

const Typography = styled.span`
  whitespace: nowrap;
  color: white;
`;

const TableCell: React.FC<Props> = ({ text, flex }) => (
  <TableCellWrapper flex={flex}>
    <Typography>{text}</Typography>
  </TableCellWrapper>
);

export default TableCell;
