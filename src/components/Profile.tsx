import styled from "@emotion/styled";
import { Space, Typo } from "@solved-ac/ui-react";
import { IconStarFilled } from "@tabler/icons-react";
import { Profile as ProfileType } from "../types/types";
import Rating from "./Rating";
import Trophy from "./Trophy";
import { courseRankName, courseRankTextColor } from "../utils/course";
import { classRankName, classRankTextColor } from "../utils/class";

const ProfileRow = styled.div`
  display: flex;
  gap: 16px;
`;

const ProfileImage = styled.img`
  display: block;
  width: 96px;
  height: 96px;
`;

const ProfileLayout = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: space-between;
`;

const TrophyContainer = styled.div`
  min-width: 0;
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: 240px;
  max-width: 100%;
`;

const NameAndRating = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: baseline;
  justify-content: space-between;
  font-size: 160%;

  @media (max-width: 640px) {
    font-size: 140%;
  }
  @media (max-width: 480px) {
    font-size: 120%;
  }
`;

const Name = styled.span`
  display: block;
  font-weight: 800;
`;

const Metadata = styled.div`
  padding-left: ${96 + 16}px;
  display: flex;
  align-items: stretch;
  gap: 16px;

  @media (max-width: 640px) {
    gap: 8px;
  }
  @media (max-width: 480px) {
    padding-left: 0;
  }
`;

const MetadataDivider = styled.div`
  flex: 0 0 1px;
  width: 1px;
  background-color: ${({ theme }) => theme.color.border};
`;

const MetadataItem = styled.div`
  flex: 1;
  min-width: 0;
  max-width: 120px;
`;

const MetadataValue = styled.div`
  font-weight: 600;
`;

interface Props {
  profile: ProfileType;
}

const Profile = ({ profile }: Props) => {
  const {
    profileImageSrc,
    trophy,
    name,
    rating,
    stars,
    courseRank,
    classRank,
  } = profile;
  return (
    <>
      <ProfileRow>
        <ProfileImage src={profileImageSrc} />
        <ProfileLayout>
          <TrophyContainer>
            <Trophy trophy={trophy} />
          </TrophyContainer>
          <NameAndRating>
            <Name>{name}</Name>
            <Rating rating={rating} />
          </NameAndRating>
        </ProfileLayout>
      </ProfileRow>
      <Space h={16} />
      <Metadata>
        <MetadataItem>
          <Typo description small>
            단위
          </Typo>
          <br />
          <MetadataValue
            style={{
              color: courseRankTextColor(courseRank),
            }}
          >
            {courseRankName(courseRank)}
          </MetadataValue>
        </MetadataItem>
        <MetadataDivider />
        <MetadataItem>
          <Typo description small>
            CLASS
          </Typo>
          <br />
          <MetadataValue
            style={{
              color: classRankTextColor(classRank),
            }}
          >
            {classRankName(classRank)}
          </MetadataValue>
        </MetadataItem>
        <MetadataDivider />
        <MetadataItem>
          <Typo description small>
            투어 멤버
          </Typo>
          <br />
          <MetadataValue>
            <IconStarFilled size="0.7em" color="#f0b91b" /> &times; {stars}
          </MetadataValue>
        </MetadataItem>
      </Metadata>
    </>
  );
};

export default Profile;
