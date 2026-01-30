import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db, quizAttempts } from "@/db";
import { QUIZ_QUESTIONS } from "@/app/quiz/questions";

const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;

function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }
  return request.headers.get("x-real-ip");
}

function hashVisitor(ip: string, salt: string): string {
  return createHash("sha256")
    .update(ip + salt)
    .digest("hex");
}

// POST /api/quiz/attempt - Record a quiz attempt (anonymous, optional hashed IP)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { furthestQuestionIndex, completed } = body as {
      furthestQuestionIndex?: number;
      completed?: boolean;
    };

    if (
      typeof furthestQuestionIndex !== "number" ||
      furthestQuestionIndex < 0 ||
      furthestQuestionIndex >= TOTAL_QUESTIONS
    ) {
      return NextResponse.json(
        { error: "Invalid furthestQuestionIndex" },
        { status: 400 }
      );
    }

    if (typeof completed !== "boolean") {
      return NextResponse.json({ error: "Invalid completed" }, { status: 400 });
    }

    let visitorHash: string | null = null;
    const salt = process.env.QUIZ_VISITOR_SALT;
    const ip = getClientIp(request);
    if (salt && ip) {
      visitorHash = hashVisitor(ip, salt);
    }

    await db.insert(quizAttempts).values({
      furthestQuestionIndex,
      completed,
      visitorHash,
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error recording quiz attempt:", error);
    return NextResponse.json(
      { error: "Failed to record attempt" },
      { status: 500 }
    );
  }
}
