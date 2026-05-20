import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import BlogPreview from '../components/BlogPreview';

const Home = ({ theme }) => {
  return (
    <main className="pt-20 space-y-32 pb-20">
      <section id="home">
        <Hero theme={theme} />
      </section>

      <section id="portfolio">
        <FeaturedProjects />
      </section>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <section id="about" className="lg:col-span-7">
          <About />
        </section>

        <section id="skills" className="lg:col-span-5">
          <Skills />
        </section>
      </div>

      <section id="blog">
        <BlogPreview />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
};

export default Home;
