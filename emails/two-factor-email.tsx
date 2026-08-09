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

type TwoFactorEmailProps = {
  appName: string;
  token: string;
};

export function TwoFactorEmail({
  appName,
  token,
}: TwoFactorEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Your Two-Factor Authentication Code</Preview>

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
          <Heading>Two-Factor Authentication</Heading>

          <Text>
            A login attempt requires verification for your{" "}
            <strong>{appName}</strong> account.
          </Text>

          <Text>
            Enter the code below to continue:
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
            This code expires in <strong>10 minutes</strong>.
          </Text>

          <Text>
            If this was not you, change your password immediately after signing in or contact support if the activity continues.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}