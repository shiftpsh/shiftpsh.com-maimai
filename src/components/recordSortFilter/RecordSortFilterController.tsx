import styled from "@emotion/styled";
import { Select } from "@solved-ac/ui-react";
import {
  IconArrowUp,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { LayoutGroup, motion } from "framer-motion";
import { transparentize } from "polished";
import { useEffect, useMemo, useRef, useState } from "react";
import { SORT_CRITERIAS } from "../../utils/filterAndSort/sort";
import { RecordSortObject } from "../../utils/filterAndSort/types";
import { throttle } from "../../utils/throttle";
import { IconButton } from "../IconButton";

interface StuckProps {
  stuck: boolean;
}

const StickToTop = styled(motion.div)`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 8px 0;
`;

const Pad = styled(motion.div)<StuckProps>`
  padding: ${({ stuck }) => (stuck ? "0 8px" : "0")};
`;

const Filters = styled(motion.div)<StuckProps>`
  background-color: ${({ stuck }) =>
    stuck ? transparentize(0.1, "white") : "white"};
  backdrop-filter: blur(4px);
  border-radius: ${({ stuck }) => (stuck ? "8px" : "0")};
  padding: ${({ stuck }) => (stuck ? "8px" : "8px 0")};
  box-shadow: ${({ stuck, theme }) =>
    stuck ? theme.styles.shadow() : theme.styles.shadow("transparent")};
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 8px;
`;

interface Props {
  sort: RecordSortObject;
  onSortChange: (sort: RecordSortObject) => void;
}

const RecordSortFilter = ({ sort, onSortChange }: Props) => {
  const [stuck, setStuck] = useState(false);
  const stickRef = useRef<HTMLDivElement>(null);

  const throttledUpdateStuck = useMemo(
    () =>
      throttle(() => {
        if (stickRef.current) {
          setStuck(stickRef.current.getBoundingClientRect().top <= 0);
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
    <LayoutGroup>
      <StickToTop ref={stickRef} layout layoutRoot>
        <Pad stuck={stuck} layout>
          <Filters stuck={stuck} layout>
            <FiltersRow>
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
            </FiltersRow>
          </Filters>
        </Pad>
      </StickToTop>
    </LayoutGroup>
  );
};

export default RecordSortFilter;
