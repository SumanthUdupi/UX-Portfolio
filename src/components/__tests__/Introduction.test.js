import React from 'react';
import { render, screen } from '@testing-library/react';
import Introduction from '../Introduction';

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

    test('displays the title "UI/UX Designer & Developer"', () => {
        render(<Introduction />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent(/UI\/UX Designer & Developer/i);
    });
});
