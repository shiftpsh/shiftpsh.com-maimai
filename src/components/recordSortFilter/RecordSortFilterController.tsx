import styled from "@emotion/styled";
import { Select, Switch } from "@solved-ac/ui-react";
import {
  IconArrowUp,
  IconFilterCheck,
  IconFilterPlus,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ellipsis, transparentize } from "polished";
import { useEffect, useRef, useState } from "react";
import { SORT_CRITERIAS } from "../../utils/filterAndSort/sort";
import { Filter, RecordSortObject } from "../../utils/filterAndSort/types";
import { IconButton } from "../commons/IconButton";
import LevelRangeSelect from "./LevelRangeSelect";
import VersionSelect from "./VersionSelect";
import AchievementRangeSelect from "./AchievementRangeSelect";

const StickToTop = styled(motion.div)`
  position: sticky;
  /* Hack to get IntersetionObserver to work */
  top: -1px;
  z-index: 100;
  padding: 8px 0;
`;

const Filters = styled(motion.div)`
  pointer-events: all;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
  max-width: 100%;
`;

const FiltersBackground = styled(motion.div)`
  position: absolute;
  top: 8px;
  backdrop-filter: blur(4px);
  box-shadow: ${({ theme }) => theme.styles.shadow()};
  border-radius: 8px;
`;

const FiltersRow = styled(motion.div)`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
  @media (max-width: 640px) {
    flex-wrap: wrap;
  }
`;

const FiltersTopRow = styled(FiltersRow)`
  height: 56px;
`;

const Caption = styled(motion.div)`
  ${ellipsis()}
  flex: 0 0 5em;
  min-width: 0;
  color: ${({ theme }) => theme.color.text.secondary.main};
  font-weight: 600;
`;

const CaptionFilter = styled(Caption)`
  ${ellipsis()}
  @media (max-width: 640px) {
    flex: 0 0 100%;
  }
`;

interface Props {
  sort: RecordSortObject;
  onSortChange: (sort: RecordSortObject) => void;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const RecordSortFilter = ({
  sort,
  onSortChange,
  filter,
  onFilterChange,
}: Props) => {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  const [savedStickRefWidth, setSavedStickRefWidth] = useState(0);

  const stickRef = useRef<HTMLDivElement>(null);

  const showControls = open || !stuck;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) =>
        setStuck(e.intersectionRatio < 1 && e.boundingClientRect.top < 0),
      { threshold: [1] }
    );

    if (stickRef.current) {
      observer.observe(stickRef.current);
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(([e]) => {
      const { width } = e.contentRect;
      setSavedStickRefWidth(width);
    });
    if (stickRef.current) {
      observer.observe(stickRef.current);
      return () => observer.disconnect();
    }
  });

  const featuresRowProps = {
    animate: {
      opacity: showControls ? 1 : 0,
    },
    style: {
      pointerEvents: showControls ? ("all" as const) : ("none" as const),
    },
  };

  return (
    <StickToTop ref={stickRef}>
      <FiltersBackground
        initial={{
          opacity: 0,
          left: 0,
          right: 0,
          top: 8,
        }}
        animate={{
          opacity: stuck ? 1 : 0,
          left: stuck ? 8 : 0,
          right: stuck ? 8 : 0,
          top: 8,
          bottom: stuck ? 8 : "unset",
          height: showControls ? "calc(100% - 16px)" : 72,
          backgroundColor: stuck ? transparentize(0.1, "white") : "#fff",
        }}
      />
      <Filters
        initial={{
          width: "100%",
        }}
        animate={{
          x: stuck ? 8 : 0,
          paddingLeft: stuck ? 8 : 0,
          paddingRight: stuck ? 8 : 0,
          width: stuck ? savedStickRefWidth - 16 : savedStickRefWidth,
        }}
      >
        <FiltersTopRow>
          <Caption
            initial={{
              opacity: 1,
              flex: "0 0 5em",
            }}
            animate={{
              opacity: stuck ? 0 : 1,
              flex: stuck ? 0 : "0 0 5em",
            }}
          >
            정렬
          </Caption>
          <Select
            value={sort.sort.name}
            items={SORT_CRITERIAS.map((x) => ({
              value: x.name,
              sort: x,
            }))}
            render={(item) => item.value}
            onChange={(item) =>
              onSortChange({
                order: item.sort.name === "Title" ? "asc" : "desc",
                sort: item.sort,
              })
            }
            zIndex={200}
          />
          <IconButton
            onClick={() =>
              onSortChange({
                order: sort.order === "asc" ? "desc" : "asc",
                sort: sort.sort,
              })
            }
            circle
            transparent
          >
            {sort.order === "asc" ? (
              <IconSortAscending />
            ) : (
              <IconSortDescending />
            )}
          </IconButton>
          <div style={{ flex: 1 }} />
          {stuck && (
            <>
              <IconButton
                as={motion.button}
                animate={{
                  opacity: stuck ? 1 : 0,
                }}
                onClick={() => {
                  setOpen((p) => !p);
                }}
                circle
                transparent
              >
                {open ? <IconFilterCheck /> : <IconFilterPlus />}
              </IconButton>
              <IconButton
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                circle
                transparent
              >
                <IconArrowUp />
              </IconButton>
            </>
          )}
        </FiltersTopRow>
        <FiltersRow {...featuresRowProps}>
          <CaptionFilter>레벨</CaptionFilter>
          <LevelRangeSelect filter={filter} onFilterChange={onFilterChange} />
        </FiltersRow>
        <FiltersRow {...featuresRowProps}>
          <CaptionFilter>스코어</CaptionFilter>
          <AchievementRangeSelect
            filter={filter}
            onFilterChange={onFilterChange}
          />
        </FiltersRow>
        <FiltersRow {...featuresRowProps}>
          <CaptionFilter>버전</CaptionFilter>
          <VersionSelect filter={filter} onFilterChange={onFilterChange} />
        </FiltersRow>
        <FiltersRow {...featuresRowProps}>
          <CaptionFilter>포텐셜</CaptionFilter>
          <Switch
            value={filter.hasRatingIncreasingPotential || false}
            onChange={(value) =>
              onFilterChange({
                ...filter,
                hasRatingIncreasingPotential: value,
              })
            }
          />
        </FiltersRow>
      </Filters>
    </StickToTop>
  );
};

export default RecordSortFilter;
