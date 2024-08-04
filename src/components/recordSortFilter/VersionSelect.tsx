import styled from "@emotion/styled";
import { IconDots } from "@tabler/icons-react";
import { darken, mix, readableColor } from "polished";
import { useState } from "react";
import { SONG_DATABASE } from "../../const/songDatabase";
import { Filter } from "../../utils/filterAndSort/types";
import { versionBackgroundColor, versionKanjiName } from "../../utils/version";
import { FilterIconButton } from "../commons/IconButton";

const { availableVersions, latestVersion } = SONG_DATABASE;

const VERSION_ALL = -1;
const VERSION_NEW = -2;
const VERSION_OLD = -3;

const VERSIONS_COARSE = [
  {
    value: VERSION_ALL,
    name: "ALL",
  },
  {
    value: VERSION_NEW,
    name: "NEW",
  },
  {
    value: VERSION_OLD,
    name: "OLD",
  },
];

const VersionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

interface Props {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const VersionSelect = ({ filter, onFilterChange }: Props) => {
  const [coarse, setCoarse] = useState(true);
  const { version = availableVersions.map((x) => x.value) } = filter;

  const handleButtonClick = (setVersion: number) => {
    if (setVersion === VERSION_ALL) {
      onFilterChange({ ...filter, version: undefined });
      return;
    }
    if (setVersion === VERSION_NEW) {
      onFilterChange({ ...filter, version: [latestVersion] });
      return;
    }
    if (setVersion === VERSION_OLD) {
      onFilterChange({
        ...filter,
        version: availableVersions
          .filter((x) => x.value !== latestVersion)
          .map((x) => x.value),
      });
      return;
    }
    onFilterChange({
      ...filter,
      version: [setVersion],
    });
  };

  const isAllSelected = version.length === availableVersions.length;
  const isOldSelected =
    version.length === availableVersions.length - 1 &&
    !version.includes(latestVersion);
  const isNewSelected = version.length === 1 && version.includes(latestVersion);

  return (
    <VersionsRow>
      {(coarse
        ? VERSIONS_COARSE
        : [
            ...VERSIONS_COARSE.filter((x) => x.value !== VERSION_NEW),
            ...availableVersions,
          ]
      ).map((ver) => {
        const selected =
          version.includes(ver.value) ||
          (ver.value === VERSION_ALL && isAllSelected) ||
          (ver.value === VERSION_OLD && isOldSelected) ||
          (ver.value === VERSION_NEW && isNewSelected);
        return (
          <FilterIconButton
            key={ver.value}
            onClick={() => handleButtonClick(ver.value)}
            backgroundColor={mix(
              0.9,
              "white",
              versionBackgroundColor(ver.value)
            )}
            style={
              selected
                ? {
                    backgroundColor: versionBackgroundColor(ver.value),
                    color: readableColor(
                      darken(0.2, versionBackgroundColor(ver.value))
                    ),
                  }
                : {}
            }
          >
            {versionKanjiName(ver.value) || ver.value}
          </FilterIconButton>
        );
      })}
      <FilterIconButton onClick={() => setCoarse((prev) => !prev)} transparent>
        <IconDots />
      </FilterIconButton>
    </VersionsRow>
  );
};

export default VersionSelect;
