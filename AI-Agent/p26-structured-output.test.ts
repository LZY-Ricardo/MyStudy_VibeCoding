import { deepStrictEqual, strictEqual } from "node:assert";
import {
  ReviewJsonSchema,
  ReviewSchema,
  extractReviewFromContent,
} from "./p26-structured-output.js";

function run(): void {
  strictEqual(ReviewJsonSchema.type, "object");
  deepStrictEqual(ReviewJsonSchema.required, [
    "score",
    "summary",
    "issues",
    "approvable",
  ]);

  const input = {
    score: 8,
    summary: "整体可用，但需要修复安全问题。",
    issues: [
      {
        severity: "critical" as const,
        message: "SQL 拼接存在注入风险",
        fix: "改用参数化查询",
        line: 2,
      },
    ],
    approvable: false,
  };

  const review = extractReviewFromContent(JSON.stringify(input));
  deepStrictEqual(review, ReviewSchema.parse(input));

  console.log("p26-structured-output test passed");
}

run();
