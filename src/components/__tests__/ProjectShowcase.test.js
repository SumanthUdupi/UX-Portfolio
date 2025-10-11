import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectShowcase from '../ProjectShowcase';

// Mock the HorizontalGallery component
jest.mock('../HorizontalGallery', () => () => <div data-testid="horizontal-gallery" />);

describe('ProjectShowcase Component', () => {
  test('renders the component without crashing', () => {
    render(<ProjectShowcase />);
  });

  test('renders the "Projects" heading', () => {
    render(<ProjectShowcase />);
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
  });

  test('renders the HorizontalGallery component', () => {
    render(<ProjectShowcase />);
    expect(screen.getByTestId('horizontal-gallery')).toBeInTheDocument();
  });
});
