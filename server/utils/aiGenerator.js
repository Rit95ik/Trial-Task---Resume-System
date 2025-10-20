/**
 * AI-Enhanced Resume Summary Generator
 * Generates professional, recruiter-ready resume summaries
 * Supports both OpenAI integration and intelligent fallback algorithm
 */

const axios = require('axios');

/**
 * Action verbs for different roles and contexts
 */
const actionVerbs = {
  technical: ['engineered', 'architected', 'developed', 'optimized', 'implemented', 'designed', 'built'],
  leadership: ['led', 'managed', 'coordinated', 'directed', 'spearheaded', 'mentored', 'orchestrated'],
  creative: ['created', 'designed', 'conceptualized', 'crafted', 'innovated', 'revolutionized'],
  analytical: ['analyzed', 'evaluated', 'assessed', 'researched', 'investigated', 'strategized']
};

/**
 * Professional adjectives for impact
 */
const impactAdjectives = [
  'results-driven', 'innovative', 'detail-oriented', 'motivated', 'accomplished',
  'versatile', 'dedicated', 'skilled', 'experienced', 'proficient',
  'dynamic', 'creative', 'analytical', 'strategic', 'passionate'
];

/**
 * Determine role category based on skills and experience
 */
function categorizeRole(skills, experience) {
  const skillsLower = skills.map(s => s.toLowerCase()).join(' ');
  const expLower = experience.map(e => e.role?.toLowerCase() || '').join(' ');
  const combined = skillsLower + ' ' + expLower;

  if (combined.match(/react|angular|vue|frontend|ui|ux/i)) return 'Frontend Developer';
  if (combined.match(/node|express|django|flask|backend|api/i)) return 'Backend Developer';
  if (combined.match(/full.?stack|mern|mean/i)) return 'Full Stack Developer';
  if (combined.match(/data|analytics|machine.?learning|ml|ai/i)) return 'Data Scientist';
  if (combined.match(/devops|aws|azure|kubernetes|docker/i)) return 'DevOps Engineer';
  if (combined.match(/mobile|react.?native|flutter|ios|android/i)) return 'Mobile Developer';
  if (combined.match(/design|figma|sketch|adobe/i)) return 'Designer';
  if (combined.match(/product|manager|scrum|agile/i)) return 'Product Manager';
  
  return 'Software Developer';
}

/**
 * Generate context-aware summary using OpenAI API
 */
async function generateWithOpenAI(userData) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'your-openai-api-key-here') {
    return null;
  }

  try {
    const prompt = `Create a professional resume summary in FIRST PERSON (I, my, me) for a candidate with:
    
Role/Title: ${userData.role || 'Professional'}
Skills: ${userData.skills.join(', ')}
Experience: ${userData.experience.map(e => `${e.role} at ${e.company}`).join(', ')}
Projects: ${userData.projects.map(p => p.title).join(', ')}
Education: ${userData.education.map(e => `${e.degree} from ${e.institution}`).join(', ')}

REQUIREMENTS:
- EXACTLY 3 sentences (no more, no less)
- Written in FIRST PERSON perspective ("I am", "I have", "my skills")
- NEVER mention the candidate's name
- Keep each sentence under 25 words
- Highlight key skills, achievements, and career goals
- Sound professional, confident, and engaging
- Total length: approximately 60-75 words

Example: "I am a dedicated Full Stack Developer with expertise in React, Node.js, and MongoDB. I have built scalable applications demonstrating strong problem-solving abilities and technical proficiency. Driven by a passion for innovation, I am eager to contribute to cutting-edge solutions and grow professionally."`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a professional resume writer. Write EXACTLY 3 sentences in first-person. Never use the candidate\'s name. Keep it concise and impactful.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    return null;
  }
}

/**
 * Generate intelligent fallback summary using template system (First Person POV)
 * STRICTLY maintains 3 sentences for consistent length
 */
function generateFallbackSummary(userData) {
  const { skills = [], experience = [], projects = [], education = [] } = userData;
  
  // Determine professional role
  const role = userData.role || categorizeRole(skills, experience);
  
  // Select random impactful adjective
  const adjective = impactAdjectives[Math.floor(Math.random() * impactAdjectives.length)];
  
  // Get years of experience (estimate)
  const yearsExp = experience.length > 0 ? 
    (experience.length > 2 ? `${experience.length}+` : experience.length) : null;
  
  // Key skills (top 4-5 only for brevity)
  const topSkills = skills.slice(0, 5).join(', ');
  
  // Build EXACTLY 3 sentences
  let sentences = [];
  
  // Sentence 1: Professional identity (concise)
  if (yearsExp) {
    sentences.push(`I am ${adjective === 'accomplished' || adjective === 'experienced' ? 'an' : 'a'} ${adjective} ${role} with ${yearsExp} years of experience in ${topSkills}.`);
  } else {
    sentences.push(`I am ${adjective === 'accomplished' || adjective === 'experienced' ? 'an' : 'a'} ${adjective} ${role} with strong expertise in ${topSkills}.`);
  }
  
  // Sentence 2: Achievements and experience (brief)
  if (projects.length > 0) {
    const verb = actionVerbs.technical[Math.floor(Math.random() * actionVerbs.technical.length)];
    sentences.push(`I have ${verb} successful projects demonstrating problem-solving abilities and technical proficiency.`);
  } else if (experience.length > 0) {
    sentences.push(`With proven experience in building scalable solutions, I bring technical expertise and innovation to every project.`);
  } else if (education.length > 0) {
    const degree = education[0].degree?.split(' ')[0] || 'degree';
    sentences.push(`Possessing ${degree.match(/bachelor|master|phd/i) ? 'a' : ''} ${degree}, I combine academic knowledge with practical skills.`);
  } else {
    sentences.push(`I have developed strong technical and analytical skills through hands-on learning and practice.`);
  }
  
  // Sentence 3: Career goals and passion (compact)
  const qualities = ['innovation', 'continuous learning', 'technological excellence', 'professional growth'];
  const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
  
  if (yearsExp) {
    sentences.push(`Driven by a passion for ${randomQuality}, I am committed to delivering impactful results.`);
  } else {
    sentences.push(`Motivated by ${randomQuality}, I am eager to contribute and grow in a dynamic environment.`);
  }
  
  // Return exactly 3 sentences
  return sentences.slice(0, 3).join(' ');
}

/**
 * Main function to generate resume summary
 * @param {Object} userData - User's resume data
 * @returns {Promise<string>} Generated summary
 */
async function generateResumeSummary(userData) {
  // Validate input (name not required anymore)
  if (!userData) {
    throw new Error('User data is required');
  }

  // Try OpenAI first
  const openAISummary = await generateWithOpenAI(userData);
  if (openAISummary) {
    return openAISummary;
  }

  // Fallback to intelligent template-based generation
  return generateFallbackSummary(userData);
}

module.exports = {
  generateResumeSummary,
  generateFallbackSummary,
  generateWithOpenAI
};
