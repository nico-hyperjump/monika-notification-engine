import { render } from '@testing-library/react';
import ConfirmPage from '../../../pages/confirm';

describe('Confirm Account Page', () => {
  it('renders without crashing', async () => {
    const rendered = render(<ConfirmPage />);
    const icon = await rendered.findByTestId('icon');

    expect(icon.getAttribute('data-icon')).toBe('comment-dots');
    expect(rendered.baseElement).toHaveTextContent('Confirm your phone number');
  });
});
