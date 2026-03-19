const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function getImagePublicUrl(name: string): string {
  return `${baseUrl}/storage/v1/object/public/email-creatives/images/${name}`;
}
