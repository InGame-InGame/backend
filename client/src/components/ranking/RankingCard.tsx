import styled from 'styled-components';
import { profileURL } from '@/shared/dummy';
import { RankingItem } from '@/models/ranking.model';

interface RankingCardProps extends RankingItem {}

const RankingCard = ({ nickname, point, rank, level }: RankingCardProps) => {
  return (
    <>
      <RankingCardStyle>
        <div className="rpContainer">
          <div className="rank">{rank}</div>
          <div className="rProfile">
            <img src={profileURL} alt="" />
          </div>
        </div>
        <div className="nlContainer">
          <h2 className="nickname">{nickname}</h2>
          <div className="lpContainer">
            <p className="level">LV {level}</p>
            <p className="point">P {point}</p>
          </div>
        </div>
      </RankingCardStyle>
    </>
  );
};

const RankingCardStyle = styled.div`
  width: 100%;
  height: 61px;

  background: ${({ theme }) => theme.color.white};
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
  border-radius: ${({ theme }) => theme.borderRadius.small};

  display: flex;
  align-items: center;
  padding: 10px;
  font-size: ${({ theme }) => theme.font.xsmall};
  margin-bottom: 5px;
  cursor: pointer;

  .rpContainer {
    width: 80px;
    display: flex;
    align-items: center;
    gap: 25px;
  }

  .rank {
    font-size: ${({ theme }) => theme.font.medium};
    font-weight: bold;
    padding-left: 10px;
  }

  .rProfile {
    width: 30px;
    height: 30px;
  }

  .rProfile img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .nlContainer {
    margin-left: 10px;
    width: 233px;
    display: flex;
    flex-direction: column;
  }

  .nickname {
    margin-bottom: 5px;
  }

  .lpContainer {
    display: flex;
    justify-content: space-between;
  }
`;

export default RankingCard;
