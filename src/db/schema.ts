
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  decimal,
  date,
} from "drizzle-orm/pg-core";

export const appUserTable = pgTable("app_user", {
  userId: serial("user_id").primaryKey(),
  userName: text("user_name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const portfolioCompanyTable = pgTable('portfolio_company', {
    companyId: serial('company_id').primaryKey(),
    companyName: text('company_name').notNull(),
    brandName: text('brand_name'),
    foundingDate: date('founding_date'),
    industry: text('industry'),
    domain: text('domain'),
    thesis: text('thesis'),
    verticalPartner: text('vertical_partner'),
    eirName: text('eir_name'),
    highlights: text('highlights'),
    currentPricePerShare: decimal('current_price_per_share', { precision: 20, scale: 2 }),
    totalShares: integer('total_shares'),
    currentValuation: decimal('current_valuation', { precision: 20, scale: 2 }),
    notes: text('notes'),
    createdBy: integer('created_by').references(() => appUserTable.userId),
    updatedBy: integer('updated_by').references(() => appUserTable.userId),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});



export const investorTable = pgTable("investor", {
  investorId: serial("investor_id").primaryKey(),
  investorName: text("investor_name").notNull(),
  email: text("email"),
  contactInfo: text("contact_info"),
  notes: text("notes"),

  createdBy: integer("created_by").references(() => appUserTable.userId),
  updatedBy: integer("updated_by").references(() => appUserTable.userId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export const investmentTable = pgTable("investment", {
  investmentId: serial("investment_id").primaryKey(),
  companyId: integer("company_id").references(
    () => portfolioCompanyTable.companyId
  ),
  investorId: integer("investor_id").references(() => investorTable.investorId),
  investmentDate: timestamp("investment_date"),
  investmentAmount: decimal("investment_amount", { precision: 20, scale: 2 }),
  currencyCode: text("currency_code", { length: 10 }),
  investmentAmountInBase: decimal("investment_amount_in_base", {
    precision: 20,
    scale: 2,
  }),
  sharePriceAtInvestment: decimal("share_price_at_investment", {
    precision: 20,
    scale: 2,
  }),
  sharesReceived: integer("shares_received"),
  investmentType: text("investment_type", { length: 50 }),
  notes: text("notes"),
  createdBy: integer("created_by").references(() => appUserTable.userId),
  updatedBy: integer("updated_by").references(() => appUserTable.userId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const companyDetailsTable = pgTable('company_details', {
    detailsId: serial('details_id').primaryKey(),
    companyId: integer('company_id').references(() => portfolioCompanyTable.companyId),
    background: text('background'),
    otherDetails: text('other_details'),
    createdBy: integer('created_by').references(() => appUserTable.userId),
    updatedBy: integer('updated_by').references(() => appUserTable.userId),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});




export const valuationHistoryTable = pgTable("valuation_history", {
  valuationId: serial("valuation_id").primaryKey(),
  companyId: integer("company_id").references(
    () => portfolioCompanyTable.companyId
  ),
  valuationDate: timestamp("valuation_date").notNull(),
  valuationAmount: decimal("valuation_amount", {
    precision: 20,
    scale: 2,
  }).notNull(),
  sharesOutstanding: integer("shares_outstanding").notNull(),
  sharePrice: decimal("share_price", { precision: 20, scale: 2 }),
  valuationSource: text("valuation_source"),
  updatedBy: integer("updated_by").references(() => appUserTable.userId),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export const exitTransactionTable = pgTable("exit_transaction", {
  exitId: serial("exit_id").primaryKey(),
  investmentId: integer("investment_id").references(
    () => investmentTable.investmentId
  ),
  exitDate: timestamp("exit_date"),
  sharesSold: integer("shares_sold"),
  salePricePerShare: decimal("sale_price_per_share", {
    precision: 20,
    scale: 2,
  }),
  salePricePerShareInBase: decimal("sale_price_per_share_in_base", {
    precision: 20,
    scale: 2,
  }),
  totalSaleAmount: decimal("total_sale_amount", { precision: 20, scale: 2 }),
  totalSaleAmountInBase: decimal("total_sale_amount_in_base", {
    precision: 20,
    scale: 2,
  }),
  currencyCode: text("currency_code", { length: 10 }),
  buyerDetails: text("buyer_details"),
  notes: text("notes"),
  createdBy: integer("created_by").references(() => appUserTable.userId),
  updatedBy: integer("updated_by").references(() => appUserTable.userId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export const jwtTokenTable = pgTable("jwt_token", {
  tokenId: serial("token_id").primaryKey(),
  userId: integer("user_id").references(() => appUserTable.userId),
  token: text("token").notNull(),
  expiryDate: timestamp("expiry_date"),
  createdAt: timestamp("created_at").defaultNow(),
});
export const applicationTable = pgTable('application', {
    applicationId: serial('application_id').primaryKey(),
    companyId: integer('company_id').references(() => portfolioCompanyTable.companyId),
    roundId: integer('round_id').references(() => roundTable.roundId),
    applicationDate: date('application_date'),
    status: text('status'),
    notes: text('notes'),
    createdBy: integer('created_by').references(() => appUserTable.userId),
    updatedBy: integer('updated_by').references(() => appUserTable.userId),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const roundTable = pgTable('round', {
    roundId: serial('round_id').primaryKey(),
    roundName: text('round_name'),
    description: text('description'),
    createdBy: integer('created_by').references(() => appUserTable.userId),
    updatedBy: integer('updated_by').references(() => appUserTable.userId),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export type InsertRound = typeof roundTable.$inferInsert;
export type InsertApplication = typeof applicationTable.$inferInsert;
export type InsertJWTToken = typeof jwtTokenTable.$inferInsert;
export type InsertPortfolioCompany = typeof portfolioCompanyTable.$inferInsert;
export type InsertExitTransaction = typeof exitTransactionTable.$inferInsert;
export type InsertValuationHistory = typeof valuationHistoryTable.$inferInsert;
export type InsertInvestment = typeof investmentTable.$inferInsert;
export type InsertInvestor = typeof investorTable.$inferInsert;
export type InsertAppUser = typeof appUserTable.$inferInsert;
export type InsertCompanyDetails = typeof companyDetailsTable.$inferInsert;
