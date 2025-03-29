import { prisma } from '@/lib/db';

const DAILY_PROMPT_LIMIT = 3;

export async function checkPromptLimit(userId: string): Promise<{
  canUsePrompt: boolean;
  remainingPrompts: number;
  totalUsed: number;
}> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let userPrompt = await prisma.userPrompt.findUnique({
    where: { userId }
  });

  // If no record exists, create one
  if (!userPrompt) {
    userPrompt = await prisma.userPrompt.create({
      data: {
        userId,
        promptCount: 0,
        lastResetDate: today
      }
    });
  }

  // Check if we need to reset the counter (new day)
  if (userPrompt.lastResetDate < today) {
    userPrompt = await prisma.userPrompt.update({
      where: { userId },
      data: {
        promptCount: 0,
        lastResetDate: today
      }
    });
  }

  return {
    canUsePrompt: userPrompt.promptCount < DAILY_PROMPT_LIMIT,
    remainingPrompts: DAILY_PROMPT_LIMIT - userPrompt.promptCount,
    totalUsed: userPrompt.promptCount
  };
}

export async function incrementPromptCount(userId: string): Promise<void> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.userPrompt.upsert({
    where: { userId },
    create: {
      userId,
      promptCount: 1,
      lastResetDate: today
    },
    update: {
      promptCount: {
        increment: 1
      }
    }
  });
} 