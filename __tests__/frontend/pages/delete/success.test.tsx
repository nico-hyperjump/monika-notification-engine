import { render } from '@testing-library/react';
import DeletedPage from '../../../../pages/delete/success';

describe('Deleted Account Page', () => {
  it('renders without crashing', async () => {
    const rendered = render(<DeletedPage />);
    const icon = await rendered.findByTestId('icon');

    expect(icon.getAttribute('data-icon')).toBe('check-circle');
    expect(rendered.baseElement).toHaveTextContent('Account Deleted');
  });
});
