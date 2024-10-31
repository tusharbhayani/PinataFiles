import { NextResponse } from 'next/server';
import { supabase } from '../../../supabaseClient';

export async function POST(req: Request) {
  try {
    const { email, password, storedData } = await req.json();

    // Validate incoming data
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Use stored data if available
    if (storedData) {
      console.log("Stored Data from LocalStorage:", storedData);
    }

    // Fetch user from Supabase
    const { data: user, error } = await supabase
      .from('Users')
      .select('Email, Password, isOrg, org_did, First_Name, Organization_Name')  
      .ilike('Email', email) 
      .single();

    if (!user || error) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    if (user.Password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Check if the user is an organization or employee
    if (user.isOrg) {
      return NextResponse.json({ 
        message: "Sign-in successful, redirecting to organization dashboard", 
        dashboard: 'organization', 
        Organization_Name: user.Organization_Name 
      }, { status: 200 });
    } else {
      return NextResponse.json({ 
        message: "Sign-in successful, redirecting to employee dashboard", 
        dashboard: 'employee',
        Organization_Name: user.Organization_Name
      }, { status: 200 });
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
