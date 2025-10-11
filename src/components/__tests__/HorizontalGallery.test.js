import React from 'react';
import { render, screen } from '@testing-library/react';
import HorizontalGallery from '../HorizontalGallery';
import projects from '../../projects';

// Mock the projects data
jest.mock('../../projects', () => ([
  {
    title: 'Test Project 1',
    description: 'This is a test description for project 1.',
    link: 'https://test-project-1.com',
    image: 'test-image-1.jpg',
  },
  {
    title: 'Test Project 2',
    description: 'This is a test description for project 2.',
    link: 'https://test-project-2.com',
    image: 'test-image-2.jpg',
  },
]));

import gsap from 'gsap';

// Mocking gsap and its plugins
jest.mock('gsap');
jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: jest.fn(),
  },
}));

describe('HorizontalGallery Component', () => {
  beforeAll(() => {
    // Mock for lottie-player
    if (window.customElements && !window.customElements.get('lottie-player')) {
      class LottiePlayer extends HTMLElement {}
      window.customElements.define('lottie-player', LottiePlayer);
    }
  });

  beforeEach(() => {
    // Mock for window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Mock for IntersectionObserver
    global.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    // Mock GSAP and its methods
    gsap.registerPlugin = jest.fn();
    gsap.context = jest.fn((fn) => {
      fn();
      return { revert: jest.fn() };
    });
    gsap.matchMedia = jest.fn(() => ({
      add: jest.fn(),
      revert: jest.fn(),
    }));
    gsap.to = jest.fn();
    gsap.fromTo = jest.fn();
    gsap.utils = {
      toArray: jest.fn(selector => {
        const elements = Array.from(document.querySelectorAll(selector));
        return elements.map(el => ({
          ...el,
          querySelector: jest.fn(),
        }));
      }),
    };
  });

  test('renders the component without crashing', () => {
    render(<HorizontalGallery />);
  });

  test('renders all mocked projects', () => {
    render(<HorizontalGallery />);
    expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    expect(screen.getByText('Test Project 2')).toBeInTheDocument();
  });

  test('renders project titles, descriptions, and links correctly', () => {
    render(<HorizontalGallery />);
    const links = screen.getAllByRole('link', { name: /view project/i });
    projects.forEach((project, index) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
      expect(links[index]).toHaveAttribute('href', project.link);
    });
  });

  test('renders project images with correct src and alt attributes', () => {
    render(<HorizontalGallery />);
    projects.forEach(project => {
      const image = screen.getByAltText(project.title);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', project.image);
    });
  });
});
