import {
  Box,
  Paper,
  Stack,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Fade,
  IconButton,
  InputBase,
  MenuItem,
  Modal,
  Select,
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

interface NoticeModalProps {
  noticeModalOpen: boolean;
  setNoticeModalOpen: (open: boolean) => void;
}

const NoticeModal = ({ noticeModalOpen, setNoticeModalOpen }: NoticeModalProps) => {
  const [expandedNotice, setExpandedNotice] = useState<string | false>(false);
  const [searchCategory, setSearchCategory] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');

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

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedNotice(isExpanded ? panel : false);
    };

  const filteredNotices = notices.filter((notice) => {
    const categoryMatch = searchCategory === '전체' || notice.category === searchCategory;
    const keywordMatch =
      !searchKeyword ||
      notice.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchKeyword.toLowerCase());
    return categoryMatch && keywordMatch;
  });

  const handleCloseModal = () => {
    setNoticeModalOpen(false);
  };

  return (
    <Modal
      open={noticeModalOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Fade in={noticeModalOpen}>
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: 1,
            boxShadow:
              '0px 9px 46px 8px rgba(0, 0, 0, 0.12), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 11px 15px -7px rgba(0, 0, 0, 0.2)',
            width: '100%',
            maxWidth: 1000,
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: '16px 24px',
              borderBottom: '1px solid #E5E8EB',
            }}
          >
            <Typography variant='h6' fontWeight={700} fontSize={20}>
              공지사항
            </Typography>
            <IconButton
              onClick={handleCloseModal}
              sx={{
                color: '#868F99',
                '&:hover': {
                  color: '#272E35',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: 3, flex: 1, overflow: 'auto' }}>
            <Stack direction='row' spacing={2} mb={3}>
              <Select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                size='small'
                sx={{
                  width: 150,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D1D6DA',
                  },
                }}
              >
                <MenuItem value='전체'>전체</MenuItem>
                <MenuItem value='시스템'>시스템</MenuItem>
                <MenuItem value='공지'>공지</MenuItem>
                <MenuItem value='이벤트'>이벤트</MenuItem>
              </Select>
              <Paper
                component='form'
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 220,
                  border: '1px solid #D1D6DA',
                  borderRadius: 1,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='검색어 입력'
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <IconButton type='button' sx={{ p: '10px', color: '#868F99' }}>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr 200px 100px',
                bgcolor: '#F7F9FA',
                p: '12px 16px',
                borderTop: '1px solid #D1D6DA',
                mb: 1,
              }}
            >
              <Typography variant='body2' color='#272E35'>
                분류
              </Typography>
              <Typography variant='body2' color='#272E35'>
                제목
              </Typography>
              <Typography variant='body2' color='#272E35'>
                작성일시
              </Typography>
              <Typography variant='body2' color='#272E35'>
                작성자
              </Typography>
            </Box>

            <Stack spacing={1}>
              {filteredNotices.map((notice) => (
                <Accordion
                  key={notice.id}
                  expanded={expandedNotice === notice.id}
                  onChange={handleAccordionChange(notice.id)}
                  sx={{
                    border: '1px solid #E5E8EB',
                    '&:before': { display: 'none' },
                    borderRadius: '4px',
                    boxShadow: 'none',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#868F99' }} />}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '100px 1fr 200px 100px',
                      alignItems: 'center',
                      px: 2,
                      '& .MuiAccordionSummary-content': {
                        margin: 0,
                        display: 'contents',
                      },
                    }}
                  >
                    <Typography variant='body2'>{notice.category}</Typography>
                    <Typography variant='body2'>{notice.title}</Typography>
                    <Typography variant='body2' color='#6E7782'>
                      {notice.date}
                    </Typography>
                    <Typography variant='body2' color='#6E7782'>
                      {notice.author}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 4, py: 2, bgcolor: '#FAFAFA' }}>
                    <Typography
                      variant='body2'
                      sx={{
                        whiteSpace: 'pre-line',
                        color: '#272E35',
                      }}
                    >
                      {notice.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: '12px 24px 24px',
              borderTop: '1px solid #E5E8EB',
            }}
          >
            <Button
              variant='outlined'
              onClick={handleCloseModal}
              sx={{
                color: '#272E35',
                borderColor: '#D1D6DA',
                '&:hover': {
                  borderColor: '#868F99',
                  bgcolor: 'transparent',
                },
              }}
            >
              닫기
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NoticeModal;
