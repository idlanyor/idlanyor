/**
 * Utilitas untuk mengonversi teks berformat Markdown atau HTML WYSIWYG menjadi HTML bersih.
 * Fungsi ini mendeteksi format secara dinamis agar blog mendukung kedua format input secara bersamaan.
 */
export const parseMarkdownToHtml = (content) => {
  if (!content) return '';

  // 1. Deteksi apakah konten adalah HTML WYSIWYG
  // Jika konten sudah memiliki tag blok HTML standar seperti <p>, <h2>, <ul>, atau <div>, 
  // kita anggap konten tersebut adalah HTML WYSIWYG dan langsung dikembalikan (dengan tambahan parsing inline ringan).
  const isHtml = /<p\b[^>]*>|<h[1-6]\b[^>]*>|<div\b[^>]*>|<ul\b[^>]*>|<ol\b[^>]*>|<br\s*\/?>/i.test(content);

  if (isHtml) {
    // Sebagai kenyamanan ekstra, kita tetap bantu parse markdown inline (seperti **bold** atau *italic*) 
    // jika ditulis tidak sengaja di dalam HTML editor.
    return parseInlineMarkdown(content);
  }

  // 2. Jika bukan HTML, maka ini adalah format Markdown mentah.
  // Mari lakukan parsing blok dan baris untuk mengubahnya menjadi HTML standar yang rapi.
  let html = content;

  // Normalisasi baris baru
  html = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Bersihkan spasi kosong berlebih di awal/akhir dokumen
  html = html.trim();

  const lines = html.split('\n');
  let result = [];
  let inList = false;
  let listType = null; // 'ul' or 'ol'
  let inBlockquote = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmedLine = line.trim();

    // --- A. Penanganan Blockquote (>) ---
    if (trimmedLine.startsWith('>')) {
      if (!inBlockquote) {
        // Jika ada list yang sedang aktif, tutup dulu
        if (inList) {
          result.push(`</${listType}>`);
          inList = false;
          listType = null;
        }
        result.push('<blockquote className="border-l-4 border-emerald-500 bg-emerald-500/5 py-3 px-8 rounded-r-2xl italic my-4">');
        inBlockquote = true;
      }
      // Ambil teks setelah tanda '>'
      line = trimmedLine.substring(1).trim();
    } else if (inBlockquote && !trimmedLine) {
      // Baris kosong mengakhiri blockquote
      result.push('</blockquote>');
      inBlockquote = false;
    }

    // --- B. Penanganan List Bullets (- atau * atau +) ---
    const isUnorderedList = /^[*\-+]\s+/.test(trimmedLine);
    const isOrderedList = /^\d+\.\s+/.test(trimmedLine);

    if (isUnorderedList) {
      const listContent = trimmedLine.replace(/^[*\-+]\s+/, '');
      if (!inList || listType !== 'ul') {
        if (inList) result.push(`</${listType}>`);
        result.push('<ul className="list-disc pl-6 space-y-2 my-4">');
        inList = true;
        listType = 'ul';
      }
      result.push(`<li>${parseInlineMarkdown(listContent)}</li>`);
      continue;
    }

    if (isOrderedList) {
      const listContent = trimmedLine.replace(/^\d+\.\s+/, '');
      if (!inList || listType !== 'ol') {
        if (inList) result.push(`</${listType}>`);
        result.push('<ol className="list-decimal pl-6 space-y-2 my-4">');
        inList = true;
        listType = 'ol';
      }
      result.push(`<li>${parseInlineMarkdown(listContent)}</li>`);
      continue;
    }

    // Jika baris saat ini bukan item list, tapi list sedang aktif, maka tutup tag list
    if (inList && !isUnorderedList && !isOrderedList) {
      result.push(`</${listType}>`);
      inList = false;
      listType = null;
    }

    // Mengabaikan baris kosong, tapi jika di dalam blockquote tutup dulu blockquote-nya
    if (!trimmedLine) {
      if (inBlockquote) {
        result.push('</blockquote>');
        inBlockquote = false;
      }
      continue;
    }

    // --- C. Penanganan Headers (#) ---
    if (trimmedLine.startsWith('#')) {
      const match = trimmedLine.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const headerText = parseInlineMarkdown(match[2]);
        result.push(`<h${level} className="text-slate-900 dark:text-white font-black tracking-tight mt-6 mb-4">${headerText}</h${level}>`);
        continue;
      }
    }

    // --- D. Baris Paragraf Biasa ---
    // Pastikan tidak merusak tag blockquote yang sedang aktif
    const parsedLine = parseInlineMarkdown(line);
    result.push(`<p className="leading-relaxed mb-4">${parsedLine}</p>`);
  }

  // Bersihkan sisa tag yang belum tertutup di akhir dokumen
  if (inList) {
    result.push(`</${listType}>`);
  }
  if (inBlockquote) {
    result.push('</blockquote>');
  }

  return result.join('\n');
};

/**
 * Memproses elemen inline markdown seperti bold (**), italic (*), links ([]()), dan inline code (`)
 */
function parseInlineMarkdown(text) {
  if (!text) return '';

  let html = text;

  // 1. Escape HTML dasar secara aman kecuali tag yang sudah ada
  // (untuk menghindari injeksi skrip berbahaya pada markdown murni)

  // 2. Bold: **text** atau __text__ -> <strong>text</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

  // 3. Italic: *text* atau _text_ -> <em>text</em>
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // 4. Inline Code: `code` -> <code class="text-emerald-500 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">code</code>
  html = html.replace(/`(.*?)`/g, '<code class="text-emerald-500 dark:text-amber-400 font-mono bg-emerald-500/10 dark:bg-amber-500/10 px-1.5 py-0.5 rounded text-xs">$1</code>');

  // 5. Links: [text](url) -> <a href="url" target="_blank" rel="noopener" class="text-emerald-500 hover:underline">text</a>
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-emerald-500 dark:text-amber-400 font-bold hover:underline">$1</a>');

  return html;
}
