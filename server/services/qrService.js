import QRCode from 'qrcode';

export const generateQRCode = async (url) => {
  try {
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#1e1b4b',
        light: '#ffffff'
      }
    });
    return qrDataUrl;
  } catch (err) {
    console.error('[QRCode] Generation error:', err);
    return null;
  }
};
