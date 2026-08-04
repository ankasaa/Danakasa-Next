import type { ReactNode } from "react";

function renderInline(text: string, prefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
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
    } else {
      nodes.push(
        <em key={`${prefix}-em-${index}`} className="italic">
          {token.slice(1, -1)}
        </em>,
      );
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
        /^([-*]|\d+\.)\s/.test(next)
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
