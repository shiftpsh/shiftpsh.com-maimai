import styled from "@emotion/styled";
import { Typo } from "@solved-ac/ui-react";
import { IconCopy } from "@tabler/icons-react";

const TopRow = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
`;

const MainText = styled.span`
  font-weight: 800;
`;

const Gap = styled.div`
  flex: 1;
`;

const FriendCodeText = styled.span`
  font-feature-settings: "ss06", "zero";
  font-size: 75%;
  cursor: pointer;
`;

const TopIcon = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText("7061399728945");
    alert("친구 코드를 복사했습니다.");
  };

  return (
    <TopRow>
      <LogoLink href="https://shiftpsh.com">
        <Logo
          src={`${import.meta.env.BASE_URL}shiftpsh-logo-2019.svg`}
          alt="shiftpsh"
        />
      </LogoLink>
      <MainText>/</MainText>
      <MainText>maimai</MainText>
      <Gap />
      <FriendCodeText onClick={handleCopy} role="button" tabIndex={0}>
        <Typo description>친구 코드</Typo> 7061399728945 <IconCopy size={16} />
      </FriendCodeText>
    </TopRow>
  );
};

export default TopIcon;
