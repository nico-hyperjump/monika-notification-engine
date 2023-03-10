import { Layout } from '../components';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function InvalidPage(): JSX.Element {
  return (
    <Layout>
      <div className="w-full md:w-8/12 lg:w-6/12 space-y-4">
        <FontAwesomeIcon
          data-testid="icon"
          className="text-2xl md:text-3xl lg:text-5xl"
          icon={faTimesCircle}
        />
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
          Invalid Deletion Link
        </h1>
        <p>The link you clicked is not valid. Please check the link again.</p>
      </div>
    </Layout>
  );
}
