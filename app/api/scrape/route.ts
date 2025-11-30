import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { scrapeWithBrowser } from './lib/browser';
import { buildDataSummary, buildVisionPrompt, getInstructions } from './lib/prompt';
import { cleanAIOutput, removeBrandNames } from './lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { url, apiKey } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 401 });
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const scrapeResult = await scrapeWithBrowser(url);

    const dataSummary = buildDataSummary(scrapeResult.extractedData);
    const prompt = buildVisionPrompt(dataSummary);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const imageParts = [
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: scrapeResult.screenshots.top.toString('base64'),
        },
      },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: scrapeResult.screenshots.middle.toString('base64'),
        },
      },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: scrapeResult.screenshots.full.toString('base64'),
        },
      },
    ];

    let result;
    try {
      result = await model.generateContent([prompt, ...imageParts]);
    } catch (aiError) {
      const errorMessage = aiError instanceof Error ? aiError.message : 'AI generation failed';
      
      if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('API key')) {
        return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
      }
      
      throw aiError;
    }

    let generatedGuide = cleanAIOutput(result.response.text());
    generatedGuide = removeBrandNames(generatedGuide, url);

    const styleGuide = getInstructions() + generatedGuide;

    return NextResponse.json({
      styleGuide,
      designTokens: {
        colors: scrapeResult.extractedData.allColors,
        fonts: scrapeResult.extractedData.typography.body?.fontFamily
          ? [scrapeResult.extractedData.typography.body.fontFamily]
          : [],
        cssVariables: scrapeResult.extractedData.cssVariables,
      },
    });
  } catch (error) {
    console.error('Scrape error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
