export default function ConfirmPage(): JSX.Element {
  return <></>;
}

export async function getServerSideProps(context) {
  // Get the token from query params
  const { params } = context;
  const { token } = params;

  // Check the token
  const result = await fetch(
    `${process.env.BASE_URL}/api/confirm?token=${token}`,
    {
      method: 'POST',
    }
  );
  const data = await result.json();
  const { message } = data;

  // Check token validity
  if (message === 'SUCCESS') {
    return {
      redirect: {
        destination: '/confirmed',
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/expired',
        permanent: false,
      },
    };
  }
}
