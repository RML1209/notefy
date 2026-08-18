import * as React from "react";

interface ReminderEmailProps {
  userName: string;
  noteTitle: string;
  noteContent: string;
  remindAt: Date;
  noteUrl: string;
}

export function ReminderEmail({
  userName,
  noteTitle,
  noteContent,
  remindAt,
  noteUrl,
}: ReminderEmailProps) {
  const formattedDate = new Intl.DateTimeFormat(
    "en-US",
    {
      dateStyle: "full",
      timeStyle: "short",
    }
  ).format(remindAt);

  return (
    <div
      style={{
        margin: 0,
        padding: "40px 20px",
        backgroundColor: "#B8C2CC",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #d9dee3",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "28px 32px",
            backgroundColor: "#111A1F",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#ffffff",
            }}
          >
            Notefy
          </div>

          <div
            style={{
              marginTop: "6px",
              fontSize: "13px",
              color: "#B8C2CC",
            }}
          >
            Your personal productivity space
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "32px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              lineHeight: "1.2",
              marginBottom: "12px",
            }}
          >
            🔔
          </div>

          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "24px",
              lineHeight: "1.3",
              color: "#0B1215",
            }}
          >
            Reminder for your note
          </h1>

          <p
            style={{
              margin: "0 0 24px",
              fontSize: "15px",
              lineHeight: "1.6",
              color: "#64748b",
            }}
          >
            Hi {userName},
            <br />
            Your scheduled reminder is due now.
          </p>

          {/* Note Card */}
          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
            }}
          >
            <h2
              style={{
                margin: "0 0 10px",
                fontSize: "19px",
                color: "#0B1215",
              }}
            >
              {noteTitle}
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "14px",
                lineHeight: "1.7",
                color: "#64748b",
                whiteSpace: "pre-wrap",
              }}
            >
              {noteContent}
            </p>
          </div>

          {/* Reminder time */}
          <div
            style={{
              marginTop: "20px",
              padding: "14px 16px",
              borderRadius: "10px",
              backgroundColor: "#eef3f7",
              color: "#4b6478",
              fontSize: "13px",
            }}
          >
            <strong>Reminder time:</strong>{" "}
            {formattedDate}
          </div>

          {/* Button */}
          <div
            style={{
              marginTop: "28px",
            }}
          >
            <a
              href={noteUrl}
              style={{
                display: "inline-block",
                padding: "13px 22px",
                borderRadius: "10px",
                backgroundColor: "#6A89A7",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Open Note
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "20px 32px",
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              lineHeight: "1.5",
              color: "#94a3b8",
            }}
          >
            You received this email because you
            created a reminder in Notefy.
          </p>

          <p
            style={{
              margin: "8px 0 0",
              fontSize: "12px",
              color: "#94a3b8",
            }}
          >
            © {new Date().getFullYear()} Notefy
          </p>
        </div>
      </div>
    </div>
  );
}