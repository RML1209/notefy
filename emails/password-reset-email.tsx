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

type PasswordResetEmailProps = {
  appName: string;
  token: string;
};

export function PasswordResetEmail({
  appName,
  token,
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Reset your password</Preview>

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
          <Heading>Password Reset</Heading>

          <Text>
            We received a request to reset the password for your{" "}
            <strong>{appName}</strong> account.
          </Text>

          <Text>
            Use the code below to continue:
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
            This code expires in <strong>15 minutes</strong>.
          </Text>

          <Text>
            If you did not request a password reset,
            you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}