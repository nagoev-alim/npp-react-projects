import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator03 = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [btnText, setBtnText] = useState('Generate QR Code');
  const [resultUrl, setResultUrl] = useState(null);
  const qrRef = useRef();

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function onSubmit - Form submit handler
   * @param event
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const { text, size } = Object.fromEntries(new FormData(form).entries());

    if (text.trim().length === 0 || size.length === 0) {
      toast.error('Please fill the fields.');
      setResultUrl(null);
      return;
    }

    try {
      setBtnText('Generating QR Code...');
      setResultUrl({ text, size: Number(size) })
      setBtnText('Generate QR Code');
    } catch (e) {
      setBtnText('Generate QR Code');
      setResultUrl(null);
      console.log(e);
    }
  };

  /**
   * @function onSave - Create and save image
   * @returns {Promise<void>}
   */
  async function onSave() {
    const canvas = qrRef.current.querySelector("canvas");
    const image = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  // =====================
  // 🚀 Render
  // =====================
  return <div className='qr-code'>
    <form onSubmit={onSubmit}>
      <label>
        <span>Paste a url or enter text to create QR code</span>
        <input type='text' name='text' placeholder='Enter text or url' />
      </label>
      <select name='size'>
        <option value=''>Select Size</option>
        {Array.from({ length: 7 }, (v, i) => (i + 1) * 100)
          .map((n, idx) =>
            <option key={idx} value={n}>{n}x{n}</option>,
          )}
      </select>
      <button type='submit'>{btnText}</button>
    </form>

    {resultUrl !== null && (
      <div className='bottom'>
        <div ref={qrRef}>
          <QRCodeCanvas
            value={resultUrl.text}
            size={resultUrl.size}
            bgColor={"#fff"}
            level={"H"}
          />
        </div>
        <button onClick={onSave}>Save</button>
      </div>
    )}
  </div>;
};

export default QRCodeGenerator03;