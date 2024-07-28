import {
  GameScore,
  RecordSummary,
  TrackInternalRecord,
} from "../../src/types/types";
import { musicDetail } from "../api/musicDetail";
import { batchedPromiseAll } from "./promise";

interface TrackInternalRecordLike {
  title: string;
  type: string;
  artist?: string;
}

export const trackMapKey = (track: TrackInternalRecordLike) => {
  if (track.artist) {
    return `${track.title}:${track.type}:${track.artist}`;
  }
  return `${track.title}:${track.type}`;
};

export const duplicateStrings = (titles: string[]) => {
  const counts = new Map<string, number>();
  titles.forEach((title) => {
    counts.set(title, (counts.get(title) || 0) + 1);
  });
  return new Set(titles.filter((title) => (counts.get(title) || 0) > 1));
};

export const duplicateTrackMapKeys = (tracks: TrackInternalRecord[]) => {
  return duplicateStrings(tracks.map(trackMapKey));
};

export const dedupeRecords = async (
  records: RecordSummary<TrackInternalRecord, GameScore | null>[][]
) => {
  const duplicateTrackKeys = duplicateTrackMapKeys(
    records[0].map((x) => x.track)
  );

  const duplicateTrackNameIdxs = new Set(
    records.flatMap((recordRow) =>
      recordRow
        .filter(({ track }) => duplicateTrackKeys.has(trackMapKey(track)))
        .map(({ track }) => track.idx)
    )
  );
  const duplicateTrackNameIdxsArray = Array.from(duplicateTrackNameIdxs);
  const artists = await batchedPromiseAll(
    duplicateTrackNameIdxsArray.map((idx) => async () => musicDetail({ idx }))
  );
  const idxArtistMap = new Map<string, string>();
  artists.forEach(({ artist }, i) => {
    idxArtistMap.set(duplicateTrackNameIdxsArray[i], artist);
  });

  const recordsWithArtists = records.map((recordRow) =>
    recordRow.map(({ track, score }) => {
      if (duplicateTrackNameIdxs.has(track.idx)) {
        return {
          track: {
            ...track,
            artist: idxArtistMap.get(track.idx) || "",
          },
          score,
        };
      }
      return { track, score };
    })
  );

  return { recordsWithArtists, duplicateTrackKeys };
};
