import { getReasonPhrase } from 'http-status-codes';
import { Layout, Button } from '../components';

function Error({ statusCode, statusText }) {
  return (
    <Layout>
      <h1 className="text-center text-xl md:text-2xl lg:text-4xl font-bold">
        {statusCode}
      </h1>
      <h3 className="text-center text-base md:text-xl lg:text-2xl py-4 lg:py-8">
        {statusText}
      </h3>
      <div className="flex items-center justify-center">
        <Button>
          <a
            href="/"
            target="_self"
            className="text-center mx-auto"
            rel="noopener noreferrer">
            Go to Home Page
          </a>
        </Button>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const statusText = getReasonPhrase(statusCode);

  return { statusCode, statusText };
};

export default Error;
