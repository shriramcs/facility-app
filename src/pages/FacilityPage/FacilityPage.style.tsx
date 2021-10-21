import styled from "styled-components";
import { device } from "../../components/Header/device";

const FacilityPageWrapper = styled.main`
    margin: 1rem auto;
    min-height: 80vh;
    padding: 1rem;
    @media ${device.laptop} { 
        max-width: 800px;
    }
`;

export default FacilityPageWrapper;