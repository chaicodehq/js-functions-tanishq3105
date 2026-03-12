/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  // Meal prices per day: veg=80, nonveg=120, jain=90
  // Return: { name, mealType, days, dailyRate, totalCost }
  const dailyRate =
    mealType === "nonveg"
      ? 120
      : mealType === "veg"
        ? 80
        : mealType === "jain"
          ? 90
          : -1;
  if (!name || dailyRate === -1) return null;
  const totalCost = dailyRate * days;
  return { name, mealType, days, dailyRate, totalCost };
}

export function combinePlans(...plans) {
  // Your code here
  if (plans.length === 0) return null;

  const totalCustomers = plans.length;
  let totalRevenue = 0,
    vegCount = 0,
    nonvegCount = 0,
    jainCount = 0;
  for (let plan of plans) {
    const { name, mealType, days, dailyRate, totalCost } = plan;
    if (typeof name === "undefined" || name === null || name.length == 0)
      return null;
    totalRevenue += totalCost;
    if (mealType === "veg") vegCount++;
    if (mealType === "nonveg") nonvegCount++;
    if (mealType === "jain") jainCount++;
  }
  const mealBreakdown = {
    veg: vegCount,
    nonveg: nonvegCount,
    jain: jainCount,
  };
  return {
    totalCustomers,
    totalRevenue,
    mealBreakdown,
  };
}

export function applyAddons(plan, ...addons) {
  // Your code here
  if (plan == null) return null;
  let newTotalCost,
    names = [],
    newDailyRate = plan.dailyRate;
  for (let addon of addons) {
    const { name, price } = addon;
    newDailyRate += price;
    names.push(name);
  }
  newTotalCost = newDailyRate * plan.days;
  const newPlan = {
    ...plan,
    totalCost: newTotalCost,
    dailyRate: newDailyRate,
    addonNames: names,
  };
  return newPlan;
}
