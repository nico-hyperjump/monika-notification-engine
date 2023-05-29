export default function Notes() {
  return (
    <div className="w-full space-y-8">
      <h1 className="text-xl font-semibold">
        To make sure the messages are delivered successfully to your device:
      </h1>
      <ol style={{ listStyleType: 'decimal', marginLeft: '15px' }}>
        <li>Confirm that your phone number is a WhatsApp phone number.</li>
        <li>
          You have accepted the WhatsApp Terms of Service and Privacy Policy.
        </li>
        <li>
          You are using the latest WhatsApp version. Supported versions are the
          following or greater:
          <ul>
            <li>- Android: 2.21.15.15</li>
            <li>- SMBA: 2.21.15.15</li>
            <li>- iOS: 2.21.170.4</li>
            <li>- SMBI: 2.21.170.4</li>
            <li>- KaiOS: 2.2130.10</li>
            <li>- Web: 2.2132.6</li>
          </ul>
        </li>
      </ol>
    </div>
  );
}
