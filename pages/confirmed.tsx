import { Layout, Button } from '../components';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export default function ConfirmedPage(): JSX.Element {
  const router = useRouter();
  return (
    <Layout>
      <div className="w-full md:w-8/12 lg:w-6/12 space-y-4">
        <FontAwesomeIcon
          data-testid="icon"
          className="text-2xl md:text-3xl lg:text-5xl"
          icon={faCheckCircle}
        />
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
          Phone number confirmed!
        </h1>
        <p>
          We have sent another message to help you set up Whatsapp notification
          in Monika.
        </p>
        <Button
          onClick={() => router.push('/')}
          variant="outline"
          className="mr-2">
          Register another phone number
        </Button>
        <Button onClick={() => router.push('/test-webhook')}>
          Test your webhook
        </Button>
      </div>
    </Layout>
  );
}
