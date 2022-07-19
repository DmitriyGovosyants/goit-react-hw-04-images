import styled from "@emotion/styled";

export const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${p => p.theme.spacing(4)};
  padding-bottom: ${p => p.theme.spacing(6)};
`