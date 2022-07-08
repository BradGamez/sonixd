import { ReactNode } from 'react';
import {
  Text as MantineText,
  TextProps as MantineTextProps,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Font } from 'renderer/styles';
import { textEllipsis } from 'renderer/styles/mixins';

interface TextProps extends MantineTextProps<'div'> {
  children: ReactNode;
  font?: Font;
  link?: boolean;
  noSelect?: boolean;
  overflow?: 'hidden' | 'visible';
  secondary?: boolean;
  to?: string;
  weight?: number;
}

interface LinkTextProps extends MantineTextProps<'Link'> {
  children: ReactNode;
  font?: Font;
  link?: boolean;
  overflow?: 'hidden' | 'visible';
  secondary?: boolean;
  to: string;
  weight?: number;
}

const BaseText = styled(MantineText)<any>`
  color: ${(props) =>
    props.$secondary
      ? 'var(--playerbar-text-secondary-color)'
      : 'var(--playerbar-text-primary-color)'};
  font-family: ${(props) => props.font || Font.GOTHAM};
  cursor: ${(props) => (props.link ? 'cursor' : 'default')};
  user-select: ${(props) => (props.$noSelect ? 'none' : 'auto')};
  ${(props) => props.overflow === 'hidden' && textEllipsis}
`;

const StyledText = styled(BaseText)<TextProps>``;

const StyledLinkText = styled(BaseText)<LinkTextProps>``;

export const Text = ({
  children,
  link,
  secondary,
  overflow,
  font,
  to,
  noSelect,
  ...rest
}: TextProps) => {
  if (link) {
    return (
      <StyledLinkText<typeof Link>
        $noSelect={noSelect}
        $secondary={secondary}
        component={Link}
        font={font}
        link="true"
        overflow={overflow}
        to={to || ''}
        {...rest}
      >
        {children}
      </StyledLinkText>
    );
  }

  return (
    <StyledText
      $noSelect={noSelect}
      $secondary={secondary}
      font={font}
      overflow={overflow}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

Text.defaultProps = {
  font: Font.GOTHAM,
  link: false,
  noSelect: false,
  overflow: 'visible',
  secondary: false,
  to: '',
  weight: 500,
};
