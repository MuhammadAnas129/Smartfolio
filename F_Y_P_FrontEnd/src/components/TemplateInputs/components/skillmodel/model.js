const fetch = require('node-fetch');

async function generateSkillTags(jobDescription) {
    const url = 'https://api.openai.com/v1/completions';
    const prompt = `Given the following job description, list the relevant skills:\n\n${jobDescription}\n\nSkills:`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_HUGGING_FACE_API_KEY`
        },
        body: JSON.stringify({
            model: 'text-davinci-003', // You might want to use the latest available model
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        }),
    });

    const data = await response.json();
    console.log(data.choices[0].text);
}

// Example job description
const jobDescription = `Develop scalable web applications using React, Node.js, and GraphQL. Collaborate with cross-functional teams to define, design, and ship new features. Ensure robust and scalable web application performance. Implement security and data protection.`;

generateSkillTags(jobDescription).catch(console.error);
