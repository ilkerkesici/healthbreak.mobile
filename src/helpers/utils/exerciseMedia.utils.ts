import type { Exercise } from 'types/models';

function stringUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const t = value.trim();
  return t.length > 0 ? t : undefined;
}

/**
 * Önce `media_stream` içinde mevcut dil için URL varsa onu kullanır;
 * yoksa `media` içinden locale → en sırasıyla çözümler.
 */
export function resolveExerciseVideoUri(
  exercise: Pick<Exercise, 'media' | 'media_stream'>,
  locale: string,
): string | undefined {
  const stream = exercise.media_stream as
    | Record<string, unknown>
    | null
    | undefined;
  const streamForLocale = stream ? stringUrl(stream[locale]) : undefined;
  if (streamForLocale) return streamForLocale;

  const media = exercise.media as Record<string, unknown> | undefined;
  if (!media) return undefined;
  return stringUrl(media[locale]) ?? stringUrl(media.en);
}
