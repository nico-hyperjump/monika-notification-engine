import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Layout, TextInput, CountryPhoneInput, Button } from '../components';
import HomeTab from '../components/home-tab';
import Notes from '../components/notes';

const emptyNameErrorMessage = 'Name must not be empty';
const emptyPhoneErrorMessage = 'Phone must not be empty';
const countryCodePhoneErrorMessage =
  'Phone must starts with valid country code';

export default function IndexPage(): JSX.Element {
  const router = useRouter();
  const tab = router.query.tab;

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string>('');
  const [isResend, setIsResend] = useState<boolean>(false);

  useEffect(() => {
    if (tab === 'resend-instruction') setIsResend(true);
    else setIsResend(false);
  }, [tab]);

  const validateInput = () => {
    let isInputValid = true;
    if (!isResend && (!name || name.trim().length === 0)) {
      isInputValid = false;
      setNameError(emptyNameErrorMessage);
    }
    if (!phone || phone.trim().length === 0) {
      isInputValid = false;
      setPhoneError(emptyPhoneErrorMessage);
    }
    return isInputValid;
  };

  const handleNext = async () => {
    setRegisterError('');
    const isValid = validateInput();
    if (isValid) {
      setLoading(true);
      axios
        .post('/api/register', {
          name,
          phone: `+${phone}`,
        })
        .then(() => {
          router.push('/confirm');
        })
        .catch((error) => {
          setRegisterError(error?.response?.data?.message);
          setLoading(false);
          setIsResend(true);
        });
    }
  };

  const handleResend = async () => {
    setRegisterError('');
    const isValid = validateInput();
    if (isValid) {
      axios
        .post('/api/resend', {
          name,
          phone: `+${phone}`,
        })
        .then(() => {
          router.push('/confirmed');
        })
        .catch((error) => {
          setRegisterError(error?.response?.data?.message);
        });
    }
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-8 lg:space-y-16">
        <div className="w-full md:w-8/12 lg:w-6/12">
          <HomeTab />
          <h1 className="text-xl mt-6 md:text-2xl lg:text-4xl font-bold">
            Get WhatsApp message from Monika when your website is down.{' '}
            <i>It’s FREE!</i>
          </h1>
        </div>
        <div className="w-full md:w-8/12 lg:w-6/12 space-y-8">
          {tab === 'register' && (
            <TextInput
              data-testid="name-input"
              label="Please enter your name"
              onChange={(e) => {
                setNameError('');
                setName(e.target.value);
              }}
              errorMessage={nameError}
            />
          )}
          <CountryPhoneInput
            label="Please enter your WhatsApp phone number. We will send a message to confirm your number."
            handleChangeValue={(value) => {
              setPhoneError('');
              setPhone(value);
            }}
            errorMessage={phoneError}
            handleNotValid={() => setPhoneError(countryCodePhoneErrorMessage)}
          />
          {!!registerError && (
            <div className="flex">
              <FontAwesomeIcon className="m-1 ml-0" icon={faTimesCircle} />
              <p className="font-bold">{registerError}</p>
            </div>
          )}
          {!isResend && (
            <Button
              data-testid="submit-button"
              disabled={loading}
              onClick={() => handleNext()}>
              {loading ? 'Loading...' : 'Next'}
            </Button>
          )}
          {isResend && (
            <Button
              data-testid="resend-button"
              disabled={loading}
              onClick={() => handleResend()}>
              {loading ? 'Loading...' : 'Resend Instruction'}
            </Button>
          )}
        </div>
        <Notes />
      </div>
    </Layout>
  );
}
