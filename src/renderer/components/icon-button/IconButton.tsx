import { ReactNode } from 'react';
import { ActionIcon, ActionIconProps, TooltipProps } from '@mantine/core';
import { Tooltip } from '../tooltip/Tooltip';

interface IconButtonProps extends ActionIconProps<'button'> {
  active?: boolean;
  icon: ReactNode;
  tooltip?: Omit<TooltipProps, 'children'>;
}

export const IconButton = ({
  active,
  tooltip,
  icon,
  ...rest
}: IconButtonProps) => {
  if (tooltip) {
    return (
      <Tooltip {...tooltip}>
        <ActionIcon {...rest}>{icon}</ActionIcon>
      </Tooltip>
    );
  }

  return <ActionIcon {...rest}>{icon}</ActionIcon>;
};

IconButton.defaultProps = {
  active: false,
  tooltip: undefined,
};
