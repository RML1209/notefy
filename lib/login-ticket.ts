import jwt from "jsonwebtoken";

const LOGIN_TICKET_SECRET =
  process.env.LOGIN_TICKET_SECRET!;

const LOGIN_TICKET_EXPIRES_IN = "10m";

type LoginTicketPayload = {
  userId: string;
  email: string;
};

type JwtPayload = LoginTicketPayload & {
  iat: number;
  exp: number;
};

export async function createLoginTicket(
  userId: string,
  email: string
): Promise<string> {
  return jwt.sign(
    {
      userId,
      email,
    },
    LOGIN_TICKET_SECRET,
    {
      expiresIn: LOGIN_TICKET_EXPIRES_IN,
    }
  );
}

export async function verifyLoginTicket(
  token: string
): Promise<JwtPayload | null> {
  try {
    return jwt.verify(
      token,
      LOGIN_TICKET_SECRET
    ) as JwtPayload;
  } catch {
    return null;
  }
}