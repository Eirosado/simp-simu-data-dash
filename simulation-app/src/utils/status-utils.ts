import { SimulationData } from '../types/simu-data-types';
import { green, blue, red, yellow } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export const statusColors: Record<SimulationData["status"], string> = {
  "completed": green[500], 
  "running": blue[500],      
  "failed": red[500],       
  "pending": yellow[700]    
};

export const statusIcons: Record<SimulationData["status"], React.FC> = {
  "completed": CheckCircleIcon,
  "running": AutorenewIcon,
  "failed": ErrorIcon,
  "pending": HourglassEmptyIcon
};

