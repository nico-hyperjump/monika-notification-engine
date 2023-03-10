import { useRouter } from 'next/router';
import { Layout, Button } from '../../components';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DeleteFailedPage(): JSX.Element {
  const router = useRouter();

  return (
    <Layout>
      <div className="w-full md:w-8/12 lg:w-6/12 space-y-4">
        <FontAwesomeIcon
          data-testid="icon"
          className="text-2xl md:text-3xl lg:text-5xl"
          icon={faTimesCircle}
        />
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
          Account could not be deleted!
        </h1>
        <p>There is something wrong while deleting your account.</p>
        <Button onClick={() => router.back()}>Try again</Button>
      </div>
    </Layout>
  );
}
