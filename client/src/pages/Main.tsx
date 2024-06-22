import Dropdown from '@/components/common/Dropdown';
import styled from 'styled-components';
import UserProfile from '@/components/UserProfile/UserProfile';
import SubBox from '@/components/quests/SubBox';
import WeekCalendar from '@/components/common/WeekCalendar';
import { useSubQuest } from '@/hooks/useSubQuest';
import Loading from '@/components/common/Loading';
import MainBox from '@/components/quests/MainBox';
import { BiNotepad } from 'react-icons/bi';
import { useMainQuest } from '@/hooks/useMainQuest';
import CreateQuestButton from '@/components/CreateQuestButton';
import { useEffect, useState } from 'react';
import { UserInfo } from '@/models/userInfo.model';
import { useQuery } from '@tanstack/react-query';
import { USER } from '@/constant/queryKey';
import { getUserInfo } from '@/api/users.api';

const Main = () => {
  const { quest, isSubLoading } = useSubQuest();
  const { mainQuest, isMainLoading, date } = useMainQuest();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const { data: userInfoData, refetch } = useQuery<UserInfo>({
    queryKey: [...USER.GET_USERINFO],
    queryFn: () => getUserInfo(),
  });

  useEffect(() => {
    if (userInfoData) {
      setUserInfo(userInfoData);
    }
  }, [userInfoData]);

  return (
    <MainStyle>
      <header>
        <Dropdown />
        <WeekCalendar />
      </header>
      <main>
        <UserProfile userInfo={userInfo} />
        <section>
          <header className="questTitle">
            <BiNotepad />
            <h2>Main Quest</h2>
            <CreateQuestButton pageUrl="/createquest" />
          </header>
          <div>
            {mainQuest?.length ? (
              mainQuest?.map((content) => (
                <MainBox
                  key={content.id}
                  content={content}
                  date={date}
                  refetchMainBoxData={refetch}
                />
              ))
            ) : isMainLoading ? (
              <Loading />
            ) : (
              <p>등록된 메인 퀘스트가 없습니다</p>
            )}
          </div>
        </section>
        <section>
          <header className="questTitle">
            <BiNotepad />
            <h2>Sub Quest</h2>
            <CreateQuestButton modalName="subQuest" />
          </header>
          <div>
            {quest?.length ? (
              quest.map((content) => <SubBox key={content.id} content={content} />)
            ) : isSubLoading ? (
              <Loading />
            ) : (
              <p>등록된 서브 퀘스트가 없습니다</p>
            )}
          </div>
        </section>
      </main>
    </MainStyle>
  );
};

const MainStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  .questTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
  }
`;

export default Main;
