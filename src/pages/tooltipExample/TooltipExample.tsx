import { Button, Typography } from '@mui/material';
import Tooltip from '@components/Tooltip';
import {
  TooltipExampleContainer,
  TooltipWrapper,
} from '@pages/tooltipExample/TooltipExample.styled';

const TooltipExample = () => {
  return (
    <TooltipExampleContainer>
      <Typography variant='h4' gutterBottom>
        Tooltip 컴포넌트 예시
      </Typography>

      <TooltipWrapper>
        <Tooltip title='This is a tooltip' direction='up'>
          <Button variant='outlined'>Up</Button>
        </Tooltip>

        <Tooltip title='This is a tooltip' direction='down'>
          <Button variant='outlined'>Down</Button>
        </Tooltip>

        <Tooltip title='This is a tooltip' direction='left'>
          <Button variant='outlined'>Left</Button>
        </Tooltip>

        <Tooltip title='This is a tooltip' direction='right'>
          <Button variant='outlined'>Right</Button>
        </Tooltip>

        <Tooltip title='This is a tooltip' direction='none'>
          <Button variant='outlined'>None</Button>
        </Tooltip>
      </TooltipWrapper>

      <TooltipWrapper>
        <Tooltip
          title='This is a tooltip with a very long text that spans multiple lines to demonstrate how the tooltip handles long content.'
          direction='up'
        >
          <Button variant='outlined'>Long Text - Up</Button>
        </Tooltip>

        <Tooltip
          title='This is a tooltip with a very long text that spans multiple lines to demonstrate how the tooltip handles long content.'
          direction='down'
        >
          <Button variant='outlined'>Long Text - Down</Button>
        </Tooltip>

        <Tooltip
          title='This is a tooltip with a very long text that spans multiple lines to demonstrate how the tooltip handles long content.'
          direction='left'
        >
          <Button variant='outlined'>Long Text - Left</Button>
        </Tooltip>

        <Tooltip
          title='This is a tooltip with a very long text that spans multiple lines to demonstrate how the tooltip handles long content.'
          direction='right'
        >
          <Button variant='outlined'>Long Text - Right</Button>
        </Tooltip>

        <Tooltip
          title='This is a tooltip with a very long text that spans multiple lines to demonstrate how the tooltip handles long content.'
          direction='none'
        >
          <Button variant='outlined'>Long Text - None</Button>
        </Tooltip>
      </TooltipWrapper>
    </TooltipExampleContainer>
  );
};

export default TooltipExample;
