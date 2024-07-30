import { Container, Space } from "@solved-ac/ui-react";
import TopIcon from "./components/TopIcon";
import { SONG_DATABASE } from "./const/songDatabase";
import Profile from "./components/Profile";

function App() {
  const { profile } = SONG_DATABASE;

  return (
    <>
      <Container>
        <Space h={60} />
        <TopIcon />
        <Space h={32} />
        <Profile profile={profile} />
        <Space h={32} />
      </Container>
    </>
  );
}

export default App;
