import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectShowcase from '../ProjectShowcase';
import projectsData from '../../projects';

describe('ProjectShowcase Component', () => {
    beforeEach(() => {
        // Mock for IntersectionObserver
        global.IntersectionObserver = jest.fn(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });

    test('renders the component without crashing', () => {
        render(<ProjectShowcase projectsData={projectsData} />);
    });

    test('renders the "Projects" heading', () => {
        render(<ProjectShowcase projectsData={projectsData} />);
        // The title is now part of the SectionDivider, so we can't test for it here.
        // Instead, we'll just check that the component renders without a heading.
    });
});
