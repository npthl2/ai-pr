import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { NoticeCategory } from '@model/Notice';
import useNoticeSummaryQuery from '@api/queries/notice/useNoticeSummaryQuery';
import {
  NoticeContainer,
  NoticePaper,
  NoticeContentStack,
  NoticeTitleTypography,
} from './Notice.styled';

interface NoticeProps {
  setNoticeModalOpen: (open: boolean) => void;
}

const Notice = ({ setNoticeModalOpen }: NoticeProps) => {
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const { data: notices } = useNoticeSummaryQuery();

  const handleNoticeClick = () => {
    setNoticeModalOpen(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (notices && Array.isArray(notices)) {
        setCurrentNoticeIndex((prev) => (prev + 1) % notices.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [notices]);

  const getCategoryText = (category: string) => {
    return NoticeCategory[category as keyof typeof NoticeCategory] || category;
  };

  return (
    <NoticeContainer>
      <NoticePaper onClick={handleNoticeClick}>
        {notices && Array.isArray(notices) ? (
          <>
            <NoticeContentStack direction='row' spacing={2} alignItems='center'>
              <Typography variant='h5'>
                {`📣 ${getCategoryText(notices[currentNoticeIndex].category)}`}
              </Typography>

              <NoticeTitleTypography>
                <Typography variant='body1'>{notices[currentNoticeIndex].title}</Typography>
              </NoticeTitleTypography>
            </NoticeContentStack>
            <Typography variant='body1'>
              {dayjs(notices[currentNoticeIndex].lastUpdateDatetime).format('YYYY-MM-DD')}
            </Typography>
          </>
        ) : (
          <Typography variant='body1'>등록된 공지가 없습니다.</Typography>
        )}
      </NoticePaper>
    </NoticeContainer>
  );
};

export default Notice;
