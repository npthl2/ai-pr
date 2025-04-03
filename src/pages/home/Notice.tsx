import { Box, Paper, Stack, Badge, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

interface NoticeProps {
  setNoticeModalOpen: (open: boolean) => void;
}

const Notice = ({ setNoticeModalOpen }: NoticeProps) => {
  const theme = useTheme();
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  const notices = [
    {
      id: '1',
      category: '시스템',
      title: '시스템 점검 안내 (3/21 금 23시~3/22 토 01시)',
      date: '2025-03-21 11:28:33',
      author: '홍길*',
      content: `안녕하세요, 고객님.
저희 시스템에 대한 중요한 공지를 드립니다.

유지보수 작업 안내
일정: 2025년 3월 30일 (일) 02:00 ~ 06:00 (KST)
내용: 시스템 성능 향상 및 보안 강화를 위한 정기 유지보수 작업이 진행됩니다.
영향: 작업 시간 동안 시스템 이용이 불가능하거나 일시적인 장애가 발생할 수 있습니다.

서비스 변경 사항
변경 내용: 서비스 안정성 향상을 위해 일부 기능이 업데이트됩니다.
시작일: 2025년 4월 1일 (화)부터 적용됩니다. 

이용에 불편을 드려 죄송합니다. 빠르게 작업을 완료하여 더 나은 서비스로 찾아뵙겠습니다.
감사합니다. 
R&R팀 드림`,
      isNew: true,
    },
    {
      id: '2',
      category: '공지',
      title: '3월 시스템 만족도 조사 안내',
      date: '2025-03-20 15:45:22',
      author: '김철*',
      content: '3월 시스템 만족도 조사를 실시합니다...',
      isNew: true,
    },
    {
      id: '3',
      category: '이벤트',
      title: '봄맞이 특별 프로모션 안내',
      date: '2025-03-19 09:15:47',
      author: '이영*',
      content: '봄맞이 특별 프로모션을 안내드립니다...',
      isNew: false,
    },
    {
      id: '4',
      category: '공지',
      title: '신규 요금제 출시 안내',
      date: '2025-03-18 14:30:11',
      author: '박지*',
      content: '신규 요금제가 출시되었습니다...',
      isNew: false,
    },
    {
      id: '5',
      category: '시스템',
      title: '시스템 업데이트 완료 안내',
      date: '2025-03-17 17:20:55',
      author: '최민*',
      content: '시스템 업데이트가 완료되었습니다...',
      isNew: false,
    },
  ];

  const handleNoticeClick = () => {
    setNoticeModalOpen(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNoticeIndex((prev) => (prev + 1) % notices.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box>
      <Paper
        onClick={handleNoticeClick}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: '12px 24px',
          bgcolor: `${theme.palette.primary.light}`,
          borderRadius: '10px',
          color: `${theme.palette.primary.contrastText}`,
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
      >
        <Stack direction='row' spacing={2} alignItems='center' sx={{ flex: 1 }}>
          <Badge color='error' variant='dot' invisible={!notices[currentNoticeIndex].isNew}>
            <Typography variant='body2' fontWeight={700}>
              {notices[currentNoticeIndex].category}
            </Typography>
          </Badge>
          <Typography variant='body2' sx={{ flex: 1 }}>
            {notices[currentNoticeIndex].title}
          </Typography>
        </Stack>
        <Typography variant='body2' color='rgba(255, 255, 255, 0.7)'>
          {notices[currentNoticeIndex].date}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Notice;
