import { render, fireEvent } from '@testing-library/react';
import TestWebhookPage from '../../../../pages/test-webhook/index';
import mockRouter from '../../../../util/test/mock-route';

jest.mock('next/router', () => ({ useRouter: () => mockRouter({}) }));

describe('Test Webhook Page', () => {
  it('should render with start type and the correct explanation', async () => {
    const rendered = render(<TestWebhookPage />);
    const webhookInput = await rendered.findByTestId('webhook-input');
    const typeSelect = await rendered.findByTestId('type-select');
    const typeExplanation = await rendered.findByTestId('type-explanation');

    fireEvent.input(webhookInput, {
      target: { value: 'https://www.github.com' },
    });
    fireEvent.change(typeSelect, { target: { value: 'start' } });

    expect((webhookInput as HTMLInputElement).value).toBe(
      'https://www.github.com'
    );
    expect((typeSelect as HTMLInputElement).value).toBe('start');
    expect((typeExplanation as HTMLParagraphElement).innerHTML).toBe(
      'When Monika is started, it will send a notification to make sure the configuration is correct.'
    );
  });

  it('should render with incident type and the correct explanation', async () => {
    const rendered = render(<TestWebhookPage />);
    const webhookInput = await rendered.findByTestId('webhook-input');
    const typeSelect = await rendered.findByTestId('type-select');
    const typeExplanation = await rendered.findByTestId('type-explanation');

    fireEvent.input(webhookInput, {
      target: { value: 'https://www.github.com' },
    });
    fireEvent.change(typeSelect, { target: { value: 'incident' } });

    expect((webhookInput as HTMLInputElement).value).toBe(
      'https://www.github.com'
    );
    expect((typeSelect as HTMLInputElement).value).toBe('incident');
    expect((typeExplanation as HTMLParagraphElement).innerHTML).toBe(
      'When the website Monika is monitoring down (status code not 2xx), it will send a notification to notify about the incident.'
    );
  });

  it('should render with recovery type and the correct explanation', async () => {
    const rendered = render(<TestWebhookPage />);
    const webhookInput = await rendered.findByTestId('webhook-input');
    const typeSelect = await rendered.findByTestId('type-select');
    const typeExplanation = await rendered.findByTestId('type-explanation');

    fireEvent.input(webhookInput, {
      target: { value: 'https://www.github.com' },
    });
    fireEvent.change(typeSelect, { target: { value: 'recovery' } });

    expect((webhookInput as HTMLInputElement).value).toBe(
      'https://www.github.com'
    );
    expect((typeSelect as HTMLInputElement).value).toBe('recovery');
    expect((typeExplanation as HTMLParagraphElement).innerHTML).toBe(
      'When the website Monika is monitoring recover from an incident, it will send a notification to notify about the recovery.'
    );
  });
});
