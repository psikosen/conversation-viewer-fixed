import { Conversation } from './fileReader';

type UnknownRecord = Record<string, unknown>;

function isObject(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' ? value : fallback;
}

// Detect if data already matches our Conversation[] shape
function isOurConversationArray(data: unknown): data is Conversation[] {
  if (!Array.isArray(data)) return false;
  return data.every((c) => {
    if (!isObject(c)) return false;
    const meta = (c as { meta?: unknown }).meta;
    const chats = (c as { chats?: unknown }).chats;
    const hasMeta = isObject(meta) && typeof (meta as { title?: unknown }).title === 'string' && typeof (meta as { exported_at?: unknown }).exported_at === 'string';
    const hasChats = Array.isArray(chats);
    return hasMeta && hasChats;
  });
}

// Detect OpenAI/ChatGPT export shape (array of conversations with mapping)
function isChatGPTExport(data: unknown): data is UnknownRecord[] {
  if (!Array.isArray(data)) return false;
  return data.some((item) => isObject(item) && 'mapping' in item);
}

export function normalizeToConversations(data: unknown): Conversation[] {
  // If { conversations: [...] }, unwrap first
  if (isObject(data) && Array.isArray((data as { conversations?: unknown }).conversations)) {
    const inner = (data as { conversations?: unknown }).conversations as unknown[];
    if (isOurConversationArray(inner)) return inner;
    if (isChatGPTExport(inner)) return convertFromChatGPT(inner);
  }

  // If array at top-level
  if (isOurConversationArray(data)) return data;
  if (isChatGPTExport(data)) return convertFromChatGPT(data as UnknownRecord[]);

  // Unknown shape
  throw new Error('Unsupported conversations data format');
}

function convertFromChatGPT(items: UnknownRecord[]): Conversation[] {
  return items.map((item) => {
    const title = asString((item as { title?: unknown }).title, 'Untitled Conversation');
    const exportedAt = toIsoTime((item as { update_time?: unknown; create_time?: unknown }).update_time ?? (item as { create_time?: unknown }).create_time);

    const mapping = isObject((item as { mapping?: unknown }).mapping) ? ((item as { mapping?: unknown }).mapping as UnknownRecord) : {};
    const messages: Array<{
      id?: string;
      role?: string;
      create_time?: number;
      content?: { content_type?: string; parts?: unknown[] };
    }> = [];

    for (const key of Object.keys(mapping)) {
      const node = mapping[key] as UnknownRecord;
      const msg = (node && isObject(node.message)) ? (node.message as UnknownRecord) : null;
      if (isObject(msg)) {
        const author = isObject((msg as { author?: unknown }).author) ? ((msg as { author?: unknown }).author as UnknownRecord) : {};
        const role = asString((author as { role?: unknown }).role, 'assistant');
        const content = isObject((msg as { content?: unknown }).content) ? ((msg as { content?: unknown }).content as UnknownRecord) : {};
        const parts = Array.isArray((content as { parts?: unknown }).parts) ? ((content as { parts?: unknown }).parts as unknown[]) : [];
        messages.push({
          id: asString((msg as { id?: unknown }).id),
          role,
          create_time: asNumber((msg as { create_time?: unknown }).create_time),
          content: { content_type: asString((content as { content_type?: unknown }).content_type), parts },
        });
      }
    }

    // Sort by timestamp; fallback to original insertion order
    messages.sort((a, b) => (asNumber(a.create_time) || 0) - (asNumber(b.create_time) || 0));

    const chats: Conversation['chats'] = [];
    let index = 0;
    for (const m of messages) {
      const role = (m.role || 'assistant').toLowerCase();
      const type: 'prompt' | 'response' = role === 'user' ? 'prompt' : 'response';
      const text = toText(m.content?.parts);
      if (text.trim().length === 0) continue;
      chats.push({
        index: index++,
        type,
        message: [
          {
            type: 'p',
            data: text,
          },
        ],
      });
    }

    return {
      meta: {
        title,
        exported_at: exportedAt,
      },
      chats,
    };
  });
}

function toIsoTime(ts: unknown): string {
  if (typeof ts === 'number' && isFinite(ts)) {
    // seconds epoch
    return new Date(ts * 1000).toISOString();
  }
  if (typeof ts === 'string') {
    const d = new Date(ts);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  return new Date().toISOString();
}

function toText(parts: unknown): string {
  if (!Array.isArray(parts)) return '';
  return parts
    .map((p) => {
      if (typeof p === 'string') return p;
      if (isObject(p) && typeof (p as { text?: unknown }).text === 'string') {
        return (p as { text?: unknown }).text as string;
      }
      return '';
    })
    .filter((s): s is string => typeof s === 'string' && s.length > 0)
    .join('\n\n');
}


