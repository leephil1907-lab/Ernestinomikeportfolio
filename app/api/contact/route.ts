import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(15).max(5000),
  budget: z.string().max(80).optional(),
  website: z.string().max(0).optional()
});

const requests = new Map<string, { count: number; resetAt: number }>();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const record = requests.get(ip);
  if (record && record.resetAt > now && record.count >= 5) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }
  requests.set(ip, !record || record.resetAt <= now ? { count: 1, resetAt: now + 60 * 60 * 1000 } : { ...record, count: record.count + 1 });

  try {
    const body: unknown = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true });
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO) {
      return NextResponse.json({ error: "Contact delivery is not configured yet. Please use WhatsApp or email." }, { status: 503 });
    }
    const { name, email, message, budget } = parsed.data;
    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: "Portfolio enquiry from " + name,
      text: "Name: " + name + "\nEmail: " + email + "\nBudget: " + (budget || "Not provided") + "\n\n" + message
    });
    if (result.error) return NextResponse.json({ error: "Message could not be sent. Please use WhatsApp or email." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request. Please try again." }, { status: 400 });
  }
}