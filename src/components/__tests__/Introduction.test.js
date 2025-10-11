import React from 'react';
import { render, screen } from '@testing-library/react';
import Introduction from '../Introduction';

// Mocking gsap and its plugins
jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  context: (fn) => {
    fn();
    return {
      revert: jest.fn(),
    };
  },
  matchMedia: () => ({
    add: jest.fn(),
    revert: jest.fn(),
  }),
  from: jest.fn(),
  to: jest.fn(),
  utils: {
    toArray: jest.fn(() => []),
  },
}));

jest.mock('gsap/ScrollTrigger', () => ({}));
jest.mock('split-type', () => class SplitType {
    constructor() {
        this.words = [];
    }
});

// Mock the MouseTrail component
jest.mock('../MouseTrail', () => () => <div data-testid="mouse-trail" />);


describe('Introduction Component', () => {
  beforeEach(() => {
    // Mock for window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('renders the component without crashing', () => {
    render(<Introduction />);
  });

  test('displays the name "Sumanth Udupi"', () => {
    render(<Introduction />);
    expect(screen.getByText('Sumanth Udupi')).toBeInTheDocument();
  });

  test('displays the title "UX/UI Designer & Developer"', () => {
    render(<Introduction />);
    expect(screen.getByText('UX/UI Designer & Developer')).toBeInTheDocument();
  });

  test('displays the email link with the correct href', () => {
    render(<Introduction />);
    const emailLink = screen.getByText('sumanthudupi@example.com');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:sumanthudupi@example.com');
  });

  test('renders the GitHub social media link with the correct href', () => {
    render(<Introduction />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/sumanthudupi');
  });

  test('renders the LinkedIn social media link with the correct href', () => {
    render(<Introduction />);
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/sumanth-udupi/');
  });
});
