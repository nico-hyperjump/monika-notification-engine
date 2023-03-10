import { useRouter } from 'next/router';
import { Layout, Button } from '../../components';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeTab from '../../components/HomeTab';

export default function TestWebhookSuccess(): JSX.Element {
  const router = useRouter();

  return (
    <Layout>
      <div className="w-full md:w-8/12 lg:w-6/12 space-y-4">
        <HomeTab />
        <FontAwesomeIcon
          data-testid="icon"
          className="text-2xl md:text-3xl lg:text-5xl"
          icon={faCheckCircle}
        />
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
          Message sent!
        </h1>
        <p>You should receive a message in your Whatsapp shortly.</p>
        <Button onClick={() => router.back()}>Test again</Button>
      </div>
    </Layout>
  );
}
