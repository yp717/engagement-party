import { NextRequest, NextResponse } from "next/server";
import { db, quizAttempts } from "@/db";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// GET /api/admin/quiz-stats - Get quiz attempt stats
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!ADMIN_API_KEY || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const all = await db.select().from(quizAttempts);

    const totalAttempts = all.length;
    const completed = all.filter((a) => a.completed).length;
    const completionRate =
      totalAttempts > 0 ? Math.round((completed / totalAttempts) * 100) : 0;

    // Unique visitors (by visitor_hash)
    const uniqueVisitors = new Set(
      all.map((a) => a.visitorHash).filter(Boolean)
    ).size;

    // Histogram: how many attempts failed at each question index (or completed)
    const byFurthest = all.reduce<Record<number, number>>((acc, a) => {
      acc[a.furthestQuestionIndex] = (acc[a.furthestQuestionIndex] ?? 0) + 1;
      return acc;
    }, {});

    // Attempts per visitor (only for rows with visitor_hash)
    const attemptsByVisitor = all
      .filter((a) => a.visitorHash)
      .reduce<Record<string, number>>((acc, a) => {
        acc[a.visitorHash!] = (acc[a.visitorHash!] ?? 0) + 1;
        return acc;
      }, {});
    const attemptsPerVisitorCounts = Object.values(attemptsByVisitor).reduce<
      Record<number, number>
    >((acc, count) => {
      acc[count] = (acc[count] ?? 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      totalAttempts,
      completed,
      completionRate,
      uniqueVisitors,
      byFurthestQuestionIndex: byFurthest,
      attemptsPerVisitor: attemptsPerVisitorCounts,
    });
  } catch (error) {
    console.error("Error fetching quiz stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz stats" },
      { status: 500 }
    );
  }
}
