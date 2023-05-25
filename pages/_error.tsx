import { getReasonPhrase } from 'http-status-codes';
import { Layout } from '../components';
import Link from 'next/link';

function Error({ statusCode, statusText }) {
  return (
    <Layout>
      <h1 className="text-xl font-bold text-center md:text-2xl lg:text-4xl">
        {statusCode}
      </h1>
      <h3 className="py-4 text-base text-center md:text-xl lg:text-2xl lg:py-8">
        {statusText}
      </h3>
      <div className="flex items-center justify-center">
        <Link
          href="/"
          target="_self"
          className="mx-auto text-center"
          rel="noopener noreferrer">
          Go to Home Page
        </Link>
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
