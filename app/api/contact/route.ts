import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = schema.parse(body);

    const to  = process.env.CONTACT_EMAIL    || "hello@example.com";
    const key = process.env.RESEND_API_KEY;

    if (!key) {
      // Log locally but don't crash — dev mode without key
      console.warn("RESEND_API_KEY not set. Email not sent.");
      return Response.json({ success: true, demo: true });
    }

    // Lazy import + instantiation avoids build-time "Missing API key" error
    const { Resend } = await import("resend");
    const resend = new Resend(key);

    await resend.emails.send({
      from:    "Evently Contact <onboarding@resend.dev>",
      to:      [to],
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#FFFAF7;border-radius:16px;">
          <h2 style="color:#FF6B2C;margin:0 0 20px;">New Contact Message</h2>
          <p style="color:#555;font-size:14px;margin-bottom:8px;"><strong>Name:</strong> ${name}</p>
          <p style="color:#555;font-size:14px;margin-bottom:8px;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#FF6B2C;">${email}</a></p>
          <hr style="border:none;border-top:1px solid #ffe0cc;margin:16px 0;" />
          <p style="color:#333;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message}</p>
          <hr style="border:none;border-top:1px solid #ffe0cc;margin:20px 0;" />
          <p style="color:#bbb;font-size:11px;">Sent via Evently contact form.</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    const isValidation = err instanceof z.ZodError;
    return Response.json(
      { success: false, error: isValidation ? "Invalid form data" : "Failed to send" },
      { status: isValidation ? 400 : 500 }
    );
  }
}
