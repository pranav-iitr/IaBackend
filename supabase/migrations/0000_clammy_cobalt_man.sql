CREATE TABLE IF NOT EXISTS "app_user" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"user_name" text NOT NULL,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "application" (
	"application_id" serial PRIMARY KEY NOT NULL,
	"company_id" integer,
	"round_id" integer,
	"application_date" date,
	"status" text,
	"notes" text,
	"created_by" integer,
	"updated_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_details" (
	"details_id" serial PRIMARY KEY NOT NULL,
	"company_id" integer,
	"background" text,
	"other_details" text,
	"created_by" integer,
	"updated_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exit_transaction" (
	"exit_id" serial PRIMARY KEY NOT NULL,
	"investment_id" integer,
	"exit_date" timestamp,
	"shares_sold" integer,
	"sale_price_per_share" numeric(20, 2),
	"sale_price_per_share_in_base" numeric(20, 2),
	"total_sale_amount" numeric(20, 2),
	"total_sale_amount_in_base" numeric(20, 2),
	"currency_code" text,
	"buyer_details" text,
	"notes" text,
	"created_by" integer,
	"updated_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "investment" (
	"investment_id" serial PRIMARY KEY NOT NULL,
	"company_id" integer,
	"investor_id" integer,
	"investment_date" timestamp,
	"investment_amount" numeric(20, 2),
	"currency_code" text,
	"investment_amount_in_base" numeric(20, 2),
	"share_price_at_investment" numeric(20, 2),
	"shares_received" integer,
	"investment_type" text,
	"notes" text,
	"created_by" integer,
	"updated_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "investor" (
	"investor_id" serial PRIMARY KEY NOT NULL,
	"investor_name" text NOT NULL,
	"email" text,
	"contact_info" text,
	"notes" text,
	"created_by" integer,
	"updated_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jwt_token" (
	"token_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"token" text NOT NULL,
	"expiry_date" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_company" (
	"company_id" serial PRIMARY KEY NOT NULL,
	"company_name" text NOT NULL,
	"brand_name" text,
	"founding_date" date,
	"industry" text,
	"domain" text,
	"thesis" text,
	"vertical_partner" text,
	"eir_name" text,
	"highlights" text,
	"current_price_per_share" numeric(20, 2),
	"total_shares" integer,
	"current_valuation" numeric(20, 2),
	"notes" text,
	"created_by" integer,
	"updated_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "round" (
	"round_id" serial PRIMARY KEY NOT NULL,
	"round_name" text,
	"description" text,
	"created_by" integer,
	"updated_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "valuation_history" (
	"valuation_id" serial PRIMARY KEY NOT NULL,
	"company_id" integer,
	"valuation_date" timestamp NOT NULL,
	"valuation_amount" numeric(20, 2) NOT NULL,
	"shares_outstanding" integer NOT NULL,
	"share_price" numeric(20, 2),
	"valuation_source" text,
	"updated_by" integer,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application" ADD CONSTRAINT "application_company_id_portfolio_company_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."portfolio_company"("company_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application" ADD CONSTRAINT "application_round_id_round_round_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."round"("round_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application" ADD CONSTRAINT "application_created_by_app_user_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application" ADD CONSTRAINT "application_updated_by_app_user_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_details" ADD CONSTRAINT "company_details_company_id_portfolio_company_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."portfolio_company"("company_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_details" ADD CONSTRAINT "company_details_created_by_app_user_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_details" ADD CONSTRAINT "company_details_updated_by_app_user_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exit_transaction" ADD CONSTRAINT "exit_transaction_investment_id_investment_investment_id_fk" FOREIGN KEY ("investment_id") REFERENCES "public"."investment"("investment_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exit_transaction" ADD CONSTRAINT "exit_transaction_created_by_app_user_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exit_transaction" ADD CONSTRAINT "exit_transaction_updated_by_app_user_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment" ADD CONSTRAINT "investment_company_id_portfolio_company_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."portfolio_company"("company_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment" ADD CONSTRAINT "investment_investor_id_investor_investor_id_fk" FOREIGN KEY ("investor_id") REFERENCES "public"."investor"("investor_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment" ADD CONSTRAINT "investment_created_by_app_user_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment" ADD CONSTRAINT "investment_updated_by_app_user_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investor" ADD CONSTRAINT "investor_created_by_app_user_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investor" ADD CONSTRAINT "investor_updated_by_app_user_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jwt_token" ADD CONSTRAINT "jwt_token_user_id_app_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_company" ADD CONSTRAINT "portfolio_company_created_by_app_user_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_company" ADD CONSTRAINT "portfolio_company_updated_by_app_user_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "round" ADD CONSTRAINT "round_created_by_app_user_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "round" ADD CONSTRAINT "round_updated_by_app_user_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "valuation_history" ADD CONSTRAINT "valuation_history_company_id_portfolio_company_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."portfolio_company"("company_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "valuation_history" ADD CONSTRAINT "valuation_history_updated_by_app_user_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
