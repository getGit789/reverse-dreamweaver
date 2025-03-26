import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY || '',
});

interface ThoughtRequest {
  thought: string;
}

app.post('/api/analyze-thought', async (req: Request<{}, {}, ThoughtRequest>, res: Response) => {
  try {
    const { thought } = req.body;

    if (!thought) {
      return res.status(400).json({ error: 'Thought is required' });
    }

    const prompt = `Analyze this thought and provide a transformative perspective:
    "${thought}"
    
    Consider:
    1. Identify any cognitive distortions or limiting beliefs
    2. Provide an alternative perspective that challenges these patterns
    3. Explain why this new perspective might be helpful
    
    Respond in JSON format with pattern, reversal, and explanation.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in cognitive behavioral therapy and perspective transformation."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to analyze thought' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 