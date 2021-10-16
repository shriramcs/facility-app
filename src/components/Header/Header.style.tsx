import styled from "styled-components";

const HeaderWrapper = styled.header`
    filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));

    .App-header {
      background-color: #FFF;
      color: #000;
      padding: 0.5rem;
      filter: drop-shadow(0px 0px 5px rgba(0,0,0,0.1));
    }
    
    .navbar a {
      text-decoration: none;
    }
    .navbar a:first-child {
      margin-left: 0.25rem;
    }
    .navbar a.active{
      text-decoration: underline;
      color: orange
    }
    
    .App-header img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
    }
    
    .App-header select{
      border: none;
    }
    
    ul.navbar, .navbar li {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    ul.navbar {
      display: flex;
      gap: 1rem;
    }
    
    .site-header__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .header__wrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header__wrapper > * {
        flex: 1;
    }
    .header__middle{
      text-align: center;
      display: flex;
      flex-flow: column;
    }
    
    .header__middle a{
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: 600;
    }
    .header__middle {
      padding: .25rem 0;
    }
    .logo__slogan{
      font-size: 0.8rem;
      color: orange;
    }
    
    .header__end form {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
      margin-right: 1rem;
    }
`;

export const NavBarWrapper = styled.div``;

export default HeaderWrapper;