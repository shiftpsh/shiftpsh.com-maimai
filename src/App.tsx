import styled from "@emotion/styled";
import { SONG_DATABASE } from "./const/songDatabase";
import { wanpaku } from "./styles/fonts/wanpaku";

const Test = styled.div`
  ${wanpaku}
`;

function App() {
  return (
    <>
      <Test>
        {SONG_DATABASE.tracks
          .filter((x) => x.internalLevel >= 130)
          .sort((a, b) => a.internalLevel - b.internalLevel)
          .map((song) => (
            <div
              key={`${song.title}:${song.difficulty}:${song.type}:${song.artist}`}
            >
              {song.title} ({song.internalLevel}
              {song.internalLevelIsAccurate ? "" : "?"})
            </div>
          ))}
      </Test>
    </>
  );
}

export default App;
