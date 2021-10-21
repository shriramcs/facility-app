import { APP_FOOTER_TEXT } from '../../common/constants';
import FooterWrapper from './Footer.style';

const Footer: React.FC<{}> = () => {
    return (
        <FooterWrapper>
            {APP_FOOTER_TEXT}
        </FooterWrapper>
    );
};

export default Footer;