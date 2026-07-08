import { Router, type IRouter } from "express";
import { CreateEnquiryBody, CreateEnquiryResponse } from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const BUSINESS_EMAIL = "admin@aceautotrim.com.au";

router.post("/enquiries", async (req, res): Promise<void> => {
  const parsed = CreateEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid enquiry body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, phone, vehicle, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    logger.error("RESEND_API_KEY is not configured");
    res.status(500).json({ error: "Enquiry service is not configured" });
    return;
  }

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const html = `
    <h2>New enquiry from Ace Automotive Trimming website</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    ${vehicle ? `<p><strong>Vehicle:</strong> ${escapeHtml(vehicle)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Ace Automotive Trimming Website <onboarding@resend.dev>",
        to: [BUSINESS_EMAIL],
        reply_to: email,
        subject: `New enquiry from ${name}`,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      req.log.error({ status: response.status, errorBody }, "Failed to send enquiry email");
      res.status(500).json({ error: "Failed to send enquiry" });
      return;
    }

    req.log.info({ email }, "Enquiry email sent");
    res.status(201).json(CreateEnquiryResponse.parse({ success: true }));
  } catch (err) {
    req.log.error({ err }, "Error sending enquiry email");
    res.status(500).json({ error: "Failed to send enquiry" });
  }
});

export default router;
