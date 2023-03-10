import { render } from '@testing-library/react';
import DeleteFailPage from '../../../../pages/delete/failed';

describe('Deleted Account Page', () => {
  it('renders without crashing', async () => {
    const rendered = render(<DeleteFailPage />);
    const icon = await rendered.findByTestId('icon');

    expect(icon.getAttribute('data-icon')).toBe('times-circle');
    expect(rendered.baseElement).toHaveTextContent(
      'Account could not be deleted!'
    );
  });
});
