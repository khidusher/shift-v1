import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';

const academicLevels = new Set(['100', '200', '300', '400', 'postgrad']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s.-]{7,30}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function optionalText(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 8192) {
    return NextResponse.json(
      { error: 'The submitted information is too large.' },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Please submit valid form information.' },
        { status: 400 },
      );
    }
    throw error;
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { error: 'Please submit valid form information.' },
      { status: 400 },
    );
  }

  const fullName = optionalText(body.full_name);
  const phone = optionalText(body.phone);
  const email = optionalText(body.email);
  const academicLevel = optionalText(body.academic_level);
  const department = optionalText(body.department);

  const invalidFields: string[] = [];
  if (!fullName || fullName.length < 2 || fullName.length > 120) {
    invalidFields.push('full name');
  }
  if (
    !phone ||
    !phonePattern.test(phone) ||
    phone.replace(/\D/g, '').length < 7
  ) {
    invalidFields.push('phone number');
  }
  if (email !== null && (email.length > 254 || !emailPattern.test(email))) {
    invalidFields.push('email address');
  }
  if (!academicLevel || !academicLevels.has(academicLevel)) {
    invalidFields.push('current level');
  }
  if (department !== null && department.length > 120) {
    invalidFields.push('department / field of study');
  }

  if (invalidFields.length > 0) {
    console.warn('Registration validation failed:', invalidFields.join(', '));
    return NextResponse.json(
      { error: `Please check: ${invalidFields.join(', ')}.` },
      { status: 400 },
    );
  }

  const { client: supabase, error: configurationError } =
    getSupabaseAdminClient();
  if (configurationError === 'missing') {
    return NextResponse.json(
      { error: 'Registration is not configured yet. Please try again later.' },
      { status: 503 },
    );
  }
  if (!supabase || configurationError === 'invalid') {
    return NextResponse.json(
      { error: 'Registration is not configured correctly.' },
      { status: 503 },
    );
  }

  const { error } = await supabase.from('shift_registrations').insert({
    full_name: fullName,
    phone,
    email,
    academic_level: academicLevel,
    department,
  });

  if (error) {
    console.error('Supabase registration insert failed:', error.message);
    return NextResponse.json(
      { error: 'We could not save your registration. Please try again later.' },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: 'Your registration was received. Thank you!' },
    { status: 201 },
  );
}
