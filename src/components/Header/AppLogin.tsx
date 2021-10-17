const AppLogin = () => {
    const userName = "Shriram Sapparad";
    const userImgSrc = "https://pbs.twimg.com/profile_images/1414228698799116293/5XncAJOh_400x400.jpg";

    return(
        <form>
            <select defaultValue="shriramcs">
                <option value="shriramcs">
                    {userName}
                </option>
            </select>
            <img src={userImgSrc} 
                alt="user profile"/>
        </form>
    );
}

export default AppLogin;