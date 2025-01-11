export default function Footer ({version}){
    return (
        <>  
            <div className="footer-container">
                <div className="version">
                    <p> App Version </p>
                    <p> {version} </p>
                </div>

                <div className="author">
                    <p>Made by</p>
                    <p>@Ridham</p>
                </div>
                
                <div className="contactus">
                    <p>Email :</p>
                    <a href="mailto:touchlink@gmail.com">touchlink@gmail.com</a>
                </div>
            </div>
        </>
    )
}