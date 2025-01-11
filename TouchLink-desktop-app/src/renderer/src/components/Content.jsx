import { useEffect, useState } from "react";

export default function Content () {

    const [qrUrl, setQRUrl] = useState('');

    const fetchQRurl = async()=> {
        let qrUrl = await window.electron.ipcRenderer.invoke('get-websocket-url');
        setQRUrl(qrUrl);
    }

    useEffect(()=> {
      fetchQRurl()  
    }, [])

    return (
        <>  
            <div className="container">
                <div className="wave">
                    <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><path d="M 0,500 L 0,187 C 191.33333333333331,143.53333333333333 382.66666666666663,100.06666666666666 544,117 C 705.3333333333334,133.93333333333334 836.6666666666667,211.26666666666665 981,233 C 1125.3333333333333,254.73333333333335 1282.6666666666665,220.86666666666667 1440,187 L 1440,500 L 0,500 Z" stroke="none" strokeWidth="0" fill="#5f9ea0" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
                </div>
                <div className="content">
                    <p className="text">
                        To Connect with your mobile
                    </p>
                    <p className="text">
                        Scan this QR with <span>TouchLink</span> Mobile app 
                    </p>
                </div>
                <div className="qr-container">
                    <img  src={qrUrl} alt={qrUrl=='' ? "Check internet connection or refresh" : ''} className="qr-img"/>
                </div>
            </div>
        </>
    )
}