import styled from "styled-components";

const NavBarWrapper = styled.div`
    .navbar a {
      text-decoration: none;
      white-space: nowrap;
    }
    .navbar a:first-child {
      margin-left: 0.25rem;
    }
    .navbar a.active{
      text-decoration: underline;
      color: orange
    }
    
    .navbar, .navbar li {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    // .navbar {
    //   display: flex;
    //   gap: 1rem;
    // }
    .navbar.mobile {
      display: flex;
      flex-flow: column wrap;
    }
    .navbar.desktop {
      display: flex;
      gap: 1rem;
    }
    
`;
export default NavBarWrapper;