import { Centering, Container, Paragraph, Typo } from "@solved-ac/ui-react";

const ErrorNotFound = () => {
  return (
    <Container>
      <Centering>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Typo h1>404</Typo>
          <Paragraph>
            <Typo description>
              페이지를 찾을 수 없습니다. 주소를 다시 확인해 주세요.
            </Typo>
          </Paragraph>
        </div>
      </Centering>
    </Container>
  );
};

export default ErrorNotFound;
