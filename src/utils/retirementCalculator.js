// retirementCalculator.js
// All inputs in INR, rates as decimals (e.g. 0.12 = 12%)

/**
 * Calculate future value of monthly investments (SIP)
 */
export function futureValue(monthlyInvestment, annualReturn, years) {
  if (monthlyInvestment < 0 || years < 0) return 0;

  const r = annualReturn / 12;
  const n = years * 12;

  // Handle zero or near-zero returns
  if (Math.abs(r) < 1e-10) {
    return monthlyInvestment * n;
  }

  // Future value of annuity formula (ordinary annuity)
  return monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r);
}

/**
 * Adjust amount for inflation
 */
export function inflationAdjustedAmount(amountToday, inflation, years) {
  if (amountToday < 0 || years < 0) return 0;
  return amountToday * Math.pow(1 + inflation, years);
}

/**
 * Estimate required corpus for retirement with inflation during retirement.
 * - targetMonthlyToday: target monthly income in today's rupees
 * - inflation: expected inflation till retirement (e.g. 0.06)
 * - inflationDuringRetirement: expected inflation during retirement (e.g. 0.06)
 * - postRetReturn: expected annual return during retirement (e.g. 0.08)
 * - yearsToRetire
 * - yearsInRetirement (e.g. 25–30)
 */
export function calculateRequiredCorpus({
  targetMonthlyToday,
  inflation = 0.06,
  inflationDuringRetirement = 0.06,
  postRetReturn = 0.08,
  yearsToRetire,
  yearsInRetirement = 25,
}) {
  // Validate inputs
  if (targetMonthlyToday <= 0 || yearsToRetire < 0 || yearsInRetirement <= 0) {
    throw new Error("Invalid input parameters");
  }

  // Calculate monthly expense at retirement (Year 0 of retirement)
  const monthlyAtRetirement = inflationAdjustedAmount(
    targetMonthlyToday,
    inflation,
    yearsToRetire,
  );

  const yearlyAtRetirement = monthlyAtRetirement * 12;
  const r = postRetReturn;
  const g = inflationDuringRetirement;
  const n = yearsInRetirement;

  let requiredCorpus;

  // Check if return equals inflation (special case)
  if (Math.abs(r - g) < 0.0001) {
    // If return equals inflation, we need sum of all yearly expenses
    requiredCorpus = yearlyAtRetirement * n;
  } else if (r < g) {
    // If inflation exceeds returns, corpus will deplete faster
    // Still calculate but this is not sustainable long-term
    requiredCorpus =
      yearlyAtRetirement * ((1 - Math.pow((1 + g) / (1 + r), n)) / (r - g));
  } else {
    // Growing annuity formula (standard case)
    // PV = PMT × [(1 - ((1+g)/(1+r))^n) / (r - g)]
    requiredCorpus =
      yearlyAtRetirement * ((1 - Math.pow((1 + g) / (1 + r), n)) / (r - g));
  }

  return {
    monthlyAtRetirement: Math.round(monthlyAtRetirement),
    requiredCorpus: Math.round(requiredCorpus),
  };
}

/**
 * Estimate future corpus based on:
 * - current corpus (lumpsum)
 * - monthly investment
 * - annual return
 */
export function estimateFutureCorpus({
  currentCorpus = 0,
  monthlyInvestment,
  annualReturn = 0.12,
  yearsToRetire,
}) {
  if (monthlyInvestment < 0 || yearsToRetire < 0) {
    throw new Error("Invalid input parameters");
  }

  const fvContributions = futureValue(
    monthlyInvestment,
    annualReturn,
    yearsToRetire,
  );
  const fvCurrent = currentCorpus * Math.pow(1 + annualReturn, yearsToRetire);
  return Math.round(fvContributions + fvCurrent);
}

/**
 * Suggest a risk profile based on:
 * - age
 * - yearsToRetire
 * - riskComfort: 'low' | 'medium' | 'high'
 */
export function suggestRiskProfile({ age, yearsToRetire, riskComfort }) {
  if (age && age < 18) {
    throw new Error("Invalid age");
  }
  if (yearsToRetire < 0) {
    throw new Error("Invalid years to retire");
  }

  const comfort = (riskComfort || "medium").toLowerCase();

  if (comfort === "high" && yearsToRetire >= 20) {
    return {
      label: "Aggressive",
      equity: 0.75,
      debt: 0.2,
      others: 0.05,
      description:
        "Higher equity allocation via diversified equity mutual funds, index funds and small exposure to mid/small-cap funds.",
    };
  }
  if (comfort === "low" || yearsToRetire <= 10) {
    return {
      label: "Conservative",
      equity: 0.35,
      debt: 0.55,
      others: 0.1,
      description:
        "Focus on safer options like high-quality debt funds, FDs, PPF, NPS with limited equity exposure.",
    };
  }
  return {
    label: "Balanced",
    equity: 0.55,
    debt: 0.4,
    others: 0.05,
    description:
      "Blend of equity mutual funds / index funds with good allocation to debt funds, PPF, EPF and NPS.",
  };
}

/**
 * Simple monthly budget suggestion.
 */
export function buildBudget({ netIncome, targetSavingsRatio = 0.3 }) {
  if (netIncome <= 0) {
    throw new Error("Net income must be positive");
  }

  if (targetSavingsRatio < 0 || targetSavingsRatio > 1) {
    throw new Error("Savings ratio must be between 0 and 1");
  }

  const invest = Math.round(netIncome * targetSavingsRatio);
  const needs = Math.round(netIncome * 0.5);
  const wants = netIncome - invest - needs;

  return {
    invest,
    needs,
    wants: Math.round(wants),
  };
}

/**
 * Simulate retirement year by year to verify corpus sustainability
 * @param {Object} params - Simulation parameters
 * @param {number} params.startingCorpus - Initial retirement corpus
 * @param {number} params.monthlyExpenseAtRetirement - Monthly expense at start of retirement
 * @param {number} params.inflationDuringRetirement - Annual inflation rate during retirement
 * @param {number} params.postRetReturn - Annual return rate during retirement
 * @param {number} params.yearsInRetirement - Number of years in retirement
 * @returns {Object} Simulation results with success status and year details
 */
export function simulateRetirement({
  startingCorpus,
  monthlyExpenseAtRetirement,
  inflationDuringRetirement = 0.06,
  postRetReturn = 0.08,
  yearsInRetirement = 25,
}) {
  let corpus = startingCorpus;
  let currentYearlyExpense = monthlyExpenseAtRetirement * 12;
  const yearDetails = [];

  for (let year = 1; year <= yearsInRetirement; year++) {
    const startCorpus = corpus;

    // Earn returns on corpus at beginning of year
    const returns = corpus * postRetReturn;
    corpus += returns;

    // Withdraw yearly expense
    corpus -= currentYearlyExpense;

    yearDetails.push({
      year,
      startCorpus: Math.round(startCorpus),
      returns: Math.round(returns),
      withdrawal: Math.round(currentYearlyExpense),
      endCorpus: Math.round(corpus),
    });

    if (corpus < 0) {
      return {
        success: false,
        yearsFailed: year,
        yearDetails,
        remainingCorpus: Math.round(corpus),
      };
    }

    // Increase expense for next year due to inflation
    currentYearlyExpense *= 1 + inflationDuringRetirement;
  }

  return {
    success: true,
    remainingCorpus: Math.round(corpus),
    yearDetails,
  };
}
