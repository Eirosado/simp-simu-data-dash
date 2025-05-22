import { green, blue, red, yellow } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { statusColors, statusIcons } from '../../utils/status-utils';

describe('statusColors', () => {
  it('should return correct colors for each status', () => {
    expect(statusColors.completed).toBe(green[500]);
    expect(statusColors.running).toBe(blue[500]);
    expect(statusColors.failed).toBe(red[500]);
    expect(statusColors.pending).toBe(yellow[700]);
  });
});

describe('statusIcons', () => {
  it('should return correct icons for each status', () => {
    expect(statusIcons.completed).toBe(CheckCircleIcon);
    expect(statusIcons.running).toBe(AutorenewIcon);
    expect(statusIcons.failed).toBe(ErrorIcon);
    expect(statusIcons.pending).toBe(HourglassEmptyIcon);
  });
});