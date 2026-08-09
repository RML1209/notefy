import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type VerificationEmailProps = {
  appName: string;
  token: string;
};

export function VerificationEmail({
  appName,
  token,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Verify your email address</Preview>

      <Body
        style={{
          backgroundColor: "#f6f9fc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            margin: "40px auto",
            padding: "40px",
            borderRadius: "10px",
            maxWidth: "600px",
          }}
        >
          <Heading>Welcome to {appName}</Heading>

          <Text>
            Thank you for creating your account.
          </Text>

          <Text>
            Use the verification code below:
          </Text>

          <Section
            style={{
              textAlign: "center",
              margin: "32px 0",
            }}
          >
            <Button
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "16px 28px",
                borderRadius: "8px",
                fontSize: "28px",
              }}
            >
              {token}
            </Button>
          </Section>

          <Text>
            This code expires in 15 minutes.
          </Text>

          <Text>
            If you did not create this account,
            you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}