import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Button,
  Layout,
  Select,
  SelectOption,
  TextInput,
} from '../../components';
import HomeTab from '../../components/home-tab';
import cfg from '../../config';
import { actions } from '../../services/internal/actions';
import Notes from '../../components/notes';

const explanation = {
  [actions.start]:
    'When Monika is started, it will send a notification to make sure the configuration is correct.',
  [actions.incident]:
    'When the website Monika is monitoring down (status code not 2xx), it will send a notification to notify about the incident.',
  [actions.recovery]:
    'When the website Monika is monitoring recover from an incident, it will send a notification to notify about the recovery.',
  [actions.terminate]:
    'When Monika is terminated, it will send a notification to notify about the termination.',
  [actions.status_update]:
    'When Monika is configured with status update schedule, it will send status notification periodically based on the schedule.',
};

export default function IndexPage(): JSX.Element {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [type, setType] = useState(actions.start);
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Webhook URL Validator
  const validateWebhookURL = (url: string) => {
    if (!url.startsWith(`${cfg.publicBaseURL}/api/notify?token=`)) {
      setValid(false);
      throw Error('Please provide a valid Webhook URL');
    } else {
      setValid(true);
    }
  };

  const handleNext = async () => {
    try {
      // Validate webhook url before parsing
      validateWebhookURL(url);

      // Get the token from the Webhook URL
      const webhookURL = new URL(url);
      const search = new URLSearchParams(webhookURL.search);
      const token = search.get('token');

      // Hit the Test Webhook API
      const data = await fetch(`/api/test-webhook/${type}?token=${token}`, {
        method: 'POST',
      });
      const result = await data.json();
      const { message } = result;

      // Check if the test success/not
      if (message === 'SUCCESS') {
        router.push('/test-webhook/success');
      } else {
        router.push('/test-webhook/failed');
      }
    } catch (error) {
      // If there is an error thrown, set errorMessage to error message.
      if (error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          'There is something wrong when submitting the form. Please try again.'
        );
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-8 lg:space-y-16">
        <div className="w-full md:w-8/12 lg:w-6/12 space-y-8">
          <HomeTab />
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
            Test your Webhook
          </h1>
          <p>
            You can test your webhook to receive notifications to your Whatsapp
            here.
          </p>
        </div>
        <div className="w-full md:w-8/12 lg:w-6/12 space-y-8">
          <TextInput
            data-testid="webhook-input"
            label="Please enter your Webhook URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Select
            data-testid="type-select"
            label="Please select which notification you want to receive"
            value={type}
            onChange={(e) => setType(e.target.value as actions)}>
            <SelectOption value={actions.start}>Start</SelectOption>
            <SelectOption value={actions.incident}>Incident</SelectOption>
            <SelectOption value={actions.recovery}>Recovery</SelectOption>
            <SelectOption value={actions.status_update}>
              Status Update
            </SelectOption>
            <SelectOption value={actions.terminate}>Terminate</SelectOption>
          </Select>
          <p data-testid="type-explanation">{explanation[type]}</p>
          {!valid && (
            <div className="flex">
              <FontAwesomeIcon className="m-1 ml-0" icon={faTimesCircle} />
              <p className="font-bold">{errorMessage}</p>
            </div>
          )}
          <Button data-testid="submit-button" onClick={() => handleNext()}>
            Test
          </Button>
        </div>
        <Notes />
      </div>
    </Layout>
  );
}
