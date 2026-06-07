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
} from "react-email";

interface EventDetailsUpdateEmailProps {
  guestNames: string[];
  detailsUrl?: string;
}

const DEFAULT_DETAILS_URL = "https://www.yannisandalara.com/#details";
const DEFAULT_QUIZ_URL = "https://www.yannisandalara.com/quiz";

export default function EventDetailsUpdateEmail({
  guestNames = ["Guest"],
  detailsUrl = DEFAULT_DETAILS_URL,
}: EventDetailsUpdateEmailProps) {
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
        Just over a month until Yannis & Alara&apos;s Engagement Party — new
        details inside
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
            <Heading style={heading}>Just Over a Month to Go</Heading>

            <Text style={greeting}>Dear {namesFormatted},</Text>

            <Text style={paragraph}>
              We hope you&apos;ve been keeping well since our last email.
              There&apos;s just over a month left until our engagement party,
              and we wanted to share some more details so you have everything
              you need in one place.
            </Text>

            <Text style={paragraph}>
              We&apos;ve added to our website the evening schedule, dress code
              with Pinterest inspiration, transport, and accommodation
              recommendations.
            </Text>

            <Text style={paragraph}>
              As a reminder, the password to access the site is
              &quot;GREENPARK&quot;.
            </Text>

            <Section style={buttonContainer}>
              <Link href={detailsUrl} style={button}>
                View Event Details
              </Link>
            </Section>

            <Text style={paragraph}>
              P.S. There&apos;s still time to complete the{" "}
              <Link href={DEFAULT_QUIZ_URL} style={link}>
                quiz
              </Link>{" "}
              on our website if you haven&apos;t given up yet. For what
              it&apos;s worth, the max is 17 attempts and so far, 16 have made
              it to the end.
            </Text>

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
            <Link href={detailsUrl} style={footerLink}>
              {detailsUrl}
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export const EVENT_DETAILS_UPDATE_SUBJECT =
  "Event details update: Yannis & Alara's Engagement Party";

EventDetailsUpdateEmail.PreviewProps = {
  guestNames: ["Alara", "Yannis"],
  detailsUrl: DEFAULT_DETAILS_URL,
  rsvpUrl: "https://www.yannisandalara.com/rsvp?token=example",
} as EventDetailsUpdateEmailProps;

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

const link = {
  color: "#2c0214",
  textDecoration: "underline",
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
  textDecoration: "underline",
  wordBreak: "break-all" as const,
};
