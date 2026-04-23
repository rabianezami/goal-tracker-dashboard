import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import calculateChartData from '../../hooks/calculateChartData';

export default function Chart({ goals = [] }) {
  const { t } = useTranslation('categories');
  const isRTL = i18next.language === 'fa';
  const chartData = calculateChartData(goals);

  if (!chartData) {
    return <Typography>{t('noGoals')}</Typography>;
  }

  if (chartData === 'not-started') {
    return <Typography>Goal has not started yet</Typography>;
  }

  return (
    <Box>
      <Typography sx={{ color: 'primary.light', textAlign: 'center', my: 2 }} variant="h4">
        {t('chart.title')}
      </Typography>
      
      <LineChart
        xAxis={[
          {
            id: 'days',
            data: chartData.labels,
            scaleType: 'point',
            disableTicks: true, 
            label: isRTL ? 'روزهای ماه' : 'Days Of Month',
          },
        ]}
        series={[
          {
            data: chartData.progressData,
            label: isRTL ? 'پیشرفت' : 'Progress',
            color: '#4a90e2',
            area: true,
            curve: 'natural',
            valueFormatter: (value) => `${value}%`,
          },
        ]}
        height={350}
        margin={{ left: 60, right: 20, top: 20, bottom: 40 }} 
        yAxis={[
          {
            max: 100,
            min: 0,
            label: isRTL ? 'اهداف' : 'Goals', 
          },
        ]}
        
        sx={{
          '& .MuiChartsAxis-line': { stroke: 'transparent' },
          '& .MuiChartsAxis-tick': { stroke: 'transparent' },
          
          // 2. Make background grid lines very faint and modern
          '& .MuiChartsGrid-line': {
            stroke: 'rgba(0,0,0,0.05)',
            strokeDasharray: '4 4',
          },
          
         
          '& .MuiAreaElement-root': {
            fill: 'url(#dribbbleGradient) !important',
          },
          
          //  glowing top wave line
          '& .MuiLineElement-root': {
            strokeWidth: '4px !important',
            stroke: 'url(#glowingStroke) !important',
            filter: 'drop-shadow(0px 6px 8px rgba(74, 144, 226, 0.3))',
          },
          
          '& .MuiMarkElement-root': {
            display: 'none !important',
          },
        }}
      >
        <defs>
          {/* Neon glowing stroke */}
          <linearGradient id="glowingStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#4a90e2" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          
          {/* Semi-transparent fade underneath (Glassmorphism effect) */}
          <linearGradient id="dribbbleGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a90e2" stopOpacity={0.25} />
            <stop offset="60%" stopColor="#4a90e2" stopOpacity={0.05} />
            <stop offset="100%" stopColor="#4a90e2" stopOpacity={0.0} />
          </linearGradient>
        </defs>
      </LineChart>
    </Box>
  );
}
