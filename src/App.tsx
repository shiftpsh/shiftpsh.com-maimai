import { Container, Space } from "@solved-ac/ui-react";
import MyBest50 from "./components/MyBest50";
import Profile from "./components/Profile";
import TopIcon from "./components/TopIcon";
import { SONG_DATABASE } from "./const/songDatabase";

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
        <MyBest50 />
        <Space h={160} />
      </Container>
    </>
  );
}

export default App;
