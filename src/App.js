import React from 'react';
import ThemeProvider from './components/ThemeProvider';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Introduction from './components/Introduction';
import SectionDivider from './components/SectionDivider';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import ProjectShowcase from './components/ProjectShowcase';
import HorizontalGallery from './components/HorizontalGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import experienceData from './experienceData';
import projectsData from './projects';

const App = () => {
    return (
        <ThemeProvider>
            <CustomCursor />
            <Header />
            <main>
                <Introduction />
                <div className="container mx-auto px-4">
                    <SectionDivider title="About Me" />
                    <AboutMe />
                    <SectionDivider title="Experience" />
                    <Experience experienceData={experienceData} />
                    <SectionDivider title="Projects" />
                    <ProjectShowcase projectsData={projectsData} />
                    <SectionDivider title="More Projects" />
                    <HorizontalGallery projectsData={projectsData} />
                    <SectionDivider title="Get In Touch" />
                    <Contact />
                </div>
            </main>
            <Footer />
            <BackToTopButton />
        </ThemeProvider>
    );
};

export default App;
