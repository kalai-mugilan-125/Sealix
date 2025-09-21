declare module 'react-qr-code' {
  // You can define the types here as per the documentation or usage
  export interface QRCodeProps {
    value: string;
    size?: number;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
  }

  const QRCode: React.FC<QRCodeProps>;
  export default QRCode;
}
