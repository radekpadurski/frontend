import { styled } from 'styled-components';

interface Props {
  color?: string;
}

const Typography = styled.span<Props>`
  whitespace: nowrap;
  ${({ color }) => (color ? `color: ${color}` : 'color: white')};
`;

export default Typography;
