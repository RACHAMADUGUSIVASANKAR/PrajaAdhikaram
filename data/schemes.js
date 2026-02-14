export const SCHEMES_DATA = [
    // REAL GOVERNMENT SCHEMES - AGRICULTURE & FARMERS WELFARE
    {
        id: 'pm-kisan',
        category: 'Agriculture',
        name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
        description: 'Financial support of ₹6,000 per year in three equal installments to all landed farmer families.',
        benefit: '₹6,000 per year',
        eligibility: ['Small and marginal farmers', 'Landholding up to 2 hectares'],
        documents: ['Aadhaar Card', 'Land Ownership Documents', 'Bank Account'],
        url: 'https://pmkisan.gov.in/',
        icon: 'bx-leaf'
    },
    {
        id: 'pm-fby',
        category: 'Agriculture',
        name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        description: 'Crop insurance scheme to provide financial support to farmers suffering crop loss/damage arising out of unforeseen events.',
        benefit: 'Insurance Cover',
        eligibility: ['Farmers growing notified crops', 'Sharecroppers/Tenant farmers'],
        documents: ['Land Possession Certificate', 'Aadhaar Card', 'Bank Passbook'],
        url: 'https://pmfby.gov.in/',
        icon: 'bx-shield-quarter'
    },
    {
        id: 'kcc',
        category: 'Agriculture',
        name: 'Kisan Credit Card (KCC) Scheme',
        description: 'Provides adequate and timely credit support from the banking system to farmers for their cultivation and other needs.',
        benefit: 'Low Interest Credit',
        eligibility: ['All farmers', 'Tenant farmers', 'Oral lessees', 'Share croppers'],
        documents: ['Identity Proof', 'Address Proof', 'Land Documents'],
        url: 'https://www.nabard.org/content1.aspx?id=1720&catid=23&mid=23',
        icon: 'bx-credit-card'
    },
    {
        id: 'shc',
        category: 'Agriculture',
        name: 'Soil Health Card Scheme',
        description: 'Provide information to farmers on nutrient status of their soil along with recommendation on appropriate dosage of nutrients.',
        benefit: 'Soil Health Report',
        eligibility: ['All farmers'],
        documents: ['Aadhaar Card', 'Soil Sample'],
        url: 'https://soilhealth.dac.gov.in/',
        icon: 'bx-test-tube'
    },
    // Adding more real schemes to the base list
    {
        id: 'ayushman-bharat',
        category: 'Health',
        name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
        description: 'World\'s largest health assurance scheme providing health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization.',
        benefit: '₹5 Lakh Health Cover',
        eligibility: ['Deprived rural families', 'Identified occupational categories of urban workers\' families'],
        documents: ['Aadhaar Card', 'Ration Card'],
        url: 'https://pmjay.gov.in/',
        icon: 'bx-plus-medical'
    },
    {
        id: 'pm-away-yojana-urban',
        category: 'Housing',
        name: 'Pradhan Mantri Awas Yojana (Urban)',
        description: 'Provides central assistance to Urban Local Bodies (ULBs) and other implementing agencies through States/UTs to provide houses to all eligible families/ beneficiaries.',
        benefit: 'Housing Subsidy',
        eligibility: ['EWS/LIG/MIG families', 'Should not own a pucca house'],
        documents: ['Aadhaar Card', 'Income Certificate', 'Property Documents'],
        url: 'https://pmay-urban.gov.in/',
        icon: 'bx-home-heart'
    },
    {
        id: 'mgnrega',
        category: 'Employment',
        name: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
        description: 'Aims to enhance livelihood security in rural areas by providing at least 100 days of wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.',
        benefit: '100 Days Employment',
        eligibility: ['Rural households', 'Adult members willing to do unskilled manual work'],
        documents: ['Job Card', 'Aadhaar Card', 'Bank Account'],
        url: 'https://nrega.nic.in/',
        icon: 'bx-briefcase-alt-2'
    },
    {
        id: 'sukanya-samriddhi',
        category: 'Women & Child',
        name: 'Sukanya Samriddhi Yojana',
        description: 'A small deposit scheme for the girl child launched as a part of the \'Beti Bachao Beti Padhao\' campaign.',
        benefit: 'High Interest Savings',
        eligibility: ['Girl child below 10 years of age'],
        documents: ['Birth Certificate', 'Identity Proof of Guardian', 'Address Proof'],
        url: 'https://www.india.gov.in/spotlight/sukanya-samriddhi-yojana',
        icon: 'bx-female'
    },
    {
        id: 'mudra',
        category: 'Employment',
        name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
        description: 'Scheme to provide loans up to 10 lakh to the non-corporate, non-farm small/micro enterprises.',
        benefit: 'Loan up to ₹10 Lakh',
        eligibility: ['Non-Corporate Small Business Segment (NCSBS)'],
        documents: ['Identity Proof', 'Business Proof', 'Bank Statement'],
        url: 'https://www.mudra.org.in/',
        icon: 'bx-rupee'
    }
];

// Dynamically generate 500+ more schemes for demo purposes
export const CATEGORIES = ['Agriculture', 'Education', 'Health', 'Housing', 'Employment', 'Women & Child', 'Social Security', 'Skill Development', 'Rural Development', 'Urban Affairs'];
const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir'];
const suffixes = ['Yojana', 'Scheme', 'Abhiyan', 'Mission', 'Kalyan Yojana', 'Vikas Yojana', 'Sahayata Planning', 'Scholarship', 'Fellowship', 'Grant'];
const prefixes = ['National', 'State', 'Mukhya Mantri', 'Pradhan Mantri', 'Atmanirbhar', 'Jan', 'Gramin', 'Shahari', 'Kisan', 'Yuva', 'Mahila', 'Bal', 'Vridha', 'Divyang'];

for (let i = 0; i < 520; i++) {
    const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const pre = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suf = suffixes[Math.floor(Math.random() * suffixes.length)];

    SCHEMES_DATA.push({
        id: `scheme-gen-${i}`,
        category: cat,
        name: `${pre} ${cat} ${suf} - ${state}`,
        description: `A comprehensive ${cat.toLowerCase()} initiative by the government of ${state} to support eligible citizens.`,
        benefit: `Financial aid up to ₹${Math.floor(Math.random() * 50) + 5},000`,
        eligibility: ['Resident of ' + state, 'Income below ₹2.5 Lakh'],
        documents: ['Aadhaar Card', 'Domicile Certificate', 'Income Certificate'],
        url: 'https://www.india.gov.in/my-government/schemes',
        icon: 'bx-file'
    });
}
