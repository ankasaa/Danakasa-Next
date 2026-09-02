import { NextResponse } from "next/server";

type NewsletterBody = {
  email: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body: NewsletterBody = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 },
      );
    }

    // TODO: Integrate with newsletter service (Mailchimp, Resend Audiences, etc.)
    // Example:
    // await resend.contacts.create({
    //   email: email.trim(),
    //   audienceId: process.env.RESEND_AUDIENCE_ID,
    // });

    console.log("[Newsletter] New subscriber:", email.trim());

    return NextResponse.json(
      { message: "Berhasil subscribe newsletter." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server. Coba lagi nanti." },
      { status: 500 },
    );
  }
}
