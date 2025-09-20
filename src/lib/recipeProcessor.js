export function processRecipeText(text) {
  // 1. Preparação Inicial do Texto
  // Remove o prefixo "Ingredientes:" e quebra o texto em possíveis itens.
  let items = text.replace(/^ingredientes:/i, '').trim();

  // Se for uma linha única longa, tenta dividir por vírgulas ou "e".
  // A regex `split` agora é mais robusta para não quebrar em momentos errados.
  if (!items.includes('\n') && items.length > 50) {
    items = items.split(/\s*,\s*(?![^()]*\))|\s+e\s+/);
  } else {
    items = items.split(/\r?\n/);
  }

  const processedIngredients = items.map(item => {
    let cleanedItem = item.trim();

    // 2. Limpeza Robusta de cada item
    // Sequência de substituições para limpar o item passo a passo.

    // Remove quantidades (números, frações, palavras como "uma")
    cleanedItem = cleanedItem.replace(/^[\d/]+|uma|duas/i, '').trim();

    // Remove unidades e descrições comuns (xícaras, colheres, a gosto, etc.)
    cleanedItem = cleanedItem.replace(/^(xícaras?|colher(es)?|gramas|ml|litros?|pitada|unidades?|dentes?|fatias?|copos?|pacotes?|latas?|gotas?|tabletes?|ramos?|folhas?|pedaços?|punhados?|g|kg|mg|l|un|xíc|col|chá|sopa|café|rasa|cheia|grande|pequena|médio|fino|grosso|a gosto|quanto baste|qb|cerca de)?/i, '').trim();

    // Remove qualquer texto entre parênteses, como (sopa) ou (chá)
    cleanedItem = cleanedItem.replace(/\(.*?\)/g, '').trim();

    // Remove palavras de ligação no início (de, da, do)
    cleanedItem = cleanedItem.replace(/^(de|da|do|para)\s+/i, '').trim();

    // Remove qualquer lixo restante no final (ex: "a gosto", "picado")
    cleanedItem = cleanedItem.replace(/\s+(a gosto|picado|ralado|fatiado|inteiro|moído|peneirado|fresco|seco)$/i, '').trim();

    // 3. Finalização
    // Capitaliza a primeira letra do resultado limpo.
    if (cleanedItem.length > 1) {
      return cleanedItem.charAt(0).toUpperCase() + cleanedItem.slice(1);
    }

    return null; // Retorna null para itens inválidos
  });

  // 4. Filtragem Final
  // Remove itens nulos, vazios, duplicados e títulos óbvios.
  const finalIngredients = [...new Set(processedIngredients)].filter(item => {
    if (!item) return false;
    const lowerItem = item.toLowerCase();
    const forbiddenWords = ["modo de preparo", "ingredientes", "preparo", "rendimento", "tempo", "calorias", "porções"];
    return !forbiddenWords.some(word => lowerItem.includes(word));
  });

  return finalIngredients;
}
