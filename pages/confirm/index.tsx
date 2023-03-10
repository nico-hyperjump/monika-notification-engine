import { Layout } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

export default function ConfirmPage(): JSX.Element {
  return (
    <Layout>
      <div className="w-full md:w-8/12 lg:w-6/12 space-y-4">
        <FontAwesomeIcon
          data-testid="icon"
          className="text-2xl md:text-3xl lg:text-5xl"
          icon={faCommentDots}
        />
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
          Confirm your phone number
        </h1>
        <p>
          We have sent a message to your WhatsApp number. Please click the link
          in the message to confirm your phone number.
        </p>
      </div>
    </Layout>
  );
}
