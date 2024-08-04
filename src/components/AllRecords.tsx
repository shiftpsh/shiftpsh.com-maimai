import styled from "@emotion/styled";
import { Space, Typo } from "@solved-ac/ui-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SONG_DATABASE } from "../const/songDatabase";
import { ChartType, Difficulty } from "../types/types";
import { filterRecord } from "../utils/filterAndSort/filter";
import {
  filterFromUrlQuery,
  filterToUrlQuery,
} from "../utils/filterAndSort/query";
import { sortRecords } from "../utils/filterAndSort/sort";
import { Filter, RecordSortObject } from "../utils/filterAndSort/types";
import { throttle } from "../utils/throttle";
import RecordRow from "./recordRow/RecordRow";
import RecordSortFilterController from "./recordSortFilter/RecordSortFilterController";
import { IconLayoutList, IconList } from "@tabler/icons-react";
import { IconButton } from "./commons/IconButton";
import RecordRowCompact from "./recordRow/RecordRowCompact";

const { tracks } = SONG_DATABASE;

const internalKey = (record: {
  title: string;
  artist: string | null;
  type: ChartType;
  difficulty: Difficulty;
}) => `${record.title}:${record.artist}:${record.type}:${record.difficulty}`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
`;

const AllRecords = () => {
  const [mode, setMode] = useState<"row" | "row-compact">("row");
  const [searchParams, setSearchParams] = useSearchParams();
  const { filter, sort } = filterFromUrlQuery(searchParams);
  const [recordsShowCountLimit, setRecordsShowCountLimit] = useState(50);

  const filteredTracks = useMemo(
    () =>
      sortRecords(
        tracks.filter((x) => filterRecord(x, filter)),
        sort
      ),
    [filter, sort]
  );

  const slicedTracks = useMemo(
    () => filteredTracks.slice(0, recordsShowCountLimit),
    [filteredTracks, recordsShowCountLimit]
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

  const handleSortChange = useCallback(
    (sort: RecordSortObject) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setRecordsShowCountLimit(50);
      setSearchParams(filterToUrlQuery(filter, sort), {
        replace: true,
      });
    },
    [filter, setSearchParams]
  );

  const handleFilterChange = useCallback(
    (filter: Filter) => {
      setRecordsShowCountLimit(50);
      setSearchParams(filterToUrlQuery(filter, sort), {
        replace: true,
      });
    },
    [sort, setSearchParams]
  );

  return (
    <>
      <TitleRow>
        <Typo h1 no-margin>
          기록
        </Typo>
        <div style={{ flex: 1 }} />
        <Typo description>{filteredTracks.length.toLocaleString()}개 채보</Typo>
        <IconButton circle transparent onClick={() => setMode("row")}>
          <IconLayoutList />
        </IconButton>
        <IconButton circle transparent onClick={() => setMode("row-compact")}>
          <IconList />
        </IconButton>
      </TitleRow>
      <Space h={16} />
      <RecordSortFilterController
        sort={sort}
        onSortChange={handleSortChange}
        filter={filter}
        onFilterChange={handleFilterChange}
      />
      {mode === "row" &&
        slicedTracks.map((song) => (
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
      {mode === "row-compact" &&
        slicedTracks.map((song) => (
          <RecordRowCompact key={internalKey(song)} song={song} />
        ))}
    </>
  );
};

export default AllRecords;
