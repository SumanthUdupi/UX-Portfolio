import React from 'react';
import { render, screen } from '@testing-library/react';
import HorizontalGallery from '../HorizontalGallery';
import projectsData from '../../projects';

// Mock the projects data
jest.mock('../../projects', () => ([
    {
        id: 1,
        title: 'Test Project 1',
        description: 'This is a test description for project 1.',
        link: 'https://test-project-1.com',
        imageUrl: 'test-image-1.jpg',
        tags: ['React', 'D3.js']
    },
    {
        id: 2,
        title: 'Test Project 2',
        description: 'This is a test description for project 2.',
        link: 'https://test-project-2.com',
        imageUrl: 'test-image-2.jpg',
        tags: ['Python', 'Flask']
    },
]));

describe('HorizontalGallery Component', () => {
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
        render(<HorizontalGallery />);
    });

    test('renders all mocked projects', () => {
        render(<HorizontalGallery />);
        expect(screen.getAllByText('Test Project 1')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Test Project 2')[0]).toBeInTheDocument();
    });

    test('renders project images with correct src and alt attributes', () => {
        render(<HorizontalGallery />);
        projectsData.forEach(project => {
            const images = screen.getAllByAltText(project.title);
            expect(images[0]).toBeInTheDocument();
            expect(images[0]).toHaveAttribute('src', project.imageUrl);
        });
    });
});
