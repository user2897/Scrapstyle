export function cleanAIOutput(text: string): string {
  return text
    .replace(/^```(?:markdown)?\n?/i, '')
    .replace(/\n?```$/i, '')
    .trim();
}

function extractBrandNames(url: string): string[] {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;
    
    const domain = hostname
      .replace(/^www\./i, '')
      .replace(/\.(com|io|co|org|net|dev|app|ai)$/i, '');
    
    const parts = domain.split(/[.-]/);
    const names: string[] = [];
    
    if (domain) names.push(domain);
    
    parts.forEach(part => {
      if (part.length > 2) {
        names.push(part);
        names.push(part.charAt(0).toUpperCase() + part.slice(1));
      }
    });
    
    if (parts.length > 0) {
      const capitalized = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
      names.push(capitalized);
    }
    
    return [...new Set(names)];
  } catch {
    return [];
  }
}

export function removeBrandNames(text: string, url: string): string {
  const brandNames = extractBrandNames(url);
  
  let result = text;
  
  brandNames.forEach(name => {
    if (name.length < 3) return;
    const regex = new RegExp(`\\b${name}\\b`, 'gi');
    result = result.replace(regex, '[Brand]');
  });
  
  result = result.replace(/\[Brand\]('s)?\s*(website|site|page|style|design|brand)/gi, 'the website');
  result = result.replace(/\[Brand\]-style/gi, 'this style');
  result = result.replace(/like\s+\[Brand\]/gi, 'like this design');
  result = result.replace(/\[Brand\]/g, 'the site');
  
  return result;
}
