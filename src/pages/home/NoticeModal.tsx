import { Box, Typography, MenuItem, useTheme } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import useNoticeQuery from '@api/queries/notice/useNoticeQuery';
import dayjs from 'dayjs';
import { NoticeCategory, Notice } from '@model/Notice';
import Dialog from '@components/Dialog';
import {
  SearchContainer,
  SearchPaper,
  HeaderGrid,
  StyledAccordion,
  StyledAccordionSummary,
  AccordionDetailsContent,
  NoResultBox,
  ContentContainer,
  DialogStyle,
  StyledSelect,
  selectMenuProps,
  StyledTextField,
  StyledIconButton,
} from './NoticeModal.styled';

interface NoticeModalProps {
  noticeModalOpen: boolean;
  setNoticeModalOpen: (open: boolean) => void;
}

const NoticeModal = ({ noticeModalOpen, setNoticeModalOpen }: NoticeModalProps) => {
  const theme = useTheme();
  const [expandedNotice, setExpandedNotice] = useState<string | false>(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchParams, setSearchParams] = useState({ keyword: '', category: '전체' });

  const { data: notices } = useNoticeQuery(
    {
      keyword: searchParams.keyword.trim(),
      category: searchParams.category === '전체' ? undefined : searchParams.category,
    },
    {
      enabled: noticeModalOpen,
    },
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const noticeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (scrollTarget) {
      const timeoutId = setTimeout(() => {
        const container = containerRef.current;
        const element = noticeRefs.current[scrollTarget];

        if (container && element) {
          const headerHeight = 48;
          const containerRect = container.getBoundingClientRect();
          const scrollPosition =
            element.offsetTop - containerRect.top + container.scrollTop - headerHeight;

          container.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
          });
        }
        setScrollTarget(null);
      }, 200);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [scrollTarget]);

  useEffect(() => {
    if (!noticeModalOpen) {
      setSearchKeyword('');
      setSearchParams({
        keyword: '',
        category: '전체',
      });
    }
  }, [noticeModalOpen]);

  const handleSearchKeyword = () => {
    setSearchParams({
      ...searchParams,
      keyword: searchKeyword,
    });
    setExpandedNotice(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchKeyword();
    }
  };

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedNotice(isExpanded ? panel : false);
      if (isExpanded) {
        setScrollTarget(panel);
      }
    };

  const handleCloseModal = () => {
    setNoticeModalOpen(false);
    setExpandedNotice(false);
  };

  const getCategoryText = (category: string) => {
    return NoticeCategory[category as keyof typeof NoticeCategory] || category;
  };

  const hasNotices = (notices: unknown): notices is Notice[] => {
    return Boolean(notices && Array.isArray(notices) && notices.length > 0);
  };

  const NoticeContent = (
    <ContentContainer ref={containerRef} hasNotices={hasNotices(notices)}>
      <SearchContainer>
        <StyledSelect
          data-testid='category-select'
          value={searchParams.category}
          onChange={(e) => {
            setSearchParams({ ...searchParams, category: e.target.value as string });
            setExpandedNotice(false);
          }}
          size='small'
          MenuProps={selectMenuProps}
        >
          <MenuItem value='전체'>전체</MenuItem>
          {(Object.entries(NoticeCategory) as [string, string][]).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </StyledSelect>
        <SearchPaper
          onClick={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSearchKeyword();
          }}
          className={isSearchActive ? 'active' : ''}
        >
          <StyledTextField
            data-testid='search-input'
            size='small'
            placeholder='검색어 입력'
            value={searchKeyword}
            onChange={(value) => setSearchKeyword(value)}
            onKeyDown={handleKeyDown}
          />
          <StyledIconButton data-testid='search-button' type='button' onClick={handleSearchKeyword}>
            <SearchIcon />
          </StyledIconButton>
        </SearchPaper>
      </SearchContainer>

      <HeaderGrid>
        <Typography variant='body1'></Typography>
        <Typography variant='body1'>분류</Typography>
        <Typography variant='body1'>제목</Typography>
        <Typography variant='body1'>작성일시</Typography>
        <Typography variant='body1'>작성자</Typography>
      </HeaderGrid>

      <Box data-testid='notice-list'>
        {hasNotices(notices) ? (
          notices.map((notice) => (
            <StyledAccordion
              key={notice.noticeId}
              data-testid={`notice-${notice.noticeId}`}
              ref={(el) => {
                noticeRefs.current[notice.noticeId] = el;
              }}
              expanded={expandedNotice === notice.noticeId}
              onChange={handleAccordionChange(notice.noticeId)}
            >
              <StyledAccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: `${theme.palette.action.active}` }} />}
              >
                <Box sx={{ width: 24 }} />
                <Typography data-testid='notice-category' variant='body1'>
                  {getCategoryText(notice.category)}
                </Typography>
                <Typography data-testid='notice-title' variant='body1'>
                  {notice.title}
                </Typography>
                <Typography data-testid='notice-date' variant='body1'>
                  {dayjs(notice.lastUpdateDatetime).format('YYYY-MM-DD HH:mm:ss')}
                </Typography>
                <Typography variant='body1'>{notice.author}</Typography>
              </StyledAccordionSummary>
              <AccordionDetailsContent data-testid='notice-content'>
                <Typography variant='body1'>{notice.content}</Typography>
              </AccordionDetailsContent>
            </StyledAccordion>
          ))
        ) : (
          <NoResultBox data-testid='no-results'>
            <Typography variant='body1'>조회 결과가 없습니다.</Typography>
          </NoResultBox>
        )}
      </Box>
    </ContentContainer>
  );

  return (
    <Dialog
      open={noticeModalOpen}
      title='공지사항'
      content={NoticeContent}
      closeLabel='닫기'
      onClose={handleCloseModal}
      hasHeaderCloseIcon={false}
      size='xlarge'
      sx={DialogStyle}
    />
  );
};

export default NoticeModal;
