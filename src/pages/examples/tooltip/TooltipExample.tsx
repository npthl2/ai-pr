import { Button, Typography } from '@mui/material';
import Tooltip from '@components/Tooltip';
import {
  TooltipExampleContainer,
  TooltipWrapper,
} from '@pages/examples/tooltip/TooltipExample.styled';

const TooltipExample = () => {
  return (
    <TooltipExampleContainer>
      <Typography variant='h4' gutterBottom>
        Tooltip 컴포넌트 예시
      </Typography>

      <TooltipWrapper>
        <Tooltip
          title='[TOP-START] This is a tooltip. It provides additional information about the element it is attached to.'
          placement='top-start'
          arrow
        >
          <Button variant='text'>TOP-START</Button>
        </Tooltip>
        <Tooltip
          title='[TOP] This is a tooltip. It provides additional information about the element it is attached to.'
          placement='top'
          arrow
        >
          <Button variant='text'>TOP</Button>
        </Tooltip>
        <Tooltip
          title='[TOP-END] This is a tooltip. It provides additional information about the element it is attached to.'
          placement='top-end'
          arrow
        >
          <Button variant='text'>TOP-END</Button>
        </Tooltip>

        <Tooltip
          title='[LEFT-START] This is a tooltip. It provides additional information about the element it is attached to.'
          placement='left-start'
          arrow
        >
          <Button variant='text'>LEFT-START</Button>
        </Tooltip>
        <Tooltip
          title='[LEFT] This is a tooltip. It provides additional information about the element it is attached to.'
          placement='left'
          arrow
        >
          <Button variant='text'>LEFT</Button>
        </Tooltip>
        <Tooltip
          title='[LEFT-END] This is a tooltip. It provides additional information about the element it is attached to.'
          placement='left-end'
          arrow
        >
          <Button variant='text'>LEFT-END</Button>
        </Tooltip>

        <Tooltip
          title='[RIGHT-START] This is a tooltip. It provides additional information about the element it is attached to.'
          placement='right-start'
          arrow
        >
          <Button variant='text'>RIGHT-START</Button>
        </Tooltip>
        <Tooltip
          title='[RIGHT] This is a tooltip. It provides additional information about the element it is attached to.'
          placement='right'
          arrow
        >
          <Button variant='text'>RIGHT</Button>
        </Tooltip>
        <Tooltip
          title='[RIGHT-END] This is a tooltip. It provides additional information about the element it is attached to.'
          placement='right-end'
          arrow
        >
          <Button variant='text'>RIGHT-END</Button>
        </Tooltip>

        <Tooltip
          title='[BOTTOM-START] This is a tooltip. It provides additional information about the element it is attached to.'
          placement='bottom-start'
          arrow
        >
          <Button variant='text'>BOTTOM-START</Button>
        </Tooltip>
        <Tooltip
          title='[BOTTOM] This is a tooltip. It provides additional information about the element it is attached to.'
          placement='bottom'
          arrow
        >
          <Button variant='text'>BOTTOM</Button>
        </Tooltip>
        <Tooltip
          title='[BOTTOM-END] This is a tooltip. It provides additional information about the element it is attached to.'
          placement='bottom-end'
          arrow
        >
          <Button variant='text'>BOTTOM-END</Button>
        </Tooltip>
      </TooltipWrapper>
    </TooltipExampleContainer>
  );
};

export default TooltipExample;
