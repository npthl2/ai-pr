import { useState } from 'react';
import { Typography } from '@mui/material';
import Notice from './Notice';
import NoticeModal from './NoticeModal';
import NewServices from './NewServices';
import SalesPerformance from './SalesPerformance';
import Promotion from './Promotion';
import TodayContracts from './TodayContracts';
import {
  ContentLayout,
  ContentWrapper,
  HomeContainer,
  LeftColumn,
  MainContent,
  RightColumn,
  UserName,
} from './Home.styled';
import useMemberStore from '@stores/MemberStore';

const Home = () => {
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [currentNoticeId, setCurrentNoticeId] = useState<string | null>(null);
  const memberInfo = useMemberStore((state) => state.memberInfo);

  const handleNoticeClick = (noticeId: string) => {
    setCurrentNoticeId(noticeId);
    setNoticeModalOpen(true);
  };

  return (
    <HomeContainer data-testid='home-content'>
      <ContentWrapper>
        <Typography variant='h1' data-testid='welcome-message'>
          {memberInfo && (
            <UserName data-testid='user-name'>
              {`${memberInfo.memberName} `}
              {`${memberInfo.classOfPosition}님, `}
            </UserName>
          )}
          오늘도 좋은 하루 보내세요 🙌
        </Typography>

        <MainContent>
          <Notice onNoticeClick={handleNoticeClick} />

          <ContentLayout>
            <LeftColumn>
              {/* 오늘의 신규가입 */}
              <TodayContracts />
              {/* 내 실적 */}
              <SalesPerformance />
            </LeftColumn>

            <RightColumn>
              {/* 프로모션 */}
              <Promotion />
              {/* 새로나온 요금제/부가서비스 */}
              <NewServices />
            </RightColumn>
          </ContentLayout>
        </MainContent>

        <NoticeModal
          noticeModalOpen={noticeModalOpen}
          setNoticeModalOpen={setNoticeModalOpen}
          initialNoticeId={currentNoticeId}
        />
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
