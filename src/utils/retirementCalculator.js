// Retirement calculator utilities
// Modelled similar to Angel One's retirement calculator:
// - Inputs: current age, retirement age, life expectancy,
//           monthly expenses today, inflation, expected returns,
//           existing savings, monthly investments.
// - Outputs: corpus required, estimated corpus, gap, required monthly SIP.

const MONTHS_IN_YEAR = 12;

/** Future value of a lump sum: FV = PV * (1 + r)^n */
export function futureValueLumpsum(presentValue, annualReturn, years) {
  if (years <= 0) return presentValue || 0;
  const r = annualReturn;
  return (presentValue || 0) * Math.pow(1 + r, years);
}

/** Future value of a monthly SIP: FV = P * ((1+r)^n - 1) / r */
export function futureValueSIP(monthlyInvestment, annualReturn, years) {
  const P = monthlyInvestment || 0;
  const r = annualReturn / MONTHS_IN_YEAR;
  const n = years * MONTHS_IN_YEAR;

  if (n <= 0) return 0;
  if (Math.abs(r) < 1e-10) return P * n;

  return P * ((Math.pow(1 + r, n) - 1) / r);
}

/** Adjust amount for inflation over given years. */
export function inflationAdjustedAmount(amountToday, inflationRate, years) {
  if (years <= 0) return amountToday || 0;
  return (amountToday || 0) * Math.pow(1 + inflationRate, years);
}

/** Nominal -> real rate: (1+nominal)/(1+inflation) - 1 */
export function nominalToRealRate(nominalReturn, inflationRate) {
  return (1 + nominalReturn) / (1 + inflationRate) - 1;
}

/**
 * Given a target corpus and time to retirement,
 * compute required monthly SIP to reach that corpus.
 *
 * targetCorpus   – corpus needed at retirement
 * existingCorpus – lump-sum already saved
 * annualReturn   – pre-retirement return (nominal)
 * yearsToRetire
 */
export function requiredMonthlySIP({
  targetCorpus,
  existingCorpus = 0,
  annualReturn,
  yearsToRetire,
}) {
  const n = yearsToRetire * MONTHS_IN_YEAR;
  if (n <= 0 || !isFinite(n)) return 0;

  const r = annualReturn / MONTHS_IN_YEAR;

  const fvExisting = futureValueLumpsum(
    existingCorpus,
    annualReturn,
    yearsToRetire,
  );

  const neededFromSIP = Math.max(targetCorpus - fvExisting, 0);

  if (neededFromSIP <= 0) return 0;

  if (Math.abs(r) < 1e-10) {
    // No growth -> just divide across months
    return neededFromSIP / n;
  }

  // From FV annuity formula: FV = P * ((1+r)^n - 1) / r
  // => P = FV * r / ((1+r)^n - 1)
  const monthly = (neededFromSIP * r) / (Math.pow(1 + r, n) - 1);
  return monthly;
}

/**
 * MAIN function:
 * Compute a full retirement plan in an Angel One–style approach.
 *
 * Inputs (all numbers):
 * - currentAge
 * - retirementAge
 * - lifeExpectancy
 * - monthlyExpenseToday         (₹, today's cost of living)
 * - inflationRate               (decimal, e.g. 0.06 = 6%)
 * - existingCorpus              (₹ already saved for retirement)
 * - monthlyInvestment           (current monthly retirement saving, optional)
 * - preRetReturn                (decimal, e.g. 0.10 = 10%)
 * - postRetReturn               (decimal, e.g. 0.06 = 6%)
 */
export function computeRetirementPlan({
  currentAge,
  retirementAge,
  lifeExpectancy,
  monthlyExpenseToday,
  inflationRate = 0.06,
  existingCorpus = 0,
  monthlyInvestment = 0,
  preRetReturn = 0.1,
  postRetReturn = 0.06,
}) {
  const yearsToRetire = Math.max((retirementAge || 0) - (currentAge || 0), 0);
  const yearsInRetirement = Math.max(
    (lifeExpectancy || 0) - (retirementAge || 0),
    0,
  );

  // 1) Monthly expense at retirement (inflation-adjusted)
  const monthlyAtRetirement = inflationAdjustedAmount(
    monthlyExpenseToday || 0,
    inflationRate,
    yearsToRetire,
  );
  const annualAtRetirement = monthlyAtRetirement * MONTHS_IN_YEAR;

  // 2) Required corpus at retirement using real return
  // Real return during retirement (after inflation)
  const realAnnualPost = nominalToRealRate(postRetReturn, inflationRate);
  const realMonthlyPost = realAnnualPost / MONTHS_IN_YEAR;
  const n = yearsInRetirement * MONTHS_IN_YEAR;

  let requiredCorpus;

  if (n <= 0) {
    requiredCorpus = 0;
  } else if (Math.abs(realMonthlyPost) < 1e-6) {
    // Approx zero real return => corpus ≈ monthly * months
    requiredCorpus = monthlyAtRetirement * n;
  } else {
    // PV of an inflation-adjusted annuity (using real rate)
    requiredCorpus =
      monthlyAtRetirement *
      ((1 - Math.pow(1 + realMonthlyPost, -n)) / realMonthlyPost);
  }

  // 3) Estimated corpus from current plan:
  //    existing lump sum + monthly SIP till retirement
  const fvExisting = futureValueLumpsum(
    existingCorpus,
    preRetReturn,
    yearsToRetire,
  );
  const fvSIP = futureValueSIP(monthlyInvestment, preRetReturn, yearsToRetire);
  const estimatedCorpus = fvExisting + fvSIP;

  // 4) Gap (positive = shortfall)
  const corpusGap = requiredCorpus - estimatedCorpus;

  // 5) Required monthly SIP to reach target (Angel One-style output)
  const requiredMonthlyInvestment = requiredMonthlySIP({
    targetCorpus: requiredCorpus,
    existingCorpus,
    annualReturn: preRetReturn,
    yearsToRetire,
  });

  return {
    yearsToRetire,
    yearsInRetirement,
    monthlyAtRetirement,
    annualAtRetirement,
    requiredCorpus,
    estimatedCorpus,
    corpusGap,
    requiredMonthlyInvestment,
  };
}
