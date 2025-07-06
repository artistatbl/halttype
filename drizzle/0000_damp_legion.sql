CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customText" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL,
	"isPrivate" boolean DEFAULT true NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leaderboard" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"testId" text NOT NULL,
	"wpm" integer NOT NULL,
	"accuracy" integer NOT NULL,
	"timeSpent" integer NOT NULL,
	"category" text NOT NULL,
	"language" text NOT NULL,
	"difficulty" text NOT NULL,
	"rank" integer,
	"achievedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "test" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL,
	"language" text DEFAULT 'english' NOT NULL,
	"difficulty" text DEFAULT 'medium' NOT NULL,
	"wordCount" integer NOT NULL,
	"timeLimit" integer,
	"isPublic" boolean DEFAULT true NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"createdBy" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testResult" (
	"id" text PRIMARY KEY NOT NULL,
	"testId" text NOT NULL,
	"userId" text,
	"wpm" integer NOT NULL,
	"accuracy" integer NOT NULL,
	"timeSpent" integer NOT NULL,
	"wordsTyped" integer NOT NULL,
	"correctWords" integer NOT NULL,
	"incorrectWords" integer NOT NULL,
	"keystrokes" jsonb DEFAULT '[]'::jsonb,
	"completedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"display_name" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "userSettings" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"theme" text DEFAULT 'dark' NOT NULL,
	"fontSize" integer DEFAULT 16 NOT NULL,
	"fontFamily" text DEFAULT 'monospace' NOT NULL,
	"defaultLanguage" text DEFAULT 'english' NOT NULL,
	"defaultDifficulty" text DEFAULT 'medium' NOT NULL,
	"defaultTimeLimit" integer DEFAULT 60,
	"showWpmLive" boolean DEFAULT true NOT NULL,
	"showAccuracyLive" boolean DEFAULT true NOT NULL,
	"showTimer" boolean DEFAULT true NOT NULL,
	"highlightErrors" boolean DEFAULT true NOT NULL,
	"soundEnabled" boolean DEFAULT false NOT NULL,
	"soundVolume" integer DEFAULT 50 NOT NULL,
	"blindMode" boolean DEFAULT false NOT NULL,
	"strictMode" boolean DEFAULT false NOT NULL,
	"confidenceMode" boolean DEFAULT false NOT NULL,
	"customTheme" jsonb,
	"keyboardLayout" text DEFAULT 'qwerty' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "userSettings_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "userStats" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"totalTests" integer DEFAULT 0 NOT NULL,
	"totalTimeSpent" integer DEFAULT 0 NOT NULL,
	"averageWpm" integer DEFAULT 0 NOT NULL,
	"averageAccuracy" integer DEFAULT 0 NOT NULL,
	"bestWpm" integer DEFAULT 0 NOT NULL,
	"bestAccuracy" integer DEFAULT 0 NOT NULL,
	"currentStreak" integer DEFAULT 0 NOT NULL,
	"longestStreak" integer DEFAULT 0 NOT NULL,
	"lastTestDate" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "userStats_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customText" ADD CONSTRAINT "customText_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leaderboard" ADD CONSTRAINT "leaderboard_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leaderboard" ADD CONSTRAINT "leaderboard_testId_test_id_fk" FOREIGN KEY ("testId") REFERENCES "public"."test"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test" ADD CONSTRAINT "test_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testResult" ADD CONSTRAINT "testResult_testId_test_id_fk" FOREIGN KEY ("testId") REFERENCES "public"."test"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testResult" ADD CONSTRAINT "testResult_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userSettings" ADD CONSTRAINT "userSettings_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userStats" ADD CONSTRAINT "userStats_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "leaderboard_category_idx" ON "leaderboard" USING btree ("category");--> statement-breakpoint
CREATE INDEX "leaderboard_language_idx" ON "leaderboard" USING btree ("language");--> statement-breakpoint
CREATE INDEX "leaderboard_difficulty_idx" ON "leaderboard" USING btree ("difficulty");--> statement-breakpoint
CREATE INDEX "leaderboard_wpm_idx" ON "leaderboard" USING btree ("wpm");--> statement-breakpoint
CREATE INDEX "leaderboard_user_idx" ON "leaderboard" USING btree ("userId");