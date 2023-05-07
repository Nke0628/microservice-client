import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

function ErrorFallback({ error }: FallbackProps) {
  const Wrapper = styled.div`
    padding: 15px;
  `;
  return (
    <Wrapper>
      <h2>エラーが発生しました。</h2>
    </Wrapper>
  );
}
export default ErrorFallback;
