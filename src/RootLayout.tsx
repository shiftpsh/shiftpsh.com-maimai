import { Container, Space, Tab, Tabs, Typo } from "@solved-ac/ui-react";
import {
  IconBrush,
  IconDisc,
  IconMusicStar,
  IconRubberStamp,
} from "@tabler/icons-react";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import TopIcon from "./components/TopIcon";
import { SONG_DATABASE } from "./const/songDatabase";
import styled from "@emotion/styled";

const PATHS = [
  {
    path: "/",
    icon: <IconMusicStar />,
  },
  {
    path: "/records",
    icon: <IconDisc />,
  },
  {
    path: "/grinding",
    icon: <IconBrush />,
  },
  {
    path: "/stamp",
    icon: <IconRubberStamp />,
  },
];

const TabContainer = styled(NavLink)`
  flex: 1;
  min-width: 0;
`;

const TabItem = styled(Tab)`
  width: 100%;
`;

function RootLayout() {
  const { profile } = SONG_DATABASE;

  return (
    <>
      <Container>
        <Space h={60} />
        <TopIcon />
        <Space h={32} />
        <Profile profile={profile} />
        <Space h={32} />
        <Tabs fullWidth>
          {PATHS.map(({ path, icon }) => (
            <TabContainer to={path} key={path}>
              {({ isActive }) => (
                <TabItem key={path} current={isActive} as="span">
                  <Typo description={!isActive}>{icon}</Typo>
                </TabItem>
              )}
            </TabContainer>
          ))}
        </Tabs>
        <Space h={32} />
        <Outlet />
        <Space h={160} />
      </Container>
      <Footer />
    </>
  );
}

export default RootLayout;
