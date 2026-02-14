from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import json

app = FastAPI(
    title="PrajaAdhikaram AI API",
    description="Intelligent Government Scheme Eligibility Engine for India",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── SCHEME DATABASE ───────────────────────────────────────────────────────────

SCHEMES = [
    {
        "id": "pm-kisan",
        "name": "PM-KISAN Samman Nidhi",
        "category": "Agriculture",
        "benefit": "₹6,000/year",
        "scope": "Central",
        "description": "Direct income support of ₹6,000 per year in three installments to small and marginal farmer families.",
        "eligibility": {
            "max_income": 200000,
            "occupations": ["farmer"],
            "categories": ["general", "obc", "sc", "st", "ews"],
            "min_age": 18,
            "max_age": 100,
            "gender": ["male", "female", "other"],
            "residency": ["rural", "semi-urban"],
        },
        "documents": ["Aadhaar Card", "Land Records", "Bank Account", "Mobile Number"],
    },
    {
        "id": "ayushman-bharat",
        "name": "Ayushman Bharat PMJAY",
        "category": "Healthcare",
        "benefit": "₹5L health cover",
        "scope": "Central",
        "description": "Health insurance coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
        "eligibility": {
            "max_income": 300000,
            "occupations": ["farmer", "laborer", "self-employed", "homemaker", "unemployed"],
            "categories": ["general", "obc", "sc", "st", "ews"],
            "min_age": 0,
            "max_age": 100,
            "gender": ["male", "female", "other"],
            "residency": ["rural", "urban", "semi-urban"],
        },
        "documents": ["Aadhaar Card", "Ration Card", "SECC Data", "Income Certificate"],
    },
    {
        "id": "pm-awas",
        "name": "PM Awas Yojana",
        "category": "Housing",
        "benefit": "Home subsidy up to ₹2.67L",
        "scope": "Central",
        "description": "Financial assistance for construction of pucca house with basic amenities.",
        "eligibility": {
            "max_income": 300000,
            "occupations": ["farmer", "laborer", "self-employed", "homemaker", "unemployed", "salaried"],
            "categories": ["sc", "st", "obc", "ews"],
            "min_age": 21,
            "max_age": 65,
            "gender": ["male", "female", "other"],
            "residency": ["rural", "semi-urban"],
        },
        "documents": ["Aadhaar Card", "Income Certificate", "Land Documents", "Bank Account"],
    },
    {
        "id": "mgnrega",
        "name": "MGNREGA",
        "category": "Employment",
        "benefit": "100 days guaranteed work",
        "scope": "Central",
        "description": "Legal guarantee of 100 days of wage employment in a financial year to every rural household.",
        "eligibility": {
            "max_income": 500000,
            "occupations": ["farmer", "laborer", "self-employed", "homemaker", "unemployed"],
            "categories": ["general", "obc", "sc", "st", "ews"],
            "min_age": 18,
            "max_age": 65,
            "gender": ["male", "female", "other"],
            "residency": ["rural"],
        },
        "documents": ["Job Card", "Aadhaar Card", "Bank Account"],
    },
    {
        "id": "pm-ujjwala",
        "name": "PM Ujjwala Yojana",
        "category": "Healthcare",
        "benefit": "Free LPG connection",
        "scope": "Central",
        "description": "Free LPG connections to women from Below Poverty Line households.",
        "eligibility": {
            "max_income": 200000,
            "occupations": ["farmer", "laborer", "homemaker", "unemployed"],
            "categories": ["general", "obc", "sc", "st", "ews"],
            "min_age": 18,
            "max_age": 100,
            "gender": ["female"],
            "residency": ["rural", "urban", "semi-urban"],
        },
        "documents": ["BPL Card", "Aadhaar Card", "Bank Account", "Address Proof"],
    },
    {
        "id": "sukanya-samriddhi",
        "name": "Sukanya Samriddhi Yojana",
        "category": "Finance",
        "benefit": "8.2% interest savings",
        "scope": "Central",
        "description": "Small deposit scheme for girl child with attractive interest rate and tax benefits under Section 80C.",
        "eligibility": {
            "max_income": 10000000,
            "occupations": ["farmer", "laborer", "self-employed", "salaried", "homemaker", "unemployed", "student", "retired"],
            "categories": ["general", "obc", "sc", "st", "ews"],
            "min_age": 0,
            "max_age": 10,
            "gender": ["female"],
            "residency": ["rural", "urban", "semi-urban"],
        },
        "documents": ["Birth Certificate", "Parent Aadhaar", "Address Proof", "Photograph"],
    },
    {
        "id": "pm-mudra",
        "name": "PM Mudra Yojana",
        "category": "Finance",
        "benefit": "Loan up to ₹10L",
        "scope": "Central",
        "description": "Collateral-free loans up to ₹10 lakh for non-corporate, non-farm small/micro enterprises.",
        "eligibility": {
            "max_income": 1000000,
            "occupations": ["self-employed"],
            "categories": ["general", "obc", "sc", "st", "ews"],
            "min_age": 18,
            "max_age": 65,
            "gender": ["male", "female", "other"],
            "residency": ["rural", "urban", "semi-urban"],
        },
        "documents": ["Business Plan", "Aadhaar Card", "PAN Card", "Address Proof", "Business Proof"],
    },
    {
        "id": "nps",
        "name": "National Pension Scheme",
        "category": "Finance",
        "benefit": "Pension after 60",
        "scope": "Central",
        "description": "Voluntary retirement savings scheme with government co-contribution for unorganized sector workers.",
        "eligibility": {
            "max_income": 1000000,
            "occupations": ["farmer", "laborer", "self-employed", "homemaker"],
            "categories": ["general", "obc", "sc", "st", "ews"],
            "min_age": 18,
            "max_age": 65,
            "gender": ["male", "female", "other"],
            "residency": ["rural", "urban", "semi-urban"],
        },
        "documents": ["Aadhaar Card", "Bank Account", "Mobile Number"],
    },
    {
        "id": "pm-fasal-bima",
        "name": "PM Fasal Bima Yojana",
        "category": "Agriculture",
        "benefit": "Crop insurance",
        "scope": "Central",
        "description": "Comprehensive crop insurance against natural calamities with low premium rates.",
        "eligibility": {
            "max_income": 500000,
            "occupations": ["farmer"],
            "categories": ["general", "obc", "sc", "st", "ews"],
            "min_age": 18,
            "max_age": 70,
            "gender": ["male", "female", "other"],
            "residency": ["rural", "semi-urban"],
        },
        "documents": ["Land Records", "Sowing Certificate", "Bank Account", "Aadhaar Card"],
    },
    {
        "id": "stand-up-india",
        "name": "Stand Up India",
        "category": "Finance",
        "benefit": "Loan ₹10L-₹1Cr",
        "scope": "Central",
        "description": "Bank loans between ₹10 lakh and ₹1 Crore for SC/ST and women entrepreneurs.",
        "eligibility": {
            "max_income": 10000000,
            "occupations": ["self-employed"],
            "categories": ["sc", "st"],
            "min_age": 18,
            "max_age": 65,
            "gender": ["male", "female", "other"],
            "residency": ["rural", "urban", "semi-urban"],
        },
        "documents": ["Caste Certificate", "Business Plan", "Identity Proof", "Address Proof"],
    },
    {
        "id": "scholarship-nsp",
        "name": "National Scholarship Portal",
        "category": "Education",
        "benefit": "Up to ₹50,000/year",
        "scope": "Central",
        "description": "Various scholarships for students from economically weaker sections and minority communities.",
        "eligibility": {
            "max_income": 600000,
            "occupations": ["student"],
            "categories": ["sc", "st", "obc", "ews"],
            "min_age": 5,
            "max_age": 35,
            "gender": ["male", "female", "other"],
            "residency": ["rural", "urban", "semi-urban"],
        },
        "documents": ["School Certificate", "Income Certificate", "Caste Certificate", "Aadhaar Card", "Bank Account"],
    },
    {
        "id": "jan-dhan",
        "name": "PM Jan Dhan Yojana",
        "category": "Finance",
        "benefit": "Zero-balance bank account + ₹1L insurance",
        "scope": "Central",
        "description": "Financial inclusion program providing bank accounts, insurance, and pension to unbanked citizens.",
        "eligibility": {
            "max_income": 10000000,
            "occupations": ["farmer", "laborer", "self-employed", "salaried", "homemaker", "unemployed", "student", "retired"],
            "categories": ["general", "obc", "sc", "st", "ews"],
            "min_age": 10,
            "max_age": 100,
            "gender": ["male", "female", "other"],
            "residency": ["rural", "urban", "semi-urban"],
        },
        "documents": ["Aadhaar Card", "Address Proof"],
    },
]

INCOME_MAP = {
    "below-1l": 100000,
    "1l-2.5l": 250000,
    "2.5l-5l": 500000,
    "5l-10l": 1000000,
    "above-10l": 10000001,
}


# ─── MODELS ────────────────────────────────────────────────────────────────────

class EligibilityRequest(BaseModel):
    age: int = Field(..., ge=0, le=120)
    gender: str = Field(..., pattern="^(male|female|other)$")
    state: str
    income: str
    occupation: str
    category: str
    residency: str = "rural"
    education: Optional[str] = None
    disability: Optional[str] = "no"


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    language: str = "en"


class SchemeResult(BaseModel):
    id: str
    name: str
    category: str
    benefit: str
    description: str
    confidence_score: float
    documents: List[str]


class EligibilityResponse(BaseModel):
    eligible_schemes: List[SchemeResult]
    reasoning: str
    confidence_score: float
    total_schemes_checked: int


class ChatResponse(BaseModel):
    response: str
    matched_schemes: Optional[List[dict]] = None
    language: str


# ─── ELIGIBILITY ENGINE ───────────────────────────────────────────────────────

def check_eligibility_logic(req: EligibilityRequest) -> EligibilityResponse:
    user_income = INCOME_MAP.get(req.income, 500000)
    eligible = []

    for scheme in SCHEMES:
        elig = scheme["eligibility"]
        score = 0.0
        factors = 0

        # Age check
        if elig["min_age"] <= req.age <= elig["max_age"]:
            score += 0.25
        factors += 0.25

        # Income check
        if user_income <= elig["max_income"]:
            score += 0.25
        factors += 0.25

        # Occupation check
        if req.occupation.lower() in elig["occupations"]:
            score += 0.2
        factors += 0.2

        # Category check
        if req.category.lower() in elig["categories"]:
            score += 0.15
        factors += 0.15

        # Gender check
        if req.gender.lower() in elig["gender"]:
            score += 0.1
        factors += 0.1

        # Residency check
        if req.residency.lower() in elig["residency"]:
            score += 0.05
        factors += 0.05

        confidence = round(score / factors, 2) if factors > 0 else 0

        if confidence >= 0.5:
            eligible.append(SchemeResult(
                id=scheme["id"],
                name=scheme["name"],
                category=scheme["category"],
                benefit=scheme["benefit"],
                description=scheme["description"],
                confidence_score=confidence,
                documents=scheme["documents"],
            ))

    eligible.sort(key=lambda x: x.confidence_score, reverse=True)
    avg_confidence = round(sum(s.confidence_score for s in eligible) / len(eligible), 2) if eligible else 0

    reasoning = f"Analyzed {len(SCHEMES)} government schemes against your profile. "
    reasoning += f"Found {len(eligible)} schemes with ≥50% eligibility match. "
    reasoning += f"Top match: {eligible[0].name} ({eligible[0].confidence_score*100:.0f}% confidence)." if eligible else "No strong matches found."

    return EligibilityResponse(
        eligible_schemes=eligible,
        reasoning=reasoning,
        confidence_score=avg_confidence,
        total_schemes_checked=len(SCHEMES),
    )


# ─── ENDPOINTS ─────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {"status": "ok", "service": "PrajaAdhikaram AI API", "version": "1.0.0"}


@app.get("/schemes")
async def get_schemes():
    return {
        "schemes": [
            {
                "id": s["id"],
                "name": s["name"],
                "category": s["category"],
                "benefit": s["benefit"],
                "scope": s["scope"],
                "description": s["description"],
                "documents": s["documents"],
            }
            for s in SCHEMES
        ],
        "total": len(SCHEMES),
    }


@app.post("/check-eligibility")
async def check_eligibility(req: EligibilityRequest):
    try:
        result = check_eligibility_logic(req)
        return result.model_dump()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/chat")
async def chat(req: ChatRequest):
    message = req.message.lower()

    if any(w in message for w in ["hello", "hi", "namaste", "help"]):
        response = "Namaste! 🙏 I'm PrajaAdhikaram AI. I can help you discover government schemes you're eligible for. Tell me about yourself — your age, state, occupation, and income — and I'll find matching schemes!"
    elif any(w in message for w in ["scheme", "yojana", "program"]):
        response = f"We have {len(SCHEMES)} schemes indexed including PM-KISAN, Ayushman Bharat, MGNREGA, PM Awas Yojana, and more. Would you like to check your eligibility or browse all schemes?"
    elif any(w in message for w in ["eligib", "qualify", "check"]):
        response = "To check your eligibility, I need: 1) Your age, 2) State, 3) Annual income, 4) Occupation, 5) Social category. You can use our Eligibility Wizard for a guided experience!"
    else:
        response = f"I understand you're asking about: '{req.message}'. Based on available data, I recommend checking our Eligibility Wizard for a comprehensive analysis across all {len(SCHEMES)} indexed government schemes."

    return ChatResponse(
        response=response,
        matched_schemes=[
            {"name": s["name"], "category": s["category"], "benefit": s["benefit"]}
            for s in SCHEMES[:3]
        ],
        language=req.language,
    ).model_dump()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
