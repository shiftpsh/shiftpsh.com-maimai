import {
  Container,
  Space,
  Footer as AppFooter,
  Paragraph,
} from "@solved-ac/ui-react";
import { IconBrandGithub } from "@tabler/icons-react";

const Footer = () => {
  return (
    <AppFooter>
      <Container>
        <Space h={16} />
        <a
          href="https://github.com/shiftpsh/shiftpsh.com-maimai"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandGithub />
        </a>
        <Paragraph>데이터는 매일 오전 7:30 KST에 자동 갱신됩니다.</Paragraph>
        <Paragraph>
          보면 상수는{" "}
          <a
            href="https://x.com/maiLv_Chihooooo"
            target="_blank"
            rel="noreferrer"
          >
            maimai譜面定数ちほー
          </a>{" "}
          프로젝트로부터 가져왔습니다. 난이도의 소수점 아래 부분이 흐릿하게
          표시되는 곡들은 현재 버전에 알려진 상수가 없는 곡들이며, 표기 난이도
          및 이전 버전 상수들을 토대로 추정한 정확하지 않을 수 있는 값입니다.
        </Paragraph>
        <Paragraph>
          본 사이트는 개인 성과 기록 및 추적을 위해 만든{" "}
          <a href="https://maimai.sega.com/" target="_blank" rel="noreferrer">
            maimai DX
          </a>
          의 팬 사이트이며, 사이트 내에 사용된 게임 관련 컨텐츠의 저작권은{" "}
          <a href="https://www.sega.com/" target="_blank" rel="noreferrer">
            SEGA
          </a>{" "}
          및{" "}
          <a
            href="https://maimai.sega.com/song/new/#copy--list"
            target="_blank"
            rel="noreferrer"
          >
            각 소유자들
          </a>
          에게 있습니다.
        </Paragraph>
        <Space h={80} />
      </Container>
    </AppFooter>
  );
};

export default Footer;
