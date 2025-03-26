import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

// Helper function to detect if text is primarily Serbian
function isSerbianText(text: string): boolean {
  // Serbian-specific characters (both Cyrillic and Latin scripts)
  const serbianCyrillicChars = /[љњертзуиопшђжасдфгхјклчћџцвбнмЉЊЕРТЗУИОПШЂЖАСДФГХЈКЛЧЋЏЦВБНМ]/;
  const serbianLatinSpecialChars = /[čćžšđČĆŽŠĐ]/;
  
  // Common Serbian words
  const serbianWords = /\b(ja|ti|on|ona|ono|mi|vi|oni|je|su|sam|si|smo|ste|nije|nisu|da|ne|ali|ili|ako|kada|gde|što|kako|jer|preko|između|iznad|ispod|iza|pre|posle)\b/i;
  
  // Check for Serbian characters or words
  const hasSerbianCyrillicChars = serbianCyrillicChars.test(text);
  const hasSerbianLatinSpecialChars = serbianLatinSpecialChars.test(text);
  const hasSerbianWords = serbianWords.test(text);
  
  console.log('Language detection:', { 
    input: text, 
    hasSerbianCyrillicChars, 
    hasSerbianLatinSpecialChars, 
    hasSerbianWords 
  });
  
  // If any Serbian indicators are found, consider it Serbian
  return hasSerbianCyrillicChars || hasSerbianLatinSpecialChars || hasSerbianWords;
}

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { thought } = JSON.parse(event.body || '{}');

    if (!thought) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Thought is required' }),
      };
    }

    // Detect if input is in Serbian
    const isSerbian = isSerbianText(thought);
    console.log('Input detected as:', isSerbian ? 'Serbian' : 'English');
    
    // Set system message based on detected language
    const systemMessage = isSerbian 
      ? `Ti si NunoReverse, AI specijalizovan za preokretanje perspektiva.
Tvoj zadatak je da analiziraš bilo koju datu izjavu, verovanje ili ideju i pružiš dobro obrazloženu ali provokativnu alternativnu perspektivu.
Tvoji odgovori treba da budu logični ali kreativni, održavajući intelektualnu radoznalost bez preteranog kontriranja.
Treba da izbegavaš ekstremne ili uvredljive stavove i fokusiraš se na proširivanje razmišljanja korisnika na neočekivane ali korisne načine.

VAŽNO: Uvek odgovori na SRPSKOM jeziku, a ne na engleskom.

Odgovori kao JSON objekat sa sledećom strukturom:
{
  "pattern": "Kratka identifikacija osnovnog verovanja ili pretpostavke (NA SRPSKOM)",
  "reversal": "Provokativna alternativna perspektiva na SRPSKOM (15-20 reči)",
  "explanation": "Zašto je ova nova perspektiva vredna, NA SRPSKOM (20-25 reči)"
}`
      : `You are NunoReverse, an AI that specializes in reversing perspectives. 
Your task is to take any given statement, belief, or idea and provide a well-reasoned but thought-provoking alternative perspective. 
Your responses should be logical yet creative, maintaining intellectual curiosity without being overly contrarian. 
You should avoid extreme or offensive takes and focus on expanding the user's thinking in unexpected but insightful ways.

Respond with a JSON object using this structure:
{
  "pattern": "Brief identification of the core belief or assumption",
  "reversal": "A thought-provoking alternative perspective (15-20 words)",
  "explanation": "Why this new perspective is valuable (20-25 words)"
}`;

    // Set user message based on detected language
    const userMessage = isSerbian
      ? `Transformiši ovu perspektivu sa promišljenim alternativnim pogledom NA SRPSKOM JEZIKU: "${thought}"`
      : `Transform this perspective with a thoughtful alternative view: "${thought}"`;

    console.log('Using system prompt in:', isSerbian ? 'Serbian' : 'English');

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.85,
      max_tokens: 500,
      top_p: 0.9,
      frequency_penalty: 0.2,
      presence_penalty: 0.4,
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(response.choices[0].message?.content || '{}');
    console.log('AI response:', aiResponse);
    
    // Transform response to match expected format if needed
    const transformedResponse = {
      pattern: aiResponse.pattern,
      reversal: aiResponse.reversal,
      explanation: aiResponse.explanation
    };

    // Validate the response has required fields
    if (!transformedResponse.reversal || !transformedResponse.explanation) {
      throw new Error('Invalid response format from AI');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedResponse),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to analyze thought' }),
    };
  }
}; 