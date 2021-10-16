type LogoProps = {
    logo: string;
    slogan: string;
};

const AppLogo: React.FC<LogoProps> = ({logo, slogan}) => (
    <>
        <a href="/" className="App-logo">
            {logo}
        </a>
        <span className="logo__slogan">
            {slogan}
        </span>
    </>
);

export default AppLogo;