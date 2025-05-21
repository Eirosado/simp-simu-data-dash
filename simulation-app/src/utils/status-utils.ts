import { SimulationData } from '../types/simu-data-types';

export const statusColors: Record<SimulationData["status"], string> = {
  "completed": "#4CAF50", 
  "running": "#2196F3",     
  "failed": "#F44336",      
  "pending": "#FFD700"      
};

export const statusIcons: Record<SimulationData["status"], React.ReactNode> = {
  "completed": "✅",
  "running": "🔄",
  "failed": "❌",
  "pending": "⏳"
};