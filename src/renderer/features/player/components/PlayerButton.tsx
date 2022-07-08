import { ReactNode } from 'react';
import {
  TooltipProps,
  UnstyledButton,
  UnstyledButtonProps,
} from '@mantine/core';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { Tooltip } from 'renderer/components';

interface PlayerButtonProps extends UnstyledButtonProps<'button'> {
  icon: ReactNode;
  tooltip?: Omit<TooltipProps, 'children'>;
  variant: 'main' | 'secondary';
}

const WrapperMainVariant = css`
  margin: 0 0.5rem;
`;

type MotionWrapperProps = { variant: PlayerButtonProps['variant'] };

const MotionWrapper = styled(motion.div)<MotionWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ variant }) => variant === 'main' && WrapperMainVariant};
`;

const ButtonMainVariant = css`
  padding: 0.5rem;
  background: var(--playerbar-btn-color);
  border-radius: 50%;

  svg {
    display: flex;
    fill: black;
    stroke: black;
  }

  &:hover {
    background: var(--playerbar-btn-color-hover);
  }

  &:focus-visible {
    background: var(--playerbar-btn-color-hover);
  }
`;

const ButtonSecondaryVariant = css`
  padding: 0.5rem;

  svg {
    display: flex;
    fill: var(--playerbar-btn-color);
    stroke: var(--playerbar-btn-color);
  }

  &:hover {
    svg {
      fill: var(--playerbar-btn-color-hover);
      stroke: var(--playerbar-btn-color-hover);
    }
  }

  &:focus-visible {
    svg {
      fill: var(--playerbar-btn-color-hover);
      stroke: var(--playerbar-btn-color-hover);
    }
  }
`;

type StyledPlayerButtonProps = Omit<PlayerButtonProps, 'icon'>;

const StyledPlayerButton = styled(UnstyledButton)<StyledPlayerButtonProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  overflow: visible;
  all: unset;
  cursor: default;

  button {
    display: flex;
  }

  &:focus-visible {
    outline: 1px var(--primary-color) solid;
  }

  &:disabled {
    opacity: 0.5;
  }

  ${({ variant }) =>
    variant === 'main' ? ButtonMainVariant : ButtonSecondaryVariant}
`;

export const PlayerButton = ({
  tooltip,
  variant,
  icon,
  ...rest
}: PlayerButtonProps) => {
  if (tooltip) {
    return (
      <Tooltip {...tooltip}>
        <MotionWrapper variant={variant}>
          <StyledPlayerButton variant={variant} {...rest}>
            {icon}
          </StyledPlayerButton>
        </MotionWrapper>
      </Tooltip>
    );
  }

  return (
    <MotionWrapper variant={variant}>
      <StyledPlayerButton variant={variant} {...rest}>
        {icon}
      </StyledPlayerButton>
    </MotionWrapper>
  );
};

PlayerButton.defaultProps = {
  tooltip: undefined,
};
