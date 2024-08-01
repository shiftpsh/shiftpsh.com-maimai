import styled from "@emotion/styled";
import { Select } from "@solved-ac/ui-react";
import {
  IconArrowUp,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { transparentize } from "polished";
import { useEffect, useMemo, useRef, useState } from "react";
import { SORT_CRITERIAS } from "../../utils/filterAndSort/sort";
import { Filter, RecordSortObject } from "../../utils/filterAndSort/types";
import { throttle } from "../../utils/throttle";
import { IconButton } from "../IconButton";
import LevelRangeSelect from "./LevelRangeSelect";

interface StuckProps {
  stuck: boolean;
}

const StickToTop = styled(motion.div)`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 8px 0;
`;

const Filters = styled(motion.div)<StuckProps>`
  pointer-events: all;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: ${({ stuck }) => (stuck ? "8px 16px" : "8px 0")};
`;

const FiltersBackground = styled(motion.div)`
  position: absolute;
  top: 8px;
  backdrop-filter: blur(4px);
`;

const FiltersRow = styled(motion.div)`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const FiltersTopRow = styled(FiltersRow)`
  height: 56px;
`;

const Caption = styled.div`
  flex: 0 0 5em;
  min-width: 0;
  color: ${({ theme }) => theme.color.text.secondary.main};
  font-weight: 600;
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
  // TODO open/close filters
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = useState(false);

  const stickRef = useRef<HTMLDivElement>(null);

  const showControls = open || !stuck;

  const throttledUpdateStuck = useMemo(
    () =>
      throttle(() => {
        if (stickRef.current) {
          const newStuck = stickRef.current.getBoundingClientRect().top <= 0;
          setStuck(newStuck);
        }
      }, 200),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledUpdateStuck);
    return () => {
      window.removeEventListener("scroll", throttledUpdateStuck);
    };
  }, [throttledUpdateStuck]);

  return (
    <StickToTop ref={stickRef} layout layoutRoot>
      <FiltersBackground
        animate={{
          left: stuck ? 8 : 0,
          right: stuck ? 8 : 0,
          top: 8,
          bottom: stuck ? 8 : "unset",
          height: stuck ? 72 : "calc(100% - 16px)",
          backgroundColor: stuck ? transparentize(0.1, "white") : "white",
          borderRadius: stuck ? 8 : 0,
          boxShadow: stuck
            ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
            : "0px 4px 8px rgba(0, 0, 0, 0)",
        }}
      />
      <Filters stuck={stuck} layout>
        <FiltersTopRow layout>
          <Caption>정렬</Caption>
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
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            circle
            transparent
          >
            <IconArrowUp />
          </IconButton>
        </FiltersTopRow>
        <FiltersRow
          layout
          animate={{
            opacity: showControls ? 1 : 0,
          }}
          style={{
            pointerEvents: showControls ? "all" : "none",
          }}
        >
          <Caption>레벨</Caption>
          <LevelRangeSelect filter={filter} onFilterChange={onFilterChange} />
        </FiltersRow>
      </Filters>
    </StickToTop>
  );
};

export default RecordSortFilter;
