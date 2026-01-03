import './App.css'

function App() {

  return (
    <div>
      <section className='NavBar'>
        <ul className='NavItems'>
          <li>Megan Jacob</li>
          <li>About</li>
          <li>Experience</li>
          <li>Projects</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </section>

      <section className='Hero'>
        <div className='HeroText'>
          <h1>Hi, my name is Megan Jacob</h1>
          <h2>I am an aspiring Frontend Developer</h2>
          <p>A passionate developer with expertise 
            in Next.js and React. Currently pursuing
            a bachelors in Computer Science and a
            minor in Informatics at the University 
            of Illinois Urbana-Champaign.
          </p>
          <ul className='QuickLinks'>
            <li>View my work</li>
            <li>Resume</li>
          </ul>
        </div>

        <div className='HeroImage'>
          <img src="/headshot.jpeg" alt="headshot" />
        </div>
      </section>

      <section className='FeaturedProj'>
        <h2 className='SectionTitle'>Featured Projects</h2>
        <div className='ProjectGrid'>
          <div className='ProjectCard'>
            <img src="" alt="" />
            <h3>Project One</h3>
            <p>Short description of the project.</p>
          </div>

          <div className='ProjectCard'>
            <img src="" alt="" />
            <h3>Project Two</h3>
            <p>Short description of the project.</p>
          </div>

          <div className='ProjectCard'>
            <img src="" alt="" />
            <h3>Project Three</h3>
            <p>Short description of the project.</p>
          </div>
        </div>
        <p className='OtherProj'>View Other Projects</p>
      </section>

      <section className='TechSkills'>
        <h2>Technical Skills</h2>
        <p>My expertise across various technology and tools</p>
        <div className='TechGrid'>
          <div className='TechCard'>
            <h3>Languages</h3>
          </div>

          <div className='TechCard'>
            <h3>Frameworks/Libraries</h3>
          </div>

          <div className='TechCard'>
            <h3>ML/Data</h3>
          </div>
          <div className='TechCard'>
            <h3>Cloud/DevOps</h3>
          </div>

          <div className='TechCard'>
            <h3>Concepts</h3>
          </div>
        </div>
      </section>

      <section className='Footend'>
        <div>
          <h3>Megan Mae Jacob</h3>
          <p>Aspiring Frontend Developer and UI & UX
            Enthusiast based in Chicagoland, specialized
              in making modern web applications.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul className='QuickLinks'>
            <li>About Me</li>
            <li>Projects</li>
            <li>Blog</li>
            <li>Resume</li>
          </ul>
        </div>

        <div>
          <h3>Connect</h3>
          <ul className='ConnectLinks'>
            <li>Github</li>
            <li>Linkdin</li>
            <li>Email</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default App
