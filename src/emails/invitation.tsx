import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface InvitationEmailProps {
  guestNames: string[];
  rsvpUrl: string;
  /** Full URL to the couple image. Use direct static URL (e.g. https://www.yannisandalara.com/photos/black-and-white-post-engagement.jpeg), not _next/image - email clients need a direct image URL. */
  coupleImageUrl?: string;
}

export default function InvitationEmail({
  guestNames = ["Guest"],
  rsvpUrl = "https://example.com/rsvp",
  coupleImageUrl,
}: InvitationEmailProps) {
  // Default image for preview. Must be direct static URL (not _next/image) so email clients can load it.
  const imageUrl =
    coupleImageUrl ||
    "https://www.yannisandalara.com/photos/black-and-white-post-engagement.jpeg";

  const namesFormatted =
    guestNames.length === 1
      ? guestNames[0]
      : guestNames.length === 2
        ? `${guestNames[0]} & ${guestNames[1]}`
        : `${guestNames.slice(0, -1).join(", ")} & ${guestNames[guestNames.length - 1]}`;

  return (
    <Html>
      <Head />
      <Preview>
        You&apos;re invited to Yannis & Alara&apos;s Engagement Party
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
            <Section style={imageWrapper}>
              <Img
                src={imageUrl}
                alt="Yannis & Alara"
                style={coupleImage}
                width={520}
                height={347}
              />
            </Section>
            <Heading style={heading}>You&apos;re Invited</Heading>

            <Text style={greeting}>Dear {namesFormatted},</Text>

            <Text style={paragraph}>
              We are delighted to invite you to celebrate our engagement!
            </Text>

            <Text style={paragraph}>
              Please join us for an evening of joy, laughter, and love as we
              mark this special milestone in our journey together.
            </Text>

            <Section style={details}>
              <Text style={detailItem}>
                <strong>Date:</strong> Saturday, 11th July 2026
              </Text>
              <Text style={detailItem}>
                <strong>Time:</strong> Details to follow
              </Text>
              <Text style={detailItem}>
                <strong>Venue:</strong> The Libertine, 1 Royal Exchange,
                Cornhill, London, EC3V 3LL
              </Text>
            </Section>

            <Text style={paragraph}>
              We would be honoured to have you celebrate with us. Please let us
              know if you can attend by clicking the button below.
            </Text>

            <Text style={paragraph}>
              You can find more details about the event on our website:{" "}
              <Link href="https://www.yannisandalara.com" style={link}>
                yannisandalara.com
              </Link>
              . The password to access the website is "GREENPARK".
            </Text>

            <Section style={buttonContainer}>
              <Link href={rsvpUrl} style={button}>
                RSVP Now
              </Link>
            </Section>

            <Text style={paragraph}>
              If you have any questions, please don&apos;t hesitate to reach
              out.
            </Text>

            <Text style={signature}>
              With love,
              <br />
              Yannis & Alara
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              If you&apos;re having trouble with the button above, copy and
              paste this link into your browser:
            </Text>
            <Link href={rsvpUrl} style={footerLink}>
              {rsvpUrl}
            </Link>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Website built with love by Yannis and supervised by Alara ❤️
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

InvitationEmail.PreviewProps = {
  guestNames: ["Alara"],
  rsvpUrl: "https://www.yannisandalara.com/rsvp",
  coupleImageUrl:
    "https://www.yannisandalara.com/photos/black-and-white-post-engagement.jpeg",
} as InvitationEmailProps;

const main = {
  backgroundColor: "#f5f3ed",
  fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, Georgia, serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "4px",
  border: "1px solid #e8e5de",
};

const imageWrapper = {
  margin: "0 0 24px",
  width: "100%" as const,
};

const coupleImage = {
  width: "100%" as const,
  maxWidth: "100%" as const,
  height: "auto" as const,
  display: "block" as const,
  objectFit: "cover" as const,
  borderRadius: "4px",
};

const heading = {
  color: "#2c0214",
  fontSize: "36px",
  fontWeight: "400",
  textAlign: "center" as const,
  margin: "0 0 30px",
  fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, Georgia, serif',
};

const greeting = {
  color: "#2c0214",
  fontSize: "18px",
  lineHeight: "1.6",
  margin: "0 0 20px",
};

const paragraph = {
  color: "#2c0214",
  fontSize: "16px",
  lineHeight: "1.8",
  margin: "0 0 20px",
};

const details = {
  backgroundColor: "#f5f3ed",
  padding: "24px",
  borderRadius: "4px",
  margin: "30px 0",
};

const detailItem = {
  color: "#2c0214",
  fontSize: "16px",
  lineHeight: "1.8",
  margin: "0 0 8px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const link = {
  color: "#2c0214",
  textDecoration: "underline",
  fontWeight: "500",
};

const button = {
  backgroundColor: "#2c0214",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "16px 40px",
  borderRadius: "50px",
  display: "inline-block",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
};

const signature = {
  color: "#2c0214",
  fontSize: "16px",
  lineHeight: "1.8",
  margin: "30px 0 0",
  fontStyle: "italic",
};

const footer = {
  textAlign: "center" as const,
  padding: "20px 0 0",
};

const footerText = {
  color: "#666666",
  fontSize: "12px",
  margin: "0 0 8px",
};

const footerLink = {
  color: "#2c0214",
  fontSize: "12px",
  textDecoration: "underline",
  wordBreak: "break-all" as const,
};
