import { VISION_PROMPT_TEMPLATE, INSTRUCTIONS_TEMPLATE } from './templates';
import { DATA_SUMMARY_PLACEHOLDER } from './constants';

export function buildVisionPrompt(dataSummary: string): string {
  return VISION_PROMPT_TEMPLATE.replace(DATA_SUMMARY_PLACEHOLDER, dataSummary);
}

export function getInstructions(): string {
  return INSTRUCTIONS_TEMPLATE;
}

export { buildDataSummary } from './formatter';
