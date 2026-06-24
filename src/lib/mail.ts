import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendLostProductFoundEmail({
  ownerEmail,
  ownerName,
  productName,
  dppId,
  finderName,
  finderEmail,
  finderPhone,
}: {
  ownerEmail: string;
  ownerName?: string | null;
  productName: string;
  finderName: string;
  finderEmail: string;
  finderPhone: string;
  dppId: string;
}) {
  await transporter.sendMail({
    from: `"EcoXchange" <${process.env.EMAIL_USER}>`,
    to: ownerEmail,
    cc: "ecoxchangeteamcollab@gmail.com",
    subject: `Your lost product has been found`,
    html: `
      <h2>Good News!</h2>

      <p>Hello ${ownerName || "User"},</p>

      <p>Your lost product has been marked as FOUND on EcoXchange.</p>

      <p>
        <strong>Product:</strong> ${productName}
      </p>

      <p>
        <strong>DPP ID:</strong> ${dppId}
      </p>

      <hr/>

      <h3>Finder Details</h3>

      <p>
        <strong>Name:</strong> ${finderName}
      </p>

      <p>
        <strong>Email:</strong> ${finderEmail}
      </p>

      <p>
        <strong>Phone:</strong> ${finderPhone}
      </p>

      <hr/>

      <p>
        Please contact the finder directly to arrange recovery.
      </p>

      <p>
        Team EcoXchange
      </p>
    `,
  });
}