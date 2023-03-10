import { useRouter } from 'next/router';
import { Layout, Button } from '../components';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ExpiredPage(): JSX.Element {
  const router = useRouter();
  const handleGetNewLink = () => {
    router.push('/');
  };

  return (
    <Layout>
      <div className="w-full md:w-8/12 lg:w-6/12 space-y-4">
        <FontAwesomeIcon
          data-testid="icon"
          className="text-2xl md:text-3xl lg:text-5xl"
          icon={faTimesCircle}
        />
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
          Link has expired
        </h1>
        <p>
          The confirmation link you clicked has expired. Would you like to get a
          new confirmation link?
        </p>
        <Button onClick={handleGetNewLink}>Get a new link</Button>
      </div>
    </Layout>
  );
}
