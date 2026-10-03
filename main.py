from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List


# =========================================================
# FounderMind API
# =========================================================

app = FastAPI(
    title="FounderMind API",
    description="AI Startup Validation and Founder Support Agent",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# REQUEST MODELS
# =========================================================

class ValidationRequest(BaseModel):
    idea: str
    target_customer: str = ""
    business_model: str = ""


class IdeaRequest(BaseModel):
    sector: str = "Technology"
    target_customer: str = "General users"
    budget: str = "Low"
    technology: str = "AI"


class FundingPlanRequest(BaseModel):
    amount: float
    startup_stage: str = "MVP"


class ActionPlanRequest(BaseModel):
    idea: str
    target_customer: str = ""


# =========================================================
# HOME
# =========================================================

@app.get("/")
def root():
    return {
        "message": "FounderMind backend is running!",
        "version": "1.0.0",
        "features": [
            "Startup Validation",
            "Idea Generation",
            "Market Analysis",
            "Funding Navigator",
            "Funding Planner",
            "Action Plan"
        ]
    }


# =========================================================
# STARTUP VALIDATION
# =========================================================

@app.post("/api/validate")
def validate_startup(request: ValidationRequest):

    idea = request.idea
    customer = request.target_customer or "Target customers"
    model = request.business_model or "Not specified"

    return {
        "idea": idea,

        "validation_readiness": "78/100",

        "summary": (
            f"The startup idea '{idea}' targets {customer}. "
            "The concept should be tested with real customers before "
            "significant development or investment."
        ),

        "problem": {
            "problem": (
                "The idea appears to address a customer problem that "
                "could potentially benefit from a more convenient, "
                "personalized, or efficient solution."
            ),
            "problem_fit": 82
        },

        "customer": {
            "primary_segment": customer,
            "customer_fit": 76,
            "persona": {
                "age_group": "18-35",
                "needs": [
                    "Convenience",
                    "Affordable solutions",
                    "Personalized experience"
                ]
            }
        },

        "competitors": {
            "competition_level": "Medium",

            "potential_gap": (
                "Potential differentiation may come from personalization, "
                "simplicity, affordability, automation, or better user experience."
            ),

            "competitors": [
                {
                    "name": "Existing Solution A",
                    "strength": "Established user base",
                    "gap": "Limited personalization"
                },
                {
                    "name": "Existing Solution B",
                    "strength": "Large feature set",
                    "gap": "Can be complex for new users"
                },
                {
                    "name": "Existing Solution C",
                    "strength": "Strong market presence",
                    "gap": "May not focus on the target customer segment"
                }
            ]
        },

        "market": {
            "opportunity_score": 68,

            "signals": [
                "Growing interest in AI-powered products",
                "Increasing demand for personalized solutions",
                "Digital products can reach large audiences"
            ],

            "tam_note": (
                "Real market-size research should be completed using "
                "reliable current market data before investment decisions."
            )
        },

        "business": {
            "business_potential": 74,

            "model_hypotheses": [
                f"Primary model: {model}",
                "Freemium",
                "Subscription",
                "B2B / Institutional plan"
            ],

            "pricing_experiments": [
                "Free plan",
                "₹199/month",
                "₹499/month"
            ]
        },

        "risks": {
            "risks": [
                {
                    "risk": "Customers may not be willing to pay",
                    "severity": "High",
                    "test": "Interview at least 20 potential customers"
                },
                {
                    "risk": "Strong competition",
                    "severity": "Medium",
                    "test": "Analyze at least 5 competitors"
                },
                {
                    "risk": "MVP may become too complicated",
                    "severity": "Low",
                    "test": "Start with only the core features"
                }
            ]
        },

        "mvp": {
            "features": [
                "User registration",
                "Startup idea input",
                "AI validation analysis",
                "Customer analysis",
                "Competitor analysis",
                "Risk analysis"
            ],

            "defer": [
                "Mobile application",
                "Advanced analytics",
                "Enterprise dashboard",
                "Complex automation"
            ]
        },

        "funding": {
            "status": "Potentially relevant",
            "message": (
                "FounderMind can identify potentially relevant government "
                "support programs. Eligibility and permitted use of funds "
                "must be verified against the current official scheme."
            )
        },

        "next_steps": [
            "Define the target customer",
            "Interview 20 potential customers",
            "Research 5 competitors",
            "Build a small MVP",
            "Find the first 10 users",
            "Collect feedback",
            "Test willingness to pay"
        ]
    }


# =========================================================
# NEW IDEA GENERATOR
# =========================================================

@app.post("/api/ideas")
def generate_ideas(request: IdeaRequest):

    sector = request.sector
    customer = request.target_customer
    budget = request.budget
    technology = request.technology

    ideas = [
        {
            "title": f"AI {sector} Assistant",
            "sector": sector,
            "description": (
                f"A {technology}-powered platform designed to help "
                f"{customer} solve common problems in {sector}."
            ),
            "target_customer": customer,
            "budget": budget,
            "business_model": "Freemium"
        },
        {
            "title": f"Smart {sector} Copilot",
            "sector": sector,
            "description": (
                f"An intelligent assistant that automates repetitive "
                f"{sector} tasks for {customer}."
            ),
            "target_customer": customer,
            "budget": budget,
            "business_model": "Subscription"
        },
        {
            "title": f"{sector} Insight Agent",
            "sector": sector,
            "description": (
                f"An AI agent that analyzes information and provides "
                f"personalized recommendations for {customer}."
            ),
            "target_customer": customer,
            "budget": budget,
            "business_model": "SaaS"
        }
    ]

    return {
        "count": len(ideas),
        "ideas": ideas
    }


# =========================================================
# GOVERNMENT FUNDING NAVIGATOR
# =========================================================

@app.get("/api/funding")
def funding_navigator():

    return {
        "message": (
            "These are potentially relevant support categories. "
            "Always verify current eligibility, application procedure, "
            "and permitted use from the official government source."
        ),

        "schemes": [
            {
                "name": "Startup India Seed Fund Scheme",
                "category": "Startup Funding",
                "status": "Potentially relevant",
                "purpose": [
                    "Proof of concept",
                    "Prototype development",
                    "Product trials",
                    "Market entry",
                    "Commercialization"
                ],
                "eligibility": (
                    "Eligibility depends on the current official scheme "
                    "criteria and startup status."
                ),
                "source": "Startup India official portal"
            },

            {
                "name": "MSME Support Programs",
                "category": "MSME",
                "status": "Check eligibility",
                "purpose": [
                    "Business development",
                    "Credit support",
                    "Enterprise development"
                ],
                "eligibility": (
                    "Eligibility varies by individual MSME scheme."
                ),
                "source": "Ministry of MSME official portal"
            },

            {
                "name": "State Startup / Innovation Support",
                "category": "State Government",
                "status": "Check current availability",
                "purpose": [
                    "Innovation",
                    "Startup development",
                    "Incubation"
                ],
                "eligibility": (
                    "Depends on the state program and current notification."
                ),
                "source": "Relevant state government portal"
            }
        ]
    }


# =========================================================
# FUNDING PLANNER
# =========================================================

@app.post("/api/funding/plan")
def funding_plan(request: FundingPlanRequest):

    amount = max(request.amount, 0)

    allocation = {
        "Product / MVP": round(amount * 0.30, 2),
        "Technology & AI": round(amount * 0.20, 2),
        "Marketing": round(amount * 0.15, 2),
        "Team / Freelancers": round(amount * 0.15, 2),
        "Research & Customers": round(amount * 0.05, 2),
        "Legal / Compliance": round(amount * 0.05, 2),
        "Reserve": round(amount * 0.10, 2)
    }

    return {
        "funding_amount": amount,
        "startup_stage": request.startup_stage,
        "allocation": allocation,
        "total": sum(allocation.values()),
        "important_note": (
            "This is an AI-generated planning suggestion. "
            "It is not a statement that a government grant permits "
            "all listed expenses. Check the applicable scheme conditions "
            "before spending restricted funds."
        )
    }


# =========================================================
# 90-DAY ACTION PLAN
# =========================================================

@app.post("/api/action-plan")
def action_plan(request: ActionPlanRequest):

    return {
        "idea": request.idea,
        "target_customer": request.target_customer,

        "plan": [
            {
                "period": "Week 1",
                "title": "Customer Discovery",
                "tasks": [
                    "Define target customer",
                    "Interview 20 potential users",
                    "Identify the biggest customer problem"
                ]
            },
            {
                "period": "Week 2-4",
                "title": "Build MVP",
                "tasks": [
                    "Define core features",
                    "Build prototype",
                    "Test with early users"
                ]
            },
            {
                "period": "Month 2",
                "title": "Market Validation",
                "tasks": [
                    "Find first 10 users",
                    "Collect feedback",
                    "Measure user engagement"
                ]
            },
            {
                "period": "Month 3",
                "title": "Business Validation",
                "tasks": [
                    "Test pricing",
                    "Improve product",
                    "Prepare launch strategy"
                ]
            }
        ]
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/api/health")
def health():

    return {
        "status": "online",
        "service": "FounderMind API"
    }