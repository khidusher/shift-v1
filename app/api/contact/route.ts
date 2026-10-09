import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const topics = new Set(['attendee', 'partnership', 'speaker', 'general']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function trimmedString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 12_288) {
    return NextResponse.json(
      { error: 'The submitted message is too large.' },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Please submit a valid message.' },
        { status: 400 },
      );
    }
    throw error;
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { error: 'Please submit a valid message.' },
      { status: 400 },
    );
  }

  // Silently accept bot submissions without storing or exposing them.
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json(
      { message: 'Your message was received. Thank you!' },
      { status: 201 },
    );
  }

  const fullName = trimmedString(body.name);
  const email = trimmedString(body.email);
  const topic = trimmedString(body.topic);
  const message = trimmedString(body.message);

  const invalidFields: string[] = [];
  if (!fullName || fullName.length < 2 || fullName.length > 120) {
    invalidFields.push('full name');
  }
  if (!email || email.length > 254 || !emailPattern.test(email)) {
    invalidFields.push('email address');
  }
  if (!topic || !topics.has(topic)) {
    invalidFields.push('inquiry topic');
  }
  if (!message || message.length < 10 || message.length > 5000) {
    invalidFields.push('message (10–5000 characters)');
  }

  if (invalidFields.length > 0) {
    console.warn('Contact form validation failed:', invalidFields.join(', '));
    return NextResponse.json(
      { error: `Please check: ${invalidFields.join(', ')}.` },
      { status: 400 },
    );
  }

  const { client: supabase, error: configurationError } =
    getSupabaseAdminClient();
  if (configurationError === 'missing') {
    return NextResponse.json(
      { error: 'Messaging is not configured yet. Please try again later.' },
      { status: 503 },
    );
  }
  if (!supabase || configurationError === 'invalid') {
    return NextResponse.json(
      { error: 'Messaging is not configured correctly.' },
      { status: 503 },
    );
  }

  const { error } = await supabase.from('shift_contact_messages').insert({
    full_name: fullName,
    email,
    topic,
    message,
  });

  if (error) {
    console.error('Supabase contact message insert failed:', error.message);
    return NextResponse.json(
      { error: 'We could not save your message. Please try again later.' },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: 'Your message was received. Thank you!' },
    { status: 201 },
  );
}
