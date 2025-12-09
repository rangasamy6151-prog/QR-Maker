import { useState } from "react"

export const QRCode = () => {

    const [img, setImg] = useState("");
    const [Loading, setLoading] = useState(false);
    const [qrData, setQrdata] = useState("https://login360.in/");
    const[qrSize, setQrSize] = useState("150")


    async function GenerateQR() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url)
        }catch (error) {
            console.error("Error Generating QR Code", error);
        }
        finally {
            setLoading(false)
        }

    }

    function downloadQR() {
        fetch(img).then((response) => response.blob())
        .then((blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error) => {
            console.error("Error in downloading QR code...",error);
            
        })
    }
    return (
        <div className="app-container">
            <h1>QR CODE GENERATOR</h1>
            {Loading && <p>Please wait...</p>}
            {img && <img className="qr-image" src={img} height={qrSize} width={qrSize} alt="Generated QR code" />}
            <div>
                <label className="input-label" htmlFor="dataInput">
                    Data for QR Code :
                </label>
                <input type="text" value={qrData} id="dataInput" placeholder="Enter data for QR Code" disabled = {Loading} onChange={(e) => setQrdata(e.target.value)} />
                <label className="input-label" htmlFor="sizeInput">
                    Image size (e.g., 150) :
                </label>
                <input type="text" value={qrSize} id="sizeInput" placeholder="Enter Image size" onChange={ (e) => setQrSize(e.target.value)} />
                <button className="generate-btn" onClick={GenerateQR}>Generate QR Code</button>
                <button className="download-btn" onClick={downloadQR}>Download QR Code</button>
            </div>
            <p className="footer">Designed By <a href="https://login360.in/">Sanjay</a></p>
        </div>
        
    )
}
