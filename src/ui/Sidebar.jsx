import Logo from "./Logo";
import MainNav from "./MainNav";
import { styled } from "styled-components";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  grid-row: 1 / -1;
  /*
  grid-row: 1/-1;
    grid-row-start: 1;
    grid-row-end: -1;
  */
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />

      <Uploader />
    </StyledSidebar>
  );
};

export default Sidebar;
