import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface InvitationEmailProps {
  guestNames: string[];
  rsvpUrl: string;
}

export default function InvitationEmail({
  guestNames = ["Guest"],
  rsvpUrl = "https://example.com/rsvp",
}: InvitationEmailProps) {
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
        You&apos;re invited to Alara & Yannis&apos; Engagement Party
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
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
                <strong>Date:</strong> Saturday, 28th March 2026
              </Text>
              <Text style={detailItem}>
                <strong>Time:</strong> 6:00 PM onwards
              </Text>
              <Text style={detailItem}>
                <strong>Venue:</strong> Details on our website
              </Text>
            </Section>

            <Text style={paragraph}>
              We would be honoured to have you celebrate with us. Please let us
              know if you can attend by clicking the button below.
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
              Alara & Yannis
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
        </Container>
      </Body>
    </Html>
  );
}

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
  wordBreak: "break-all" as const,
};
