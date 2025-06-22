// This utility extracts and processes website content for the chatbot

// Extract structured content from the page
const extractStructuredContent = () => {
  try {
    const content = {
      title: document.title.replace(/- Personal Portfolio$/, '').trim(),
      name: '',
      role: '',
      skills: [],
      projects: [],
      experience: [],
      about: '',
      contact: {},
      sections: {}
    };

    // Extract name and role from the hero section
    const heroSection = document.querySelector('.hero, header, section:first-of-type');
    if (heroSection) {
      const nameElement = heroSection.querySelector('h1, .name, .hero-title');
      if (nameElement) content.name = nameElement.textContent.trim();
      
      const roleElement = heroSection.querySelector('h2, .role, .hero-subtitle');
      if (roleElement) content.role = roleElement.textContent.trim();
    }

    // Extract about section
    const aboutSection = document.querySelector('#about, [data-section="about"], section:nth-of-type(2)');
    if (aboutSection) {
      content.about = aboutSection.textContent.trim()
        .replace(/\s+/g, ' ')
        .substring(0, 500);
    }

    // Extract skills
    const skillsSection = document.querySelector('#skills, [data-section="skills"], .skills');
    if (skillsSection) {
      skillsSection.querySelectorAll('.skill, [class*="skill-"], .tech-stack span, li, .skill-item')
        .forEach(skill => {
          const skillText = skill.textContent.trim();
          if (skillText && !content.skills.includes(skillText)) {
            content.skills.push(skillText);
          }
        });
    }

    // Extract projects
    const projectsSection = document.querySelector('#projects, [data-section="projects"], .projects');
    if (projectsSection) {
      projectsSection.querySelectorAll('.project, [class*="project-"], article, .project-card')
        .forEach(project => {
          const title = project.querySelector('h3, h4, .project-title')?.textContent.trim() || 'Project';
          const description = project.querySelector('p, .description, .project-desc')?.textContent.trim() || '';
          const link = project.querySelector('a[href]')?.getAttribute('href') || '';
          
          if (title || description) {
            content.projects.push({
              title,
              description: description.substring(0, 150) // Limit description length
            });
          }
        });
    }


    // Extract contact info (only email and phone)
    const contactSection = document.querySelector('#contact, [data-section="contact"]');
    if (contactSection) {
      const emailLink = contactSection.querySelector('a[href^="mailto:"]');
      if (emailLink) {
        content.contact.email = emailLink.href.replace('mailto:', '');
      }
      const phoneLink = contactSection.querySelector('a[href^="tel:"]');
      if (phoneLink) {
        content.contact.phone = phoneLink.href.replace('tel:', '');
      }
    }

    return content;
  } catch (error) {
    console.error('Error extracting structured content:', error);
    return null;
  }
};

// Process content for the AI
const processContent = (content) => {
  if (!content) return [];

  const knowledge = [];

  // Add basic info
  if (content.name) knowledge.push(`Name: ${content.name}`);
  if (content.role) knowledge.push(`Role: ${content.role}`);
  if (content.title) knowledge.push(`Website: ${content.title}`);

  // Add about section
  if (content.about) {
    knowledge.push(`About: ${content.about}`);
  }

  // Add skills
  if (content.skills.length > 0) {
    knowledge.push(`Skills: ${content.skills.join(', ')}`);
  }

  // Add projects
  if (content.projects.length > 0) {
    knowledge.push('\nProjects:');
    content.projects.forEach((project, index) => {
      knowledge.push(`- ${project.title}: ${project.description.substring(0, 250)}`);
      if (project.link) knowledge.push(`  Link: ${project.link}`);
    });
  }

  // Add experience
  if (content.experience.length > 0) {
    knowledge.push('\nExperience:');
    content.experience.forEach(exp => {
      knowledge.push(`- ${exp.role} at ${exp.company} (${exp.duration}): ${exp.description}`);
    });
  }

  // Add contact info
  if (Object.keys(content.contact).length > 0) {
    knowledge.push('\nContact Information:');
    if (content.contact.email) knowledge.push(`- Email: ${content.contact.email}`);
    if (content.contact.phone) knowledge.push(`- Phone: ${content.contact.phone}`);
    if (content.contact.linkedin) knowledge.push(`- LinkedIn: ${content.contact.linkedin}`);
    if (content.contact.github) knowledge.push(`- GitHub: ${content.contact.github}`);
  }

  return knowledge;
};

// Get knowledge from the current page
const getCurrentPageKnowledge = async () => {
  try {
    const structuredContent = extractStructuredContent();
    return processContent(structuredContent);
  } catch (error) {
    console.error('Error getting page knowledge:', error);
    return [];
  }
};

export { getCurrentPageKnowledge };
