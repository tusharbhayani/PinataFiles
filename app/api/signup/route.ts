import { NextResponse } from 'next/server';
import { supabase } from '../../../supabaseClient';

export async function POST(req: Request) {
  const { email, password, organizationName, org_did, firstName, lastName } = await req.json();

  try {
    // Check if email is already registered
    const { data: existingUser, error: checkError } = await supabase
      .from('Users')
      .select('*')
      .eq('Email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'Email is already registered.' }, { status: 400 });
    }

    if (checkError && checkError.code !== 'PGRST116') {
      return NextResponse.json({ error: 'Error checking user existence.' }, { status: 500 });
    }

    // Insert user information into the Users table without signing up with Supabase Auth
    const userData = organizationName && !firstName
      ? {
          Email: email,
          First_Name: firstName,
          org_did,
          Password: password,
          isOrg: 'true',
        }
      : {
          First_Name: firstName,
          Last_Name: lastName,
          Email: email,
          Password: password,
          Organization_Name: organizationName, // Store organization name for employee
          isOrg: 'false',
        };

    const { error: insertError } = await supabase.from('Users').insert([userData]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'User registered successfully!' }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
