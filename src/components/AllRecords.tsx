import styled from "@emotion/styled";
import { Space, Typo } from "@solved-ac/ui-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SONG_DATABASE } from "../const/songDatabase";
import { ChartType, Difficulty } from "../types/types";
import { filterRecord } from "../utils/filterAndSort/filter";
import { SORT_CRITERIAS, sortRecords } from "../utils/filterAndSort/sort";
import { Filter, RecordSortObject } from "../utils/filterAndSort/types";
import { throttle } from "../utils/throttle";
import RecordRow from "./recordRow/RecordRow";
import RecordSortFilterController from "./recordSortFilter/RecordSortFilterController";

const { tracks } = SONG_DATABASE;

const internalKey = (record: {
  title: string;
  artist: string | null;
  type: ChartType;
  difficulty: Difficulty;
}) => `${record.title}:${record.artist}:${record.type}:${record.difficulty}`;

const TitleRow = styled.div`
  display: flex;
`;

const AllRecords = () => {
  const [sort, setSort] = useState<RecordSortObject>({
    sort: SORT_CRITERIAS[0],
    order: "desc",
  });
  const [filter, setFilter] = useState<Filter>({});
  const [recordsShowCountLimit, setRecordsShowCountLimit] = useState(50);

  const filteredTracks = useMemo(
    () =>
      sortRecords(
        tracks.filter((x) => filterRecord(x, filter)),
        sort
      ).slice(0, recordsShowCountLimit),
    [filter, recordsShowCountLimit, sort]
  );

  const handleShowMore = useMemo(
    () =>
      throttle(() => {
        setRecordsShowCountLimit((p) => p + 50);
      }, 100),
    []
  );

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const offset = window.innerHeight + window.scrollY;

    if (scrollHeight - offset < 320) {
      handleShowMore();
    }
  }, [handleShowMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <TitleRow>
        <Typo h1 no-margin>
          모든 기록
        </Typo>
        <div style={{ flex: 1 }} />
      </TitleRow>
      <Space h={16} />
      <RecordSortFilterController
        sort={sort}
        onSortChange={(sort) => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setRecordsShowCountLimit(50);
          setSort(sort);
        }}
        filter={filter}
        onFilterChange={(filter) => {
          setRecordsShowCountLimit(50);
          setFilter(filter);
        }}
      />
      {filteredTracks.map((song) => (
        <RecordRow
          key={internalKey(song)}
          song={song}
          mode={
            filter.hasRatingIncreasingPotential
              ? "rating-with-potential"
              : sort.sort.name === "DX %"
              ? "dx-percent"
              : sort.sort.name === "DX Border"
              ? "dx-border"
              : "rating"
          }
        />
      ))}
    </>
  );
};

export default AllRecords;
