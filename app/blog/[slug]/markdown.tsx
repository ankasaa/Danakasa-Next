import type { ReactNode } from "react";

function renderInline(text: string, prefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong
          key={`${prefix}-strong-${index}`}
          className="font-semibold text-ink dark:text-neutral-100"
        >
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("*")) {
      nodes.push(
        <em key={`${prefix}-em-${index}`} className="italic">
          {token.slice(1, -1)}
        </em>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={`${prefix}-code-${index}`}
          className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-brand-600 dark:bg-neutral-800 dark:text-brand-400"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (linkMatch) {
        nodes.push(
          <a
            key={`${prefix}-link-${index}`}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 underline decoration-brand-300 underline-offset-2 transition-colors hover:text-brand-700 dark:text-brand-400 dark:decoration-brand-700"
          >
            {linkMatch[1]}
          </a>,
        );
      }
    }
    index += 1;
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

const HEADING_TAGS = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

const HEADING_CLASSES: Record<keyof typeof HEADING_TAGS, string> = {
  1: "text-3xl font-bold text-ink dark:text-neutral-50",
  2: "text-2xl font-bold text-ink dark:text-neutral-50",
  3: "text-xl font-semibold text-ink dark:text-neutral-50",
  4: "text-lg font-semibold text-ink dark:text-neutral-50",
  5: "text-base font-semibold text-ink dark:text-neutral-50",
  6: "text-sm font-semibold uppercase tracking-wide text-ink dark:text-neutral-50",
};

const BODY_TEXT = "leading-[1.9] text-neutral-600 dark:text-neutral-400";

export function Markdown({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    i += 1;
    if (trimmed === "") continue;

    const heading = /^(#{1,6})\s+(.*)$/.exec(trimmed);
    if (heading) {
      const level = heading[1].length as keyof typeof HEADING_TAGS;
      const Tag = HEADING_TAGS[level];
      blocks.push(
        <Tag key={key} className={HEADING_CLASSES[level]}>
          {renderInline(heading[2], `heading-${key}`)}
        </Tag>,
      );
      key += 1;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines = [trimmed.slice(2)];
      while (i < lines.length) {
        const next = lines[i].trim();
        if (next === "" || !next.startsWith("> ")) break;
        quoteLines.push(next.slice(2));
        i += 1;
      }
      blocks.push(
        <blockquote
          key={key}
          className="my-6 border-l-4 border-brand-300 bg-brand-50/50 py-4 pl-6 pr-4 text-ink italic dark:border-brand-700 dark:bg-brand-900/10 dark:text-neutral-200"
        >
          {quoteLines.map((line, qi) => (
            <p key={qi} className={qi > 0 ? "mt-2" : ""}>
              {renderInline(line, `quote-${key}-${qi}`)}
            </p>
          ))}
        </blockquote>,
      );
      key += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const codeLines: string[] = [];
      while (i < lines.length) {
        const codeLine = lines[i];
        if (codeLine.trim().startsWith("```")) {
          i += 1;
          break;
        }
        codeLines.push(codeLine);
        i += 1;
      }
      blocks.push(
        <pre
          key={key}
          className="my-6 overflow-x-auto rounded-xl bg-neutral-900 p-6 text-sm text-neutral-100 dark:bg-neutral-950"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>,
      );
      key += 1;
      continue;
    }

    const bullet = /^[-*]\s+(.*)$/.exec(trimmed);
    if (bullet) {
      const items = [bullet[1]];
      while (i < lines.length) {
        const itemLine = /^[-*]\s+(.*)$/.exec(lines[i].trim());
        if (!itemLine) break;
        items.push(itemLine[1]);
        i += 1;
      }
      blocks.push(
        <ul
          key={key}
          className="list-disc space-y-2 pl-6 marker:text-brand-500"
        >
          {items.map((item, index) => (
            <li key={index} className={BODY_TEXT}>
              {renderInline(item, `li-${key}-${index}`)}
            </li>
          ))}
        </ul>,
      );
      key += 1;
      continue;
    }

    const ordered = /^\d+\.\s+(.*)$/.exec(trimmed);
    if (ordered) {
      const items = [ordered[1]];
      while (i < lines.length) {
        const itemLine = /^\d+\.\s+(.*)$/.exec(lines[i].trim());
        if (!itemLine) break;
        items.push(itemLine[1]);
        i += 1;
      }
      blocks.push(
        <ol
          key={key}
          className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-brand-600"
        >
          {items.map((item, index) => (
            <li key={index} className={BODY_TEXT}>
              {renderInline(item, `ol-${key}-${index}`)}
            </li>
          ))}
        </ol>,
      );
      key += 1;
      continue;
    }

    const paragraphLines = [trimmed];
    while (i < lines.length) {
      const next = lines[i].trim();
      if (
        next === "" ||
        /^(#{1,6})\s/.test(next) ||
        /^([-*]|\d+\.)\s/.test(next) ||
        next.startsWith("> ") ||
        next.startsWith("```")
      ) {
        break;
      }
      paragraphLines.push(next);
      i += 1;
    }
    blocks.push(
      <p key={key} className={BODY_TEXT}>
        {renderInline(paragraphLines.join(" "), `p-${key}`)}
      </p>,
    );
    key += 1;
  }

  return <>{blocks}</>;
}
