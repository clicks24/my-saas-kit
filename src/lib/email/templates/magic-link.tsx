import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { box, container, main, paragraph, button, hr, footer } from "./styles";

export const MagicLinkEmail = ({
  signInLink,
  sentTo,
}: {
  signInLink: string;
  sentTo: string;
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Tailwind>
            <Img
              width={"42px"}
              height={"42px"}
              className="rounded-md"
              src="https://www.saasplanet.org/assets/logo-w.png"
            />
          </Tailwind>
          <Text style={paragraph}>
            {
              "Here is the sign-in link you requested. If you do not have an account, one will be created for you."
            }
          </Text>
          <Button pX={10} pY={10} style={button} href={signInLink}>
            Sign in
          </Button>
          <Hr style={hr} />
          <Text style={footer}>This email was sent to {sentTo}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default MagicLinkEmail;
