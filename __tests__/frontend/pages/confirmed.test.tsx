import { render } from '@testing-library/react';
import ConfirmedPage from '../../../pages/confirmed';

describe('Confirmed Account Page', () => {
  it('renders without crashing', async () => {
    const rendered = render(<ConfirmedPage />);
    const icon = await rendered.findByTestId('icon');

    expect(icon.getAttribute('data-icon')).toBe('check-circle');
    expect(rendered.baseElement).toHaveTextContent('Phone number confirmed!');
    expect(rendered.baseElement).toHaveTextContent(
      'Register another phone number'
    );
    expect(rendered.baseElement).toHaveTextContent('Test your webhook');
  });
});
