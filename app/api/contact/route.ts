import { NextResponse } from "next/server";

type ContactBody = {
  name: string;
  email: string;
  message: string;
  newsletter?: boolean;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();

    const { name, email, message, newsletter } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 },
      );
    }

    if (typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Nama harus minimal 2 karakter." },
        { status: 400 },
      );
    }

    if (typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 },
      );
    }

    if (typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Pesan harus minimal 10 karakter." },
        { status: 400 },
      );
    }

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // Example with Resend:
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "DanaKasa <noreply@danakasa.vercel.app>",
    //   to: "danakasafins@gmail.com",
    //   subject: `Pesan dari ${name}`,
    //   html: `<p><strong>Nama:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Pesan:</strong></p><p>${message}</p>`,
    // });

    console.log("[Contact Form]", {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      newsletter: !!newsletter,
      timestamp: new Date().toISOString(),
    });

    if (newsletter) {
      // TODO: Save to newsletter subscriber list
      console.log("[Newsletter] New subscriber:", email.trim());
    }

    return NextResponse.json(
      { message: "Pesan berhasil dikirim." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server. Coba lagi nanti." },
      { status: 500 },
    );
  }
}
