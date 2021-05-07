import styled from "styled-components";

export const LayoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px !important;
`;

export const LayoutLoader = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LayoutAlert = styled.div`
  width: 100%;
  position: fixed;
  top: 10%;
  left: 0;
  z-index: 1301;
  padding: 0 15px;
`;
