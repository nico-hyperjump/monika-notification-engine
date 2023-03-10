import { useRouter } from 'next/router';
import { Layout, Button } from '../../components';
import {
  faExclamationTriangle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWebhookByToken } from '../../services/repositories/webhook_token';

export default function DeletePage({
  token,
  exists,
}: {
  token: string | null;
  exists: boolean;
}): JSX.Element {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      // Hit the Delete Account API
      const data = await fetch(`/api/delete?token=${token}`, {
        method: 'DELETE',
      });
      const result = await data.json();
      const { message } = result;

      // Check if the deletion success/not
      if (message === 'SUCCESS') {
        router.push('/delete/success');
      } else {
        router.push('/delete/failed');
      }
    } catch (error) {
      router.push('/delete/failed');
    }
  };

  if (!exists) {
    return (
      <Layout>
        <div className="w-full md:w-8/12 lg:w-6/12 space-y-4">
          <FontAwesomeIcon
            data-testid="icon"
            className="text-2xl md:text-3xl lg:text-5xl"
            icon={faQuestionCircle}
          />
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
            Account not found
          </h1>
          <p>The account that uses the token provided is not found.</p>
          <Button onClick={() => router.push('/')}>Go to Home Page</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full md:w-8/12 lg:w-6/12 space-y-4">
        <FontAwesomeIcon
          data-testid="icon"
          className="text-2xl md:text-3xl lg:text-5xl"
          icon={faExclamationTriangle}
        />
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
          Delete Account
        </h1>
        <p>
          Are you sure you want to delete your account? Your webhook URL will be
          deactivated and you won’t receive Whatsapp message from Monika
          anymore.
        </p>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // Get the token from query params
  const { params } = context;
  const { token } = params;

  // Check if token is exists
  try {
    const isTokenExists = await getWebhookByToken(token);

    if (isTokenExists) {
      return {
        props: {
          token,
          exists: true,
        },
      };
    }

    return {
      props: {
        token,
        exists: false,
      },
    };
  } catch (error) {
    return {
      props: {
        token,
        exists: false,
      },
    };
  }
}
