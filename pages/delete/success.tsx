import { Layout } from '../../components';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DeletedPage(): JSX.Element {
  return (
    <Layout>
      <div className="w-full md:w-8/12 lg:w-6/12 space-y-4">
        <FontAwesomeIcon
          data-testid="icon"
          className="text-2xl md:text-3xl lg:text-5xl"
          icon={faCheckCircle}
        />
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
          Account Deleted
        </h1>
        <p>Please remove your webhook URL from Monika’s configuration.</p>
      </div>
    </Layout>
  );
}
