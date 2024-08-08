import styled from "@emotion/styled";
import { Space, Typo } from "@solved-ac/ui-react";
import {
  IconArrowBadgeUpFilled,
  IconCircleDotted,
  IconDiscountCheckFilled,
  IconUsers,
} from "@tabler/icons-react";
import STAMP from "../db/stamp.json";
import { Fragment } from "react/jsx-runtime";
import { stampColor } from "../utils/stamp";
import { SONG_DATABASE } from "../const/songDatabase";
import {
  difficultyBackgroundColor,
  difficultySortWeight,
} from "../utils/difficulty";
import LevelGradientText from "./commons/LevelGradientText";
import { wanpaku } from "../styles/fonts/wanpaku";
import { MUSIC_DX_URL, MUSIC_STD_URL } from "../const/chartType";
import { ellipsis } from "polished";

const { latestVersion, tracks } = SONG_DATABASE;

const incomplete = STAMP.filter((stamp) => !stamp.complete);

const partners = incomplete.filter((stamp) => stamp.type === "partner");

const songs = incomplete
  .filter((stamp) => stamp.type === "music")
  .map((stamp) => {
    const songCandidates = tracks.filter((x) =>
      x.jacketKey ? stamp.image.includes(x.jacketKey) : x.title === stamp.title
    );
    const songLatestVersion = songCandidates.reduce(
      (acc, song) => Math.max(acc, song.version),
      -1
    );
    const songWithLatestVersion = songCandidates
      .filter((x) => x.version === songLatestVersion)
      .sort(
        (a, b) =>
          difficultySortWeight(a.difficulty) -
          difficultySortWeight(b.difficulty)
      );
    return {
      ...stamp,
      song: songWithLatestVersion,
    };
  });

const others = incomplete.filter(
  (stamp) => stamp.type !== "partner" && stamp.type !== "music"
);

const complete = STAMP.filter((stamp) => stamp.complete);

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const StampCards = styled.div`
  display: flex;
  flex-direction: column;
`;

const StampCard = styled.div`
  display: flex;
  gap: 16px;
  border-bottom: ${({ theme }) => theme.styles.border()};
  padding: 8px 0;
`;

const StampCardDetail = styled.div`
  flex: 1;
  display: flex;
  gap: 4px;
  flex-direction: column;
  justify-content: center;
`;

const StampCardStamps = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: repeat(5, 24px);
  }
`;

const StampImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;
`;

const StampImageSmall = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

const CompleteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  gap: 8px;
`;

const TypeRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Type = styled.img`
  display: block;
  height: 1em;
`;

const SongRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding-bottom: 8px;
  }
`;

const SongTitle = styled.div`
  ${ellipsis()}
  display: block;
  font-weight: bold;
`;

const Levels = styled.div`
  ${wanpaku}
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const LevelText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

const Stamp = () => {
  const partnerStampLeft = partners.reduce(
    (acc, stamp) => acc + (stamp.max - stamp.stampCount),
    0
  );
  const songStampLeft = songs.reduce(
    (acc, stamp) => acc + (stamp.max - stamp.stampCount),
    0
  );
  const songLatestStampLeft = songs.reduce(
    (acc, stamp) =>
      acc +
      (stamp.song[0]?.version === latestVersion
        ? stamp.max - stamp.stampCount
        : 0),
    0
  );
  const othersStampLeft = others.reduce(
    (acc, stamp) => acc + (stamp.max - stamp.stampCount),
    0
  );

  return (
    <>
      <Row>
        <Typo h1 no-margin>
          스탬프 카드
        </Typo>
        <div style={{ flex: 1 }} />
        <Typo description>{STAMP.length}장</Typo>
      </Row>
      {partners.length > 0 && (
        <>
          <Typo h2>파트너</Typo>
          <Typo description>
            완료까지 {partnerStampLeft}일 출석 남음 (
            <IconUsers size="1em" /> {Math.ceil(partnerStampLeft / 2)}일)
          </Typo>
          <Space h={16} />
          <StampCards>
            {partners.map((stamp) => (
              <StampCard key={stamp.image}>
                <StampImage src={stamp.image} />
                <StampCardDetail>
                  <SongTitle>{stamp.title}</SongTitle>
                  <StampCardStamps>
                    {new Array(stamp.max).fill(0).map((_, index) => (
                      <Fragment key={index}>
                        {stamp.stampCount > index ? (
                          <IconDiscountCheckFilled
                            color={stampColor(stamp.title, stamp.type)}
                          />
                        ) : (
                          <IconCircleDotted />
                        )}
                      </Fragment>
                    ))}
                  </StampCardStamps>
                </StampCardDetail>
              </StampCard>
            ))}
          </StampCards>
        </>
      )}
      {songs.length > 0 && (
        <>
          <Typo h2>곡</Typo>
          <Typo description>
            전체 완료까지 {songStampLeft}일, 신 채보 완료까지{" "}
            {songLatestStampLeft}일 출석 남음 (
            <IconUsers size="1em" /> {Math.ceil(songStampLeft / 2)}일,{" "}
            {Math.ceil(songLatestStampLeft / 2)}일)
          </Typo>
          <Space h={16} />
          <StampCards>
            {songs.map((stamp) => (
              <StampCard key={stamp.image}>
                <StampImage src={stamp.image} />
                <StampCardDetail>
                  <SongRow>
                    <div>
                      <TypeRow>
                        {stamp.song[0] && (
                          <Type
                            src={
                              stamp.song[0].type === "DX"
                                ? MUSIC_DX_URL
                                : MUSIC_STD_URL
                            }
                            alt={stamp.song[0].type}
                          />
                        )}
                        {stamp.song[0]?.version === latestVersion ? (
                          <Typo small warn>
                            <IconArrowBadgeUpFilled />
                            <b>신 채보</b>
                          </Typo>
                        ) : null}
                      </TypeRow>
                      <SongTitle>{stamp.title}</SongTitle>
                    </div>
                    <Levels>
                      {stamp.song.map((song) => (
                        <LevelText
                          key={song.difficulty}
                          style={{
                            backgroundColor: difficultyBackgroundColor(
                              song.difficulty
                            ),
                          }}
                        >
                          <LevelGradientText
                            difficulty={song.difficulty}
                            level={song.internalLevel}
                            accurate={song.internalLevelIsAccurate}
                          />
                        </LevelText>
                      ))}
                    </Levels>
                  </SongRow>
                  <StampCardStamps>
                    {new Array(stamp.max).fill(0).map((_, index) => (
                      <Fragment key={index}>
                        {stamp.stampCount > index ? (
                          <IconDiscountCheckFilled
                            color={stampColor(stamp.title, stamp.type)}
                          />
                        ) : (
                          <IconCircleDotted />
                        )}
                      </Fragment>
                    ))}
                  </StampCardStamps>
                </StampCardDetail>
              </StampCard>
            ))}
          </StampCards>
        </>
      )}
      {others.length > 0 && (
        <>
          <Typo h2>기타</Typo>
          <Typo description>
            완료까지 {othersStampLeft}일 출석 남음 (
            <IconUsers size="1em" /> {Math.ceil(othersStampLeft / 2)}일)
          </Typo>
          <Space h={16} />
          <StampCards>
            {others.map((stamp) => (
              <StampCard key={stamp.image}>
                <StampImage src={stamp.image} />
                <StampCardDetail>
                  <SongTitle>{stamp.title}</SongTitle>
                  <StampCardStamps>
                    {new Array(stamp.max).fill(0).map((_, index) => (
                      <Fragment key={index}>
                        {stamp.stampCount > index ? (
                          <IconDiscountCheckFilled
                            color={stampColor(stamp.title, stamp.type)}
                          />
                        ) : (
                          <IconCircleDotted />
                        )}
                      </Fragment>
                    ))}
                  </StampCardStamps>
                </StampCardDetail>
              </StampCard>
            ))}
          </StampCards>
        </>
      )}
      <Typo h2>COMPLETE</Typo>
      <CompleteGrid>
        {complete.map((stamp) => (
          <StampImageSmall key={stamp.image} src={stamp.image} />
        ))}
      </CompleteGrid>
    </>
  );
};

export default Stamp;
