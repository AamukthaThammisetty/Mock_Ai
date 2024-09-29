import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDesc: varchar('jobDesc').notNull(),  // Corrected field name
  jobExperience: varchar('jobExperience').notNull(),  // Corrected field name
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt'),
  mockId: varchar('mockId').notNull()
});
